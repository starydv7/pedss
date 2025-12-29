import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import StorageService from '../services/StorageService';
import ExportService from '../services/ExportService';

const ResultsScreen = ({ navigation, route }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Get results from route params, use defaults if not provided
  const routeParams = route?.params || {};
  
  const results = {
    score: routeParams.score || 0,
    riskLevel: routeParams.riskLevel || 'Low',
    patientData: routeParams.patientData || {
      name: 'N/A',
      age: 'N/A',
      gender: 'N/A',
      date: new Date().toLocaleDateString()
    },
    parameters: routeParams.parameters || {
      P: 0,
      E: 0,
      D: 0,
      S1: 0,
      S2: 0
    }
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

  const getRiskDescription = (score) => {
    if (score >= 4) {
      return ''; // No description for High Risk
    } else if (score >= 3) {
      return 'Poor outcome likely. Close monitoring and aggressive treatment advised.';
    } else {
      return 'Standard care with regular assessment.';
    }
  };

  const handleSave = async () => {
    if (isSaved) {
      Alert.alert('Already Saved', 'This assessment has already been saved.');
      return;
    }

    setIsSaving(true);
    try {
      await StorageService.saveAssessment(results);
      setIsSaved(true);
      Alert.alert('Success', 'Assessment saved successfully!', [
        { 
          text: 'OK', 
          onPress: () => {
            const parent = navigation.getParent();
            if (parent) {
              parent.navigate('CaseHistory');
            }
          }
        }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to save assessment. Please try again.');
      console.error('Save error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      Alert.alert(
        'Export Format',
        'Choose export format:',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'CSV',
            onPress: async () => {
              try {
                const result = await ExportService.exportAssessmentCSV(results);
                if (result.success) {
                  Alert.alert('Success', result.message);
                } else {
                  Alert.alert('Error', result.message);
                }
              } catch (error) {
                Alert.alert('Error', 'Failed to export CSV. Please try again.');
              } finally {
                setIsExporting(false);
              }
            }
          },
          {
            text: 'PDF Report',
            onPress: async () => {
              try {
                const result = await ExportService.exportAssessmentPDF(results);
                if (result.success) {
                  Alert.alert('Success', result.message);
                } else {
                  Alert.alert('Error', result.message);
                }
              } catch (error) {
                Alert.alert('Error', 'Failed to export report. Please try again.');
              } finally {
                setIsExporting(false);
              }
            }
          }
        ],
        { cancelable: true, onDismiss: () => setIsExporting(false) }
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to export. Please try again.');
      setIsExporting(false);
    }
  };

  const handleNewAssessment = () => {
    // Navigate to PatientInfo tab and reset the form
    navigation.navigate('PatientInfo', { reset: true });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Assessment Results</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>

        {/* Patient Summary */}
        <View style={styles.patientSummary}>
          <Text style={styles.summaryTitle}>Patient Summary</Text>
          <Text style={styles.summaryText}>
            {results.patientData.name} | {results.patientData.age} | {results.patientData.gender}
          </Text>
          <Text style={styles.summaryDate}>{results.patientData.date}</Text>
        </View>

        {/* Main Score Display */}
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreLabel}>🎯 PEDSS Score</Text>
          <Text style={styles.scoreValue}>{results.score}/6</Text>
          <View style={styles.scoreProgressBar}>
            <View style={[styles.scoreProgressFill, { width: `${(results.score / 6) * 100}%` }]} />
          </View>
        </View>

        {/* Risk Assessment */}
        <View style={[styles.riskContainer, { 
          borderColor: getRiskColor(results.riskLevel),
          backgroundColor: results.riskLevel === 'Medium' ? '#FEF3C7' : results.riskLevel === 'High' ? '#FEE2E2' : '#D1FAE5'
        }]}>
          <View style={styles.riskHeader}>
            <Text style={styles.riskIcon}>{getRiskIcon(results.riskLevel)}</Text>
            {results.riskLevel === 'Medium' ? (
              // For Medium Risk: Show description as title, no "MEDIUM RISK" text
              <Text style={[styles.riskTitle, { color: getRiskColor(results.riskLevel) }]} numberOfLines={3}>
                {getRiskDescription(results.score)}
              </Text>
            ) : (
              // For Low and High Risk: Show normal title
              <Text style={[styles.riskTitle, { color: getRiskColor(results.riskLevel) }]} numberOfLines={2}>
                {results.riskLevel.toUpperCase()} {results.riskLevel === 'High' ? 'MORTALITY RISK' : 'RISK'}
              </Text>
            )}
          </View>
          {/* Only show description for Low Risk, not for Medium (already shown as title) or High (no description) */}
          {results.riskLevel === 'Low' && (
            <Text style={styles.riskDescription} numberOfLines={2}>
              {getRiskDescription(results.score)}
            </Text>
          )}
        </View>

        {/* Parameter Breakdown */}
        <View style={styles.breakdownCard}>
          <Text style={styles.breakdownTitle}>📋 Parameter Breakdown</Text>
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>P (PCPCS)</Text>
            <View style={styles.breakdownBar}>
              <View style={[styles.breakdownFill, { width: `${(results.parameters.P / 1) * 100}%` }]} />
            </View>
            <Text style={styles.breakdownValue}>{results.parameters.P}/1</Text>
          </View>
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>E (EEG)</Text>
            <View style={styles.breakdownBar}>
              <View style={[styles.breakdownFill, { width: `${(results.parameters.E / 1) * 100}%` }]} />
            </View>
            <Text style={styles.breakdownValue}>{results.parameters.E}/1</Text>
          </View>
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>D (Drug)</Text>
            <View style={styles.breakdownBar}>
              <View style={[styles.breakdownFill, { width: `${(results.parameters.D / 2) * 100}%` }]} />
            </View>
            <Text style={styles.breakdownValue}>{results.parameters.D}/2</Text>
          </View>
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>S (Semiology)</Text>
            <View style={styles.breakdownBar}>
              <View style={[styles.breakdownFill, { width: `${(results.parameters.S1 / 1) * 100}%` }]} />
            </View>
            <Text style={styles.breakdownValue}>{results.parameters.S1}/1</Text>
          </View>
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>S (Sickness)</Text>
            <View style={styles.breakdownBar}>
              <View style={[styles.breakdownFill, { width: `${(results.parameters.S2 / 1) * 100}%` }]} />
            </View>
            <Text style={styles.breakdownValue}>{results.parameters.S2}/1</Text>
          </View>
        </View>

        {/* Clinical Interpretation */}
        <View style={styles.interpretationCard}>
          <Text style={styles.interpretationTitle}>📝 Clinical Interpretation</Text>
          <Text style={styles.interpretationText}>
            {results.score >= 4 ? (
              'This patient demonstrates high-risk factors including abnormal premorbid status and drug refractoriness. Immediate intensive care unit admission with continuous monitoring is strongly recommended. Consider early intervention strategies and prepare for potential complications.'
            ) : results.score >= 3 ? (
              'The patient shows concerning features that suggest a poor outcome is likely. Close monitoring in a high-dependency unit is advised with aggressive management of underlying conditions and seizure control.'
            ) : results.score >= 1 ? (
              'Moderate risk factors are present. Standard care protocols should be followed with regular reassessment and monitoring for any deterioration.'
            ) : (
              'Low risk profile suggests good prognosis with routine care. Continue standard monitoring and treatment protocols.'
            )}
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, isSaved && styles.actionButtonSaved]} 
            onPress={handleSave}
            disabled={isSaving || isSaved}
          >
            {isSaving ? (
              <ActivityIndicator size="small" color="#2563EB" />
            ) : (
              <>
                <Text style={styles.actionButtonIcon}>{isSaved ? '✅' : '💾'}</Text>
                <Text style={styles.actionButtonText}>{isSaved ? 'Saved' : 'Save'}</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={handleExport}
            disabled={isExporting}
          >
            {isExporting ? (
              <ActivityIndicator size="small" color="#2563EB" />
            ) : (
              <>
                <Text style={styles.actionButtonIcon}>📤</Text>
                <Text style={styles.actionButtonText}>Export</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleNewAssessment}>
            <Text style={styles.actionButtonIcon}>🔄</Text>
            <Text style={styles.actionButtonText}>New Case</Text>
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
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    zIndex: 1000,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    textAlign: 'center',
  },
  patientSummary: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 4,
  },
  summaryDate: {
    fontSize: 14,
    color: '#6B7280',
  },
  scoreContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  scoreLabel: {
    fontSize: 18,
    color: '#6B7280',
    marginBottom: 12,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2563EB',
    marginBottom: 16,
  },
  scoreProgressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  scoreProgressFill: {
    height: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 4,
  },
  riskContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    minHeight: 100,
  },
  riskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  riskIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  riskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  riskDescription: {
    fontSize: 12,
    color: '#374151',
    lineHeight: 18,
    flexWrap: 'wrap',
  },
  breakdownCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  breakdownTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 20,
  },
  breakdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  breakdownLabel: {
    width: 100,
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  breakdownBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginHorizontal: 12,
    overflow: 'hidden',
  },
  breakdownFill: {
    height: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 4,
  },
  breakdownValue: {
    width: 40,
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
    textAlign: 'right',
  },
  interpretationCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  interpretationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 16,
  },
  interpretationText: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
  },
  actionButtons: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  actionButtonIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
  },
  actionButtonSaved: {
    backgroundColor: '#D1FAE5',
    borderColor: '#16A34A',
  },
});

export default ResultsScreen;