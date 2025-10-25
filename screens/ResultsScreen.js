import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

const ResultsScreen = ({ navigation }) => {
  // Mock results data
  const results = {
    score: 4,
    riskLevel: 'High',
    patientData: {
      name: 'John Doe',
      age: '24 months',
      gender: 'Male',
      date: '2024-01-15'
    },
    parameters: {
      P: 1,
      E: 1,
      D: 2,
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
      return 'High mortality risk. Immediate intensive care recommended.';
    } else if (score >= 3) {
      return 'Poor outcome likely. Close monitoring and aggressive treatment advised.';
    } else if (score >= 1) {
      return 'Moderate risk. Standard care with regular assessment.';
    } else {
      return 'Low risk. Routine care and monitoring.';
    }
  };

  const handleSave = () => {
    alert('Assessment result saved successfully!');
  };

  const handleExport = () => {
    alert('PDF report generated and ready for sharing.');
  };

  const handleNewAssessment = () => {
    navigation.navigate('patient');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Assessment Results</Text>
        </View>

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
        <View style={[styles.riskContainer, { borderColor: getRiskColor(results.riskLevel) }]}>
          <View style={styles.riskHeader}>
            <Text style={styles.riskIcon}>{getRiskIcon(results.riskLevel)}</Text>
            <Text style={[styles.riskTitle, { color: getRiskColor(results.riskLevel) }]}>
              {results.riskLevel.toUpperCase()} {results.riskLevel === 'High' ? 'MORTALITY RISK' : 'RISK'}
            </Text>
          </View>
          <Text style={styles.riskDescription}>
            {getRiskDescription(results.score)}
          </Text>
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
          <TouchableOpacity style={styles.actionButton} onPress={handleSave}>
            <Text style={styles.actionButtonIcon}>💾</Text>
            <Text style={styles.actionButtonText}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleExport}>
            <Text style={styles.actionButtonIcon}>📤</Text>
            <Text style={styles.actionButtonText}>Export</Text>
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
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 24,
    borderRadius: 16,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  riskDescription: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
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
});

export default ResultsScreen;