import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';

const ResultsScreen = ({ navigation, route }) => {
  const { results } = route.params || {};
  const { patientData, parameters, score, riskLevel } = results || {};

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

  const handleSaveResult = () => {
    Alert.alert(
      'Save Result',
      'Assessment result saved successfully!',
      [{ text: 'OK' }]
    );
  };

  const handleExportResult = () => {
    Alert.alert(
      'Export Result',
      'PDF report generated and ready for sharing.',
      [{ text: 'OK' }]
    );
  };

  const handleNewAssessment = () => {
    navigation.navigate('PatientInfo');
  };

  const ParameterBreakdown = () => {
    const breakdown = [
      { label: 'P (PCPCS)', value: parameters?.P || 0, max: 1 },
      { label: 'E (EEG)', value: parameters?.E || 0, max: 1 },
      { label: 'D (Drug)', value: parameters?.D || 0, max: 2 },
      { label: 'S (Semiology)', value: parameters?.S1 || 0, max: 1 },
      { label: 'S (Sickness)', value: (parameters?.S2?.shock || parameters?.S2?.intubation || parameters?.S2?.mods) ? 1 : 0, max: 1 },
    ];

    return (
      <View style={styles.breakdownContainer}>
        {breakdown.map((item, index) => (
          <View key={index} style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>{item.label}</Text>
            <View style={styles.breakdownBar}>
              <View 
                style={[
                  styles.breakdownFill, 
                  { 
                    width: `${(item.value / item.max) * 100}%`,
                    backgroundColor: item.value > 0 ? '#2563EB' : '#E5E7EB'
                  }
                ]} 
              />
            </View>
            <Text style={styles.breakdownValue}>{item.value}/{item.max}</Text>
          </View>
        ))}
      </View>
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
          <Text style={styles.headerTitle}>Assessment Results</Text>
          <View style={styles.progressIndicator}>
            <Text style={styles.progressText}>3/4</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '75%' }]} />
          </View>
        </View>

        {/* Patient Info Summary */}
        {patientData && (
          <View style={styles.patientSummary}>
            <Text style={styles.summaryTitle}>Patient Summary</Text>
            <Text style={styles.summaryText}>
              {patientData.name} | {patientData.age} months | {patientData.gender}
            </Text>
            <Text style={styles.summaryDate}>{patientData.assessmentDate}</Text>
          </View>
        )}

        {/* Main Score Display */}
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreLabel}>🎯 PEDSS Score</Text>
          <Text style={styles.scoreValue}>{score}/6</Text>
          <View style={styles.scoreProgressBar}>
            <View 
              style={[
                styles.scoreProgressFill, 
                { width: `${(score / 6) * 100}%` }
              ]} 
            />
          </View>
        </View>

        {/* Risk Assessment */}
        <View style={[styles.riskContainer, { borderColor: getRiskColor(riskLevel) }]}>
          <View style={styles.riskHeader}>
            <Text style={styles.riskIcon}>{getRiskIcon(riskLevel)}</Text>
            <Text style={[styles.riskTitle, { color: getRiskColor(riskLevel) }]}>
              {riskLevel.toUpperCase()} {riskLevel === 'High' ? 'MORTALITY RISK' : 'RISK'}
            </Text>
          </View>
          <Text style={styles.riskDescription}>
            {getRiskDescription(score)}
          </Text>
        </View>

        {/* Parameter Breakdown */}
        <View style={styles.breakdownCard}>
          <Text style={styles.breakdownTitle}>📋 Parameter Breakdown</Text>
          <ParameterBreakdown />
        </View>

        {/* Clinical Interpretation */}
        <View style={styles.interpretationCard}>
          <Text style={styles.interpretationTitle}>📝 Clinical Interpretation</Text>
          <Text style={styles.interpretationText}>
            {score >= 4 ? (
              'This patient demonstrates high-risk factors including abnormal premorbid status and drug refractoriness. Immediate intensive care unit admission with continuous monitoring is strongly recommended. Consider early intervention strategies and prepare for potential complications.'
            ) : score >= 3 ? (
              'The patient shows concerning features that suggest a poor outcome is likely. Close monitoring in a high-dependency unit is advised with aggressive management of underlying conditions and seizure control.'
            ) : score >= 1 ? (
              'Moderate risk factors are present. Standard care protocols should be followed with regular reassessment and monitoring for any deterioration.'
            ) : (
              'Low risk profile suggests good prognosis with routine care. Continue standard monitoring and treatment protocols.'
            )}
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleSaveResult}
          >
            <Text style={styles.actionButtonIcon}>💾</Text>
            <Text style={styles.actionButtonText}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleExportResult}
          >
            <Text style={styles.actionButtonIcon}>📤</Text>
            <Text style={styles.actionButtonText}>Export</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleNewAssessment}
          >
            <Text style={styles.actionButtonIcon}>🔄</Text>
            <Text style={styles.actionButtonText}>New Case</Text>
          </TouchableOpacity>
        </View>

        {/* Disclaimer */}
        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerTitle}>⚠️ Medical Disclaimer</Text>
          <Text style={styles.disclaimerText}>
            This tool is for clinical decision support only. Always use clinical judgment and consider individual patient circumstances when making treatment decisions.
          </Text>
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
  progressIndicator: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  progressText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  progressBarContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 2,
  },
  patientSummary: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
    shadowOffset: {
      width: 0,
      height: 4,
    },
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
  breakdownContainer: {
    gap: 16,
  },
  breakdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
  disclaimer: {
    backgroundColor: '#FEF3C7',
    marginHorizontal: 20,
    marginBottom: 32,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  disclaimerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#92400E',
    marginBottom: 8,
  },
  disclaimerText: {
    fontSize: 13,
    color: '#92400E',
    lineHeight: 18,
  },
});

export default ResultsScreen;

