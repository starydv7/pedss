import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';

const AssessmentScreen = ({ navigation, route }) => {
  const { patientData } = route.params || {};
  
  const [parameters, setParameters] = useState({
    P: null, // Premorbid PCPCS
    E: null, // EEG Background
    D: null, // Drug Refractoriness
    S1: null, // Semiology
    S2: { shock: false, intubation: false, mods: false }, // Critical Sickness
  });

  const [currentScore, setCurrentScore] = useState(0);

  const updateParameter = (param, value) => {
    const newParameters = { ...parameters, [param]: value };
    setParameters(newParameters);
    calculateScore(newParameters);
  };

  const updateCriticalSickness = (condition) => {
    const newS2 = { ...parameters.S2, [condition]: !parameters.S2[condition] };
    const newParameters = { ...parameters, S2: newS2 };
    setParameters(newParameters);
    calculateScore(newParameters);
  };

  const calculateScore = (params) => {
    let score = 0;
    
    // P (Premorbid PCPCS)
    if (params.P !== null) score += params.P;
    
    // E (EEG Background)
    if (params.E !== null) score += params.E;
    
    // D (Drug Refractoriness)
    if (params.D !== null) score += params.D;
    
    // S1 (Semiology)
    if (params.S1 !== null) score += params.S1;
    
    // S2 (Critical Sickness) - any condition = 1 point
    if (params.S2.shock || params.S2.intubation || params.S2.mods) score += 1;
    
    setCurrentScore(score);
  };

  const validateAndProceed = () => {
    if (parameters.P === null) {
      Alert.alert('Required Field', 'Please select Premorbid PCPCS score');
      return;
    }
    if (parameters.E === null) {
      Alert.alert('Required Field', 'Please select EEG Background');
      return;
    }
    if (parameters.D === null) {
      Alert.alert('Required Field', 'Please select Drug Refractoriness');
      return;
    }
    if (parameters.S1 === null) {
      Alert.alert('Required Field', 'Please select Seizure Semiology');
      return;
    }

    const results = {
      patientData,
      parameters,
      score: currentScore,
      riskLevel: currentScore >= 4 ? 'High' : currentScore >= 3 ? 'Medium' : 'Low',
    };

    navigation.navigate('Results', { results });
  };

  const ParameterCard = ({ title, icon, children }) => (
    <View style={styles.parameterCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardIcon}>{icon}</Text>
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
      {children}
    </View>
  );

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
          <Text style={styles.headerTitle}>Clinical Assessment</Text>
          <View style={styles.progressIndicator}>
            <Text style={styles.progressText}>2/4</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '50%' }]} />
          </View>
        </View>

        {/* Current Score Display */}
        <View style={styles.scoreDisplay}>
          <Text style={styles.scoreLabel}>Current PEDSS Score</Text>
          <Text style={styles.scoreValue}>{currentScore}/6</Text>
        </View>

        {/* P - Premorbid PCPCS */}
        <ParameterCard title="P - Premorbid PCPCS" icon="🧠">
          <Text style={styles.parameterDescription}>
            Pediatric Cerebral Performance Category Scale before SE
          </Text>
          <View style={styles.optionGroup}>
            <TouchableOpacity
              style={[
                styles.option,
                parameters.P === 0 && styles.optionSelected,
              ]}
              onPress={() => updateParameter('P', 0)}
            >
              <Text style={[
                styles.optionText,
                parameters.P === 0 && styles.optionTextSelected,
              ]}>
                ≤2 (Normal) - Score: 0
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.option,
                parameters.P === 1 && styles.optionSelected,
              ]}
              onPress={() => updateParameter('P', 1)}
            >
              <Text style={[
                styles.optionText,
                parameters.P === 1 && styles.optionTextSelected,
              ]}>
                >2 (Abnormal) - Score: 1
              </Text>
            </TouchableOpacity>
          </View>
        </ParameterCard>

        {/* E - EEG Background */}
        <ParameterCard title="E - EEG Background" icon="📊">
          <Text style={styles.parameterDescription}>
            30-minute EEG at 6-12 hours
          </Text>
          <View style={styles.radioGroup}>
            <TouchableOpacity
              style={[
                styles.radioOption,
                parameters.E === 0 && styles.radioOptionSelected,
              ]}
              onPress={() => updateParameter('E', 0)}
            >
              <View style={[
                styles.radioCircle,
                parameters.E === 0 && styles.radioCircleSelected,
              ]}>
                {parameters.E === 0 && <View style={styles.radioInner} />}
              </View>
              <Text style={[
                styles.radioText,
                parameters.E === 0 && styles.radioTextSelected,
              ]}>
                Normal - Score: 0
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.radioOption,
                parameters.E === 1 && styles.radioOptionSelected,
              ]}
              onPress={() => updateParameter('E', 1)}
            >
              <View style={[
                styles.radioCircle,
                parameters.E === 1 && styles.radioCircleSelected,
              ]}>
                {parameters.E === 1 && <View style={styles.radioInner} />}
              </View>
              <Text style={[
                styles.radioText,
                parameters.E === 1 && styles.radioTextSelected,
              ]}>
                Abnormal - Score: 1
              </Text>
            </TouchableOpacity>
          </View>
        </ParameterCard>

        {/* D - Drug Refractoriness */}
        <ParameterCard title="D - Drug Refractoriness" icon="💊">
          <Text style={styles.parameterDescription}>
            Response to Benzodiazepine (BDZR) or Refractory SE (RSE)
          </Text>
          <View style={styles.radioGroup}>
            <TouchableOpacity
              style={[
                styles.radioOption,
                parameters.D === 0 && styles.radioOptionSelected,
              ]}
              onPress={() => updateParameter('D', 0)}
            >
              <View style={[
                styles.radioCircle,
                parameters.D === 0 && styles.radioCircleSelected,
              ]}>
                {parameters.D === 0 && <View style={styles.radioInner} />}
              </View>
              <Text style={[
                styles.radioText,
                parameters.D === 0 && styles.radioTextSelected,
              ]}>
                None - Score: 0
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.radioOption,
                parameters.D === 1 && styles.radioOptionSelected,
              ]}
              onPress={() => updateParameter('D', 1)}
            >
              <View style={[
                styles.radioCircle,
                parameters.D === 1 && styles.radioCircleSelected,
              ]}>
                {parameters.D === 1 && <View style={styles.radioInner} />}
              </View>
              <Text style={[
                styles.radioText,
                parameters.D === 1 && styles.radioTextSelected,
              ]}>
                BDZR - Score: 1
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.radioOption,
                parameters.D === 2 && styles.radioOptionSelected,
              ]}
              onPress={() => updateParameter('D', 2)}
            >
              <View style={[
                styles.radioCircle,
                parameters.D === 2 && styles.radioCircleSelected,
              ]}>
                {parameters.D === 2 && <View style={styles.radioInner} />}
              </View>
              <Text style={[
                styles.radioText,
                parameters.D === 2 && styles.radioTextSelected,
              ]}>
                RSE - Score: 2
              </Text>
            </TouchableOpacity>
          </View>
        </ParameterCard>

        {/* S1 - Seizure Semiology */}
        <ParameterCard title="S - Seizure Semiology" icon="🧠">
          <Text style={styles.parameterDescription}>
            Seizure type classification
          </Text>
          <View style={styles.radioGroup}>
            <TouchableOpacity
              style={[
                styles.radioOption,
                parameters.S1 === 0 && styles.radioOptionSelected,
              ]}
              onPress={() => updateParameter('S1', 0)}
            >
              <View style={[
                styles.radioCircle,
                parameters.S1 === 0 && styles.radioCircleSelected,
              ]}>
                {parameters.S1 === 0 && <View style={styles.radioInner} />}
              </View>
              <Text style={[
                styles.radioText,
                parameters.S1 === 0 && styles.radioTextSelected,
              ]}>
                Focal - Score: 0
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.radioOption,
                parameters.S1 === 1 && styles.radioOptionSelected,
              ]}
              onPress={() => updateParameter('S1', 1)}
            >
              <View style={[
                styles.radioCircle,
                parameters.S1 === 1 && styles.radioCircleSelected,
              ]}>
                {parameters.S1 === 1 && <View style={styles.radioInner} />}
              </View>
              <Text style={[
                styles.radioText,
                parameters.S1 === 1 && styles.radioTextSelected,
              ]}>
                Generalized - Score: 1
              </Text>
            </TouchableOpacity>
          </View>
        </ParameterCard>

        {/* S2 - Critical Sickness */}
        <ParameterCard title="S - Critical Sickness" icon="🚨">
          <Text style={styles.parameterDescription}>
            Presence of critical conditions (any checked = Score: 1)
          </Text>
          <View style={styles.checkboxGroup}>
            <TouchableOpacity
              style={styles.checkboxOption}
              onPress={() => updateCriticalSickness('shock')}
            >
              <View style={[
                styles.checkbox,
                parameters.S2.shock && styles.checkboxSelected,
              ]}>
                {parameters.S2.shock && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.checkboxText}>Shock</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.checkboxOption}
              onPress={() => updateCriticalSickness('intubation')}
            >
              <View style={[
                styles.checkbox,
                parameters.S2.intubation && styles.checkboxSelected,
              ]}>
                {parameters.S2.intubation && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.checkboxText}>ET Intubation</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.checkboxOption}
              onPress={() => updateCriticalSickness('mods')}
            >
              <View style={[
                styles.checkbox,
                parameters.S2.mods && styles.checkboxSelected,
              ]}>
                {parameters.S2.mods && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.checkboxText}>MODS</Text>
            </TouchableOpacity>
          </View>
        </ParameterCard>

        {/* Calculate Button */}
        <TouchableOpacity
          style={styles.calculateButton}
          onPress={validateAndProceed}
        >
          <Text style={styles.calculateButtonText}>📊 Calculate PEDSS Score</Text>
        </TouchableOpacity>
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
  scoreDisplay: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  scoreLabel: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  parameterCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    flex: 1,
  },
  parameterDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
    lineHeight: 20,
  },
  optionGroup: {
    gap: 12,
  },
  option: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 16,
  },
  optionSelected: {
    backgroundColor: '#EFF6FF',
    borderColor: '#2563EB',
  },
  optionText: {
    fontSize: 16,
    color: '#374151',
  },
  optionTextSelected: {
    color: '#2563EB',
    fontWeight: '600',
  },
  radioGroup: {
    gap: 12,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#F9FAFB',
  },
  radioOptionSelected: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioCircleSelected: {
    borderColor: '#2563EB',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2563EB',
  },
  radioText: {
    fontSize: 16,
    color: '#374151',
    flex: 1,
  },
  radioTextSelected: {
    color: '#2563EB',
    fontWeight: '600',
  },
  checkboxGroup: {
    gap: 12,
  },
  checkboxOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  checkboxSelected: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  checkmark: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkboxText: {
    fontSize: 16,
    color: '#374151',
  },
  calculateButton: {
    backgroundColor: '#2563EB',
    margin: 20,
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
  calculateButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AssessmentScreen;

