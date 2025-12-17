import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import StorageService from '../services/StorageService';
import ExportService from '../services/ExportService';

const CaseHistoryScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [caseHistory, setCaseHistory] = useState([]);
  const [statistics, setStatistics] = useState({
    total: 0,
    highRisk: 0,
    avgScore: 0,
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    loadCaseHistory();
  }, []);

  const loadCaseHistory = async () => {
    try {
      setLoading(true);
      const assessments = await StorageService.getAllAssessments();
      const stats = await StorageService.getStatistics();
      
      // Transform assessments to case history format
      const formattedCases = assessments.map(assessment => {
        const createdAt = new Date(assessment.createdAt || Date.now());
        return {
          id: assessment.id,
          patientName: assessment.patientData?.name || 'Unknown',
          age: assessment.patientData?.age ? `${assessment.patientData.age} months` : 'N/A',
          gender: assessment.patientData?.gender || 'N/A',
          date: createdAt.toLocaleDateString(),
          time: createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          score: assessment.score || 0,
          riskLevel: assessment.riskLevel || 'Low',
          status: 'Completed',
          fullData: assessment, // Store full data for detail view
        };
      }).sort((a, b) => {
        // Sort by date, newest first
        return new Date(b.fullData.createdAt) - new Date(a.fullData.createdAt);
      });
      
      setCaseHistory(formattedCases);
      setStatistics(stats);
    } catch (error) {
      console.error('Error loading case history:', error);
      Alert.alert('Error', 'Failed to load case history. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadCaseHistory();
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'Low': return '#16A34A';
      case 'Medium': return '#EA580C';
      case 'High': return '#DC2626';
      default: return '#6B7280';
    }
  };

  const getRiskIcon = (level) => {
    switch (level) {
      case 'Low': return '🟢';
      case 'Medium': return '🟡';
      case 'High': return '🔴';
      default: return '⚪';
    }
  };

  const filteredCases = caseHistory.filter(caseItem =>
    caseItem.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    caseItem.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCasePress = (caseItem) => {
    if (caseItem.fullData) {
      // Navigate to Results screen with saved data
      navigation.navigate('Results', caseItem.fullData);
    } else {
      Alert.alert(
        'Case Details',
        `Patient: ${caseItem.patientName}\nAge: ${caseItem.age}\nScore: ${caseItem.score}/6\nRisk: ${caseItem.riskLevel}\nDate: ${caseItem.date} ${caseItem.time}`,
        [{ text: 'OK' }]
      );
    }
  };

  const handleDeleteCase = async (caseId) => {
    Alert.alert(
      'Delete Assessment',
      'Are you sure you want to delete this assessment? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await StorageService.deleteAssessment(caseId);
              Alert.alert('Success', 'Assessment deleted successfully.');
              loadCaseHistory();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete assessment. Please try again.');
            }
          }
        }
      ]
    );
  };

  const handleExportHistory = async () => {
    setExporting(true);
    try {
      const result = await ExportService.exportAllAssessmentsCSV();
      if (result.success) {
        Alert.alert('Success', result.message);
      } else {
        Alert.alert('Error', result.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to export case history. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  const handleClearHistory = () => {
    Alert.alert(
      'Clear All History',
      'Are you sure you want to delete ALL case history? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            try {
              await StorageService.clearAllAssessments();
              Alert.alert('Success', 'All case history cleared successfully.');
              loadCaseHistory();
            } catch (error) {
              Alert.alert('Error', 'Failed to clear history. Please try again.');
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2563EB" />
          <Text style={styles.loadingText}>Loading case history...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Case History</Text>
        <TouchableOpacity
          style={styles.headerActionButton}
          onPress={handleExportHistory}
          disabled={exporting || caseHistory.length === 0}
        >
          {exporting ? (
            <ActivityIndicator size="small" color="#2563EB" />
          ) : (
            <Text style={styles.headerActionButtonText}>📤</Text>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >

        {/* Search Section */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search by name or ID..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.statsSection}>
          <Text style={styles.statsTitle}>Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{statistics.total}</Text>
              <Text style={styles.statLabel}>Total Cases</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{statistics.highRisk}</Text>
              <Text style={styles.statLabel}>High Risk</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{statistics.avgScore}</Text>
              <Text style={styles.statLabel}>Avg Score</Text>
            </View>
          </View>
        </View>

        {/* Case List */}
        <View style={styles.casesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Cases</Text>
            <TouchableOpacity onPress={handleClearHistory}>
              <Text style={styles.clearButton}>Clear All</Text>
            </TouchableOpacity>
          </View>
          
          {filteredCases.map((caseItem, index) => (
            <TouchableOpacity
              key={caseItem.id}
              style={styles.caseCard}
              onPress={() => handleCasePress(caseItem)}
              onLongPress={() => handleDeleteCase(caseItem.id)}
            >
              <View style={styles.caseHeader}>
                <View style={styles.caseInfo}>
                  <Text style={styles.patientName}>{caseItem.patientName}</Text>
                  <Text style={styles.patientDetails}>
                    ID: {caseItem.id} • {caseItem.age} • {caseItem.gender}
                  </Text>
                </View>
                <View style={[styles.riskBadge, { backgroundColor: getRiskColor(caseItem.riskLevel) }]}>
                  <Text style={styles.riskIcon}>{getRiskIcon(caseItem.riskLevel)}</Text>
                  <Text style={styles.riskText}>{caseItem.riskLevel}</Text>
                </View>
              </View>
              
              <View style={styles.caseDetails}>
                <View style={styles.scoreContainer}>
                  <Text style={styles.scoreLabel}>PEDSS Score</Text>
                  <Text style={styles.scoreValue}>{caseItem.score}/6</Text>
                </View>
                <View style={styles.dateContainer}>
                  <Text style={styles.dateText}>{caseItem.date}</Text>
                  <Text style={styles.timeText}>{caseItem.time}</Text>
                </View>
                <View style={styles.statusContainer}>
                  <Text style={[styles.statusBadge, styles.completedStatus]}>
                    {caseItem.status}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
          
          {filteredCases.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>📋</Text>
              <Text style={styles.emptyTitle}>
                {searchQuery ? 'No Cases Found' : 'No Case History'}
              </Text>
              <Text style={styles.emptyText}>
                {searchQuery 
                  ? 'Try adjusting your search terms' 
                  : 'Start by creating a new assessment to see it here'}
              </Text>
              {!searchQuery && (
                <TouchableOpacity
                  style={styles.emptyActionButton}
                  onPress={() => navigation.navigate('PatientInfo')}
                >
                  <Text style={styles.emptyActionText}>Create New Assessment</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <TouchableOpacity
            style={styles.primaryAction}
            onPress={() => navigation.navigate('PatientInfo')}
          >
            <Text style={styles.primaryActionText}>📝 New Assessment</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.secondaryAction}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.secondaryActionText}>🏠 Home</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    zIndex: 1000,
  },
  headerActionButton: {
    padding: 8,
  },
  headerActionButtonText: {
    fontSize: 20,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  backButtonText: {
    color: '#2563EB',
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  actionButtonText: {
    fontSize: 20,
  },
  searchSection: {
    padding: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 12,
    color: '#6B7280',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
  },
  statsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563EB',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  casesSection: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  clearButton: {
    fontSize: 14,
    color: '#DC2626',
    fontWeight: '600',
  },
  caseCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  caseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  caseInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  patientDetails: {
    fontSize: 14,
    color: '#6B7280',
  },
  riskBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  riskIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  riskText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  caseDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreContainer: {
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  scoreValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  dateContainer: {
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 2,
  },
  timeText: {
    fontSize: 12,
    color: '#6B7280',
  },
  statusContainer: {
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '600',
  },
  completedStatus: {
    backgroundColor: '#D1FAE5',
    color: '#065F46',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyActionButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 8,
  },
  emptyActionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6B7280',
  },
  actionSection: {
    padding: 20,
    gap: 12,
  },
  primaryAction: {
    backgroundColor: '#2563EB',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#2563EB',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryActionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryAction: {
    backgroundColor: 'white',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  secondaryActionText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CaseHistoryScreen;

