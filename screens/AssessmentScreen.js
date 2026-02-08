import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { responsive } from '../utils/responsive';

const AssessmentScreen = ({ navigation, route }) => {
  const [parameters, setParameters] = useState({
    P: null,
    E: null,
    D: null,
    S1: null,
    S2: { shock: false, intubation: false, mods: false },
  });

  const [currentScore, setCurrentScore] = useState(0);

  // Reset function
  const resetAssessment = () => {
    setParameters({
      P: null,
      E: null,
      D: null,
      S1: null,
      S2: { shock: false, intubation: false, mods: false },
    });
    setCurrentScore(0);
  };

  // Reset when screen is focused with reset flag (for tab navigation)
  useFocusEffect(
    React.useCallback(() => {
      const resetFlag = route?.params?.reset;
      if (resetFlag) {
        resetAssessment();
        // Clear the reset flag after resetting
        navigation.setParams({ reset: undefined });
      }
    }, [route?.params?.reset, navigation])
  );

  // Also listen for route params changes (for immediate navigation resets)
  useEffect(() => {
    if (route?.params?.reset) {
      resetAssessment();
      navigation.setParams({ reset: undefined });
    }
  }, [route?.params?.reset]);

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
          <TouchableOpacity
            style={styles.resetButton}
            onPress={() => {
              Alert.alert(
                'Reset Assessment',
                'Are you sure you want to reset all assessment parameters?',
                [
                  { text: 'Cancel', style: 'cancel' },
                  {
                    text: 'Reset',
                    style: 'destructive',
                    onPress: () => {
                      resetAssessment();
                      Alert.alert('Success', 'Assessment parameters have been reset.');
                    }
                  }
                ]
              );
            }}
          >
            <Text 
              style={styles.resetButtonText}
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              minimumFontScale={0.8}
            >
              Reset
            </Text>
          </TouchableOpacity>
          <Text 
            style={styles.headerTitle}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            minimumFontScale={0.8}
          >
            Clinical Assessment
          </Text>
          <View style={styles.placeholder} />
        </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
        <View style={styles.scoreDisplay}>
          <Text 
            style={styles.scoreLabel}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            minimumFontScale={0.8}
          >
            Current PEDSS Score
          </Text>
          <Text style={styles.scoreValue}>{currentScore}/6</Text>
        </View>

        {/* P - Premorbid PCPCS */}
        <View style={styles.parameterCard}>
          <Text 
            style={styles.cardTitle}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            minimumFontScale={0.8}
          >
            P - Premorbid PCPCS
          </Text>
          <Text style={styles.cardDescription}>Pediatric Cerebral Performance Category Scale</Text>
          <View style={styles.options}>
            <TouchableOpacity
              style={[styles.option, parameters.P === 0 && styles.optionSelected]}
              onPress={() => updateParameter('P', 0)}
            >
              <Text 
                style={[styles.optionText, parameters.P === 0 && styles.optionTextSelected]}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.8}
              >
                ≤2 (Normal) - Score: 0
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.option, parameters.P === 1 && styles.optionSelected]}
              onPress={() => updateParameter('P', 1)}
            >
              <Text 
                style={[styles.optionText, parameters.P === 1 && styles.optionTextSelected]}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.8}
              >
                >2 (Abnormal) - Score: 1
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* E - EEG Background */}
        <View style={styles.parameterCard}>
          <Text 
            style={styles.cardTitle}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            minimumFontScale={0.8}
          >
            E - EEG Background
          </Text>
          <Text style={styles.cardDescription}>30-minute EEG at 6-12 hours (paucity of sleep markers with continuous diffuse delta activity or low voltage slow unreactive activity or NCSE)</Text>
          <View style={styles.options}>
            <TouchableOpacity
              style={[styles.option, parameters.E === 0 && styles.optionSelected]}
              onPress={() => updateParameter('E', 0)}
            >
              <Text 
                style={[styles.optionText, parameters.E === 0 && styles.optionTextSelected]}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.8}
              >
                Normal - Score: 0
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.option, parameters.E === 1 && styles.optionSelected]}
              onPress={() => updateParameter('E', 1)}
            >
              <Text 
                style={[styles.optionText, parameters.E === 1 && styles.optionTextSelected]}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.8}
              >
                Abnormal - Score: 1
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* D - Drug Refractoriness */}
        <View style={styles.parameterCard}>
          <Text 
            style={styles.cardTitle}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            minimumFontScale={0.8}
          >
            D - Drug Refractoriness
          </Text>
          <Text style={styles.cardDescription}>Response to treatment</Text>
          <View style={styles.options}>
            <TouchableOpacity
              style={[styles.option, parameters.D === 0 && styles.optionSelected]}
              onPress={() => updateParameter('D', 0)}
            >
              <Text 
                style={[styles.optionText, parameters.D === 0 && styles.optionTextSelected]}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.8}
              >
                None - Score: 0
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.option, parameters.D === 1 && styles.optionSelected]}
              onPress={() => updateParameter('D', 1)}
            >
              <Text 
                style={[styles.optionText, parameters.D === 1 && styles.optionTextSelected]}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.8}
              >
                BDZR - Score: 1
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.option, parameters.D === 2 && styles.optionSelected]}
              onPress={() => updateParameter('D', 2)}
            >
              <Text 
                style={[styles.optionText, parameters.D === 2 && styles.optionTextSelected]}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.8}
              >
                RSE - Score: 2
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* S1 - Seizure Semiology */}
        <View style={styles.parameterCard}>
          <Text 
            style={styles.cardTitle}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            minimumFontScale={0.8}
          >
            S1 - Seizure Semiology
          </Text>
          <Text style={styles.cardDescription}>Seizure type classification</Text>
          <View style={styles.options}>
            <TouchableOpacity
              style={[styles.option, parameters.S1 === 0 && styles.optionSelected]}
              onPress={() => updateParameter('S1', 0)}
            >
              <Text 
                style={[styles.optionText, parameters.S1 === 0 && styles.optionTextSelected]}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.8}
              >
                Focal - Score: 0
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.option, parameters.S1 === 1 && styles.optionSelected]}
              onPress={() => updateParameter('S1', 1)}
            >
              <Text 
                style={[styles.optionText, parameters.S1 === 1 && styles.optionTextSelected]}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.8}
              >
                Generalized - Score: 1
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* S2 - Critical Sickness */}
        <View style={styles.parameterCard}>
          <Text 
            style={styles.cardTitle}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            minimumFontScale={0.8}
          >
            S2 - Critical Sickness
          </Text>
          <Text style={styles.cardDescription}>Presence of critical conditions</Text>
          <View style={styles.checkboxes}>
            <TouchableOpacity
              style={styles.checkboxItem}
              onPress={() => updateCriticalSickness('shock')}
            >
              <View style={[styles.checkbox, parameters.S2.shock && styles.checkboxSelected]}>
              </View>
              <Text 
                style={styles.checkboxText}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.8}
              >
                Shock
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.checkboxItem}
              onPress={() => updateCriticalSickness('intubation')}
            >
              <View style={[styles.checkbox, parameters.S2.intubation && styles.checkboxSelected]}>
              </View>
              <Text 
                style={styles.checkboxText}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.8}
              >
                ET Intubation
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.checkboxItem}
              onPress={() => updateCriticalSickness('mods')}
            >
              <View style={[styles.checkbox, parameters.S2.mods && styles.checkboxSelected]}>
              </View>
              <Text 
                style={styles.checkboxText}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.8}
              >
                MODS
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.calculateButton} onPress={handleCalculate}>
          <Text 
            style={styles.calculateButtonText}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            minimumFontScale={0.8}
          >
            Calculate PEDSS Score
          </Text>
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
  contentContainer: {
    width: '100%',
    maxWidth: responsive.getMaxContentWidth(),
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsive.scalePadding(20),
    paddingVertical: responsive.scalePadding(16),
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    zIndex: 1000,
  },
  resetButton: {
    paddingVertical: responsive.scalePadding(6),
    paddingHorizontal: responsive.scalePadding(12),
    backgroundColor: '#DC2626',
    borderRadius: 8,
    minWidth: responsive.scaleSize(70),
    alignItems: 'center',
  },
  resetButtonText: {
    color: 'white',
    fontSize: responsive.scaleFont(13),
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: responsive.scaleFont(18),
    fontWeight: 'bold',
    color: '#1E293B',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: responsive.scaleSize(70),
  },
  scoreDisplay: {
    backgroundColor: 'white',
    margin: responsive.scalePadding(20),
    padding: responsive.scalePadding(20),
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  scoreLabel: {
    fontSize: responsive.scaleFont(16),
    color: '#6B7280',
    marginBottom: responsive.scalePadding(8),
  },
  scoreValue: {
    fontSize: responsive.scaleFont(32),
    fontWeight: 'bold',
    color: '#2563EB',
  },
  parameterCard: {
    backgroundColor: 'white',
    marginHorizontal: responsive.scalePadding(20),
    marginBottom: responsive.scalePadding(16),
    padding: responsive.scalePadding(20),
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: responsive.scaleFont(18),
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: responsive.scalePadding(8),
  },
  cardDescription: {
    fontSize: responsive.scaleFont(14),
    color: '#6B7280',
    marginBottom: responsive.scalePadding(16),
  },
  options: {
    gap: responsive.scalePadding(12),
  },
  option: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: responsive.scalePadding(16),
  },
  optionSelected: {
    backgroundColor: '#EFF6FF',
    borderColor: '#2563EB',
  },
  optionText: {
    fontSize: responsive.scaleFont(16),
    color: '#374151',
  },
  optionTextSelected: {
    color: '#2563EB',
    fontWeight: '600',
  },
  checkboxes: {
    gap: responsive.scalePadding(12),
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: responsive.scaleSize(24),
    height: responsive.scaleSize(24),
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    marginRight: responsive.scalePadding(12),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  checkboxSelected: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  checkboxText: {
    fontSize: responsive.scaleFont(16),
    color: '#374151',
  },
  calculateButton: {
    backgroundColor: '#2563EB',
    margin: responsive.scalePadding(20),
    paddingVertical: responsive.scalePadding(16),
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
    fontSize: responsive.scaleFont(18),
    fontWeight: 'bold',
  },
});

export default AssessmentScreen;