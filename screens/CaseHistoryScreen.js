import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';

const CaseHistoryScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for case history
  const caseHistory = [
    {
      id: '001',
      patientName: 'John Doe',
      age: '24 months',
      gender: 'Male',
      date: '2024-01-15',
      time: '14:30',
      score: 4,
      riskLevel: 'High',
      status: 'Completed'
    },
    {
      id: '002',
      patientName: 'Jane Smith',
      age: '18 months',
      gender: 'Female',
      date: '2024-01-14',
      time: '09:15',
      score: 2,
      riskLevel: 'Low',
      status: 'Completed'
    },
    {
      id: '003',
      patientName: 'Mike Johnson',
      age: '36 months',
      gender: 'Male',
      date: '2024-01-13',
      time: '16:45',
      score: 3,
      riskLevel: 'Medium',
      status: 'Completed'
    },
    {
      id: '004',
      patientName: 'Sarah Wilson',
      age: '12 months',
      gender: 'Female',
      date: '2024-01-12',
      time: '11:20',
      score: 1,
      riskLevel: 'Low',
      status: 'Completed'
    },
    {
      id: '005',
      patientName: 'David Brown',
      age: '30 months',
      gender: 'Male',
      date: '2024-01-11',
      time: '13:10',
      score: 5,
      riskLevel: 'High',
      status: 'Completed'
    }
  ];

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
    Alert.alert(
      'Case Details',
      `Patient: ${caseItem.patientName}\nAge: ${caseItem.age}\nScore: ${caseItem.score}/6\nRisk: ${caseItem.riskLevel}\nDate: ${caseItem.date} ${caseItem.time}`,
      [
        { text: 'OK' },
        { text: 'View Details', onPress: () => console.log('View details') }
      ]
    );
  };

  const handleExportHistory = () => {
    Alert.alert('Export', 'Case history exported successfully!');
  };

  const handleClearHistory = () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to clear all case history?',
      [
        { text: 'Cancel' },
        { text: 'Clear', style: 'destructive', onPress: () => console.log('Cleared') }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Case History</Text>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleExportHistory}
          >
            <Text style={styles.actionButtonText}>📤</Text>
          </TouchableOpacity>
        </View>

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
              <Text style={styles.statNumber}>{caseHistory.length}</Text>
              <Text style={styles.statLabel}>Total Cases</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>
                {caseHistory.filter(c => c.riskLevel === 'High').length}
              </Text>
              <Text style={styles.statLabel}>High Risk</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>
                {Math.round(caseHistory.reduce((acc, c) => acc + c.score, 0) / caseHistory.length * 10) / 10}
              </Text>
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
              <Text style={styles.emptyTitle}>No Cases Found</Text>
              <Text style={styles.emptyText}>
                {searchQuery ? 'Try adjusting your search terms' : 'No case history available yet'}
              </Text>
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

