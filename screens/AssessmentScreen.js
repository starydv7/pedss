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
  const [parameters, setParameters] = useState({
    P: null,
    E: null,
    D: null,
    S1: null,
    S2: { shock: false, intubation: false, mods: false },
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
    if (params.P !== null) score += params.P;
    if (params.E !== null) score += params.E;
    if (params.D !== null) score += params.D;
    if (params.S1 !== null) score += params.S1;
    if (params.S2.shock || params.S2.intubation || params.S2.mods) score += 1;
    setCurrentScore(score);
  };

  const validateAssessment = () => {
    const missing = [];
    if (parameters.P === null) missing.push('P (Premorbid PCPCS)');
    if (parameters.E === null) missing.push('E (EEG Background)');
    if (parameters.D === null) missing.push('D (Drug Refractoriness)');
    if (parameters.S1 === null) missing.push('S1 (Seizure Semiology)');
    
    if (missing.length > 0) {
      Alert.alert(
        'Incomplete Assessment',
        `Please complete the following parameters:\n\n${missing.join('\n')}`,
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  };

  const handleCalculate = () => {
    // Validate all required parameters are selected
    if (!validateAssessment()) {
      return;
    }

    // Get patient data from route params if available
    const patientData = route?.params?.patientData || {};

    // Calculate S2 score (1 if any condition is true, 0 otherwise)
    const s2Score = (parameters.S2.shock || parameters.S2.intubation || parameters.S2.mods) ? 1 : 0;
    
    const results = {
      score: currentScore,
      riskLevel: currentScore >= 4 ? 'High' : currentScore >= 3 ? 'Medium' : 'Low',
      parameters: {
        P: parameters.P,
        E: parameters.E,
        D: parameters.D,
        S1: parameters.S1,
        S2: s2Score,
      },
      patientData: patientData,
    };
    navigation.navigate('Results', results);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Clinical Assessment</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>

        <View style={styles.scoreDisplay}>
          <Text style={styles.scoreLabel}>Current PEDSS Score</Text>
          <Text style={styles.scoreValue}>{currentScore}/6</Text>
        </View>

        {/* P - Premorbid PCPCS */}
        <View style={styles.parameterCard}>
          <Text style={styles.cardTitle}>🧠 P - Premorbid PCPCS</Text>
          <Text style={styles.cardDescription}>Pediatric Cerebral Performance Category Scale</Text>
          <View style={styles.options}>
            <TouchableOpacity
              style={[styles.option, parameters.P === 0 && styles.optionSelected]}
              onPress={() => updateParameter('P', 0)}
            >
              <Text style={[styles.optionText, parameters.P === 0 && styles.optionTextSelected]}>
                ≤2 (Normal) - Score: 0
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.option, parameters.P === 1 && styles.optionSelected]}
              onPress={() => updateParameter('P', 1)}
            >
              <Text style={[styles.optionText, parameters.P === 1 && styles.optionTextSelected]}>
                >2 (Abnormal) - Score: 1
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* E - EEG Background */}
        <View style={styles.parameterCard}>
          <Text style={styles.cardTitle}>📊 E - EEG Background</Text>
          <Text style={styles.cardDescription}>30-minute EEG at 6-12 hours (paucity of sleep markers with continuous diffuse delta activity or low voltage slow unreactive activity or NCSE)</Text>
          <View style={styles.options}>
            <TouchableOpacity
              style={[styles.option, parameters.E === 0 && styles.optionSelected]}
              onPress={() => updateParameter('E', 0)}
            >
              <Text style={[styles.optionText, parameters.E === 0 && styles.optionTextSelected]}>
                Normal - Score: 0
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.option, parameters.E === 1 && styles.optionSelected]}
              onPress={() => updateParameter('E', 1)}
            >
              <Text style={[styles.optionText, parameters.E === 1 && styles.optionTextSelected]}>
                Abnormal - Score: 1
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* D - Drug Refractoriness */}
        <View style={styles.parameterCard}>
          <Text style={styles.cardTitle}>💊 D - Drug Refractoriness</Text>
          <Text style={styles.cardDescription}>Response to treatment</Text>
          <View style={styles.options}>
            <TouchableOpacity
              style={[styles.option, parameters.D === 0 && styles.optionSelected]}
              onPress={() => updateParameter('D', 0)}
            >
              <Text style={[styles.optionText, parameters.D === 0 && styles.optionTextSelected]}>
                None - Score: 0
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.option, parameters.D === 1 && styles.optionSelected]}
              onPress={() => updateParameter('D', 1)}
            >
              <Text style={[styles.optionText, parameters.D === 1 && styles.optionTextSelected]}>
                BDZR - Score: 1
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.option, parameters.D === 2 && styles.optionSelected]}
              onPress={() => updateParameter('D', 2)}
            >
              <Text style={[styles.optionText, parameters.D === 2 && styles.optionTextSelected]}>
                RSE - Score: 2
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* S1 - Seizure Semiology */}
        <View style={styles.parameterCard}>
          <Text style={styles.cardTitle}>🧠 S - Seizure Semiology</Text>
          <Text style={styles.cardDescription}>Seizure type classification</Text>
          <View style={styles.options}>
            <TouchableOpacity
              style={[styles.option, parameters.S1 === 0 && styles.optionSelected]}
              onPress={() => updateParameter('S1', 0)}
            >
              <Text style={[styles.optionText, parameters.S1 === 0 && styles.optionTextSelected]}>
                Focal - Score: 0
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.option, parameters.S1 === 1 && styles.optionSelected]}
              onPress={() => updateParameter('S1', 1)}
            >
              <Text style={[styles.optionText, parameters.S1 === 1 && styles.optionTextSelected]}>
                Generalized - Score: 1
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* S2 - Critical Sickness */}
        <View style={styles.parameterCard}>
          <Text style={styles.cardTitle}>🚨 S - Critical Sickness</Text>
          <Text style={styles.cardDescription}>Presence of critical conditions</Text>
          <View style={styles.checkboxes}>
            <TouchableOpacity
              style={styles.checkboxItem}
              onPress={() => updateCriticalSickness('shock')}
            >
              <View style={[styles.checkbox, parameters.S2.shock && styles.checkboxSelected]}>
                {parameters.S2.shock && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.checkboxText}>Shock</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.checkboxItem}
              onPress={() => updateCriticalSickness('intubation')}
            >
              <View style={[styles.checkbox, parameters.S2.intubation && styles.checkboxSelected]}>
                {parameters.S2.intubation && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.checkboxText}>ET Intubation</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.checkboxItem}
              onPress={() => updateCriticalSickness('mods')}
            >
              <View style={[styles.checkbox, parameters.S2.mods && styles.checkboxSelected]}>
                {parameters.S2.mods && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.checkboxText}>MODS</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.calculateButton} onPress={handleCalculate}>
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
  scoreDisplay: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
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
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  options: {
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
  checkboxes: {
    gap: 12,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
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
    shadowOffset: { width: 0, height: 4 },
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