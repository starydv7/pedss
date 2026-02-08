import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { responsive } from '../utils/responsive';

const PatientInfoScreen = ({ navigation, route }) => {
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [assessmentDate, setAssessmentDate] = useState(new Date().toLocaleDateString());

  // Reset form when navigating with reset flag
  useEffect(() => {
    if (route?.params?.reset) {
      setPatientName('');
      setPatientAge('');
      setSelectedGender('');
      setAssessmentDate(new Date().toLocaleDateString());
      // Clear the reset flag
      navigation.setParams({ reset: undefined });
    }
  }, [route?.params?.reset, navigation]);

  const validateAndProceed = () => {
    // Validate patient name
    if (!patientName.trim()) {
      Alert.alert('Required Field', 'Please enter patient name or ID');
      return;
    }

    // Validate age - must be a number
    if (!patientAge.trim()) {
      Alert.alert('Required Field', 'Please enter patient age in months');
      return;
    }

    const ageNumber = parseInt(patientAge.trim(), 10);
    if (isNaN(ageNumber) || ageNumber < 0 || ageNumber > 240) {
      Alert.alert(
        'Invalid Age',
        'Please enter a valid age in months (0-240 months, i.e., 0-20 years)'
      );
      return;
    }

    // Validate gender
    if (!selectedGender) {
      Alert.alert('Required Field', 'Please select patient gender');
      return;
    }

    // Store patient data and navigate to assessment
    const patientData = {
      name: patientName.trim(),
      age: ageNumber.toString(),
      gender: selectedGender,
      date: assessmentDate,
    };

    navigation.navigate('Assessment', { patientData });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text 
          style={styles.headerTitle}
          numberOfLines={1}
          adjustsFontSizeToFit={true}
          minimumFontScale={0.8}
        >
          Patient Information
        </Text>
        <TouchableOpacity
          style={styles.newPatientButton}
          onPress={() => {
            setPatientName('');
            setPatientAge('');
            setSelectedGender('');
            setAssessmentDate(new Date().toLocaleDateString());
            // Also reset Assessment screen
            navigation.navigate('Assessment', { reset: true });
          }}
        >
          <Text 
            style={styles.newPatientButtonText}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            minimumFontScale={0.8}
          >
            New
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '25%' }]} />
          </View>
        </View>

        {/* Form Card */}
        <View style={styles.formCard}>
          <View style={styles.cardHeader}>
            <Text 
              style={styles.cardTitle}
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              minimumFontScale={0.8}
            >
              Basic Patient Details
            </Text>
          </View>

          {/* Patient Name/ID */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Patient Name/ID *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter patient name or ID"
              value={patientName}
              onChangeText={setPatientName}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Age */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Age (months) *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter age in months (e.g., 24)"
              value={patientAge}
              onChangeText={(text) => {
                // Only allow numbers
                const numericText = text.replace(/[^0-9]/g, '');
                setPatientAge(numericText);
              }}
              keyboardType="numeric"
              placeholderTextColor="#9CA3AF"
              maxLength={3}
            />
            <Text style={styles.inputHint}>Enter age in months (e.g., 24 for 2 years)</Text>
          </View>

          {/* Gender Selection */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Gender *</Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity
                style={[
                  styles.radioOption,
                  selectedGender === 'Male' && styles.radioOptionSelected,
                ]}
                onPress={() => setSelectedGender('Male')}
              >
                <View style={[
                  styles.radioCircle,
                  selectedGender === 'Male' && styles.radioCircleSelected,
                ]}>
                  {selectedGender === 'Male' && <View style={styles.radioInner} />}
                </View>
                <Text style={[
                  styles.radioText,
                  selectedGender === 'Male' && styles.radioTextSelected,
                ]}>
                  Male
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.radioOption,
                  selectedGender === 'Female' && styles.radioOptionSelected,
                ]}
                onPress={() => setSelectedGender('Female')}
              >
                <View style={[
                  styles.radioCircle,
                  selectedGender === 'Female' && styles.radioCircleSelected,
                ]}>
                  {selectedGender === 'Female' && <View style={styles.radioInner} />}
                </View>
                <Text style={[
                  styles.radioText,
                  selectedGender === 'Female' && styles.radioTextSelected,
                ]}>
                  Female
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.radioOption,
                  selectedGender === 'Other' && styles.radioOptionSelected,
                ]}
                onPress={() => setSelectedGender('Other')}
              >
                <View style={[
                  styles.radioCircle,
                  selectedGender === 'Other' && styles.radioCircleSelected,
                ]}>
                  {selectedGender === 'Other' && <View style={styles.radioInner} />}
                </View>
                <Text style={[
                  styles.radioText,
                  selectedGender === 'Other' && styles.radioTextSelected,
                ]}>
                  Other
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Assessment Date */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Assessment Date</Text>
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>{assessmentDate}</Text>
              <Text style={styles.dateSubtext}>Auto-populated</Text>
            </View>
          </View>
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            All patient information is stored locally and securely. 
            No data is transmitted to external servers.
          </Text>
        </View>

        {/* Next Button */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={validateAndProceed}
        >
          <Text 
            style={styles.nextButtonText}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            minimumFontScale={0.8}
          >
            Next →
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
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    minWidth: 60,
  },
  backButtonText: {
    color: '#2563EB',
    fontSize: responsive.scaleFont(24),
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: responsive.scaleFont(18),
    fontWeight: 'bold',
    color: '#1E293B',
    flex: 1,
    textAlign: 'center',
  },
  newPatientButton: {
    paddingVertical: responsive.scalePadding(6),
    paddingHorizontal: responsive.scalePadding(12),
    backgroundColor: '#2563EB',
    borderRadius: 8,
    minWidth: responsive.scaleSize(60),
    alignItems: 'center',
  },
  newPatientButtonText: {
    color: 'white',
    fontSize: responsive.scaleFont(13),
    fontWeight: '600',
  },
  progressBarContainer: {
    paddingHorizontal: responsive.scalePadding(20),
    paddingVertical: responsive.scalePadding(12),
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
  formCard: {
    backgroundColor: 'white',
    margin: responsive.scalePadding(20),
    borderRadius: 16,
    padding: responsive.scalePadding(24),
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
    marginBottom: responsive.scalePadding(24),
  },
  cardTitle: {
    fontSize: responsive.scaleFont(20),
    fontWeight: 'bold',
    color: '#1E293B',
  },
  inputGroup: {
    marginBottom: responsive.scalePadding(24),
  },
  inputLabel: {
    fontSize: responsive.scaleFont(16),
    fontWeight: '600',
    color: '#374151',
    marginBottom: responsive.scalePadding(8),
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: responsive.scalePadding(16),
    paddingVertical: responsive.scalePadding(12),
    fontSize: responsive.scaleFont(16),
    color: '#1E293B',
    backgroundColor: '#F9FAFB',
  },
  inputHint: {
    fontSize: responsive.scaleFont(12),
    color: '#6B7280',
    marginTop: 4,
  },
  radioGroup: {
    gap: 12,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: responsive.scalePadding(12),
    paddingHorizontal: responsive.scalePadding(16),
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
    width: responsive.scaleSize(20),
    height: responsive.scaleSize(20),
    borderRadius: responsive.scaleSize(10),
    borderWidth: 2,
    borderColor: '#D1D5DB',
    marginRight: responsive.scalePadding(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioCircleSelected: {
    borderColor: '#2563EB',
  },
  radioInner: {
    width: responsive.scaleSize(10),
    height: responsive.scaleSize(10),
    borderRadius: responsive.scaleSize(5),
    backgroundColor: '#2563EB',
  },
  radioText: {
    fontSize: responsive.scaleFont(16),
    color: '#374151',
  },
  radioTextSelected: {
    color: '#2563EB',
    fontWeight: '600',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: responsive.scalePadding(12),
    paddingHorizontal: responsive.scalePadding(16),
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
  },
  dateText: {
    fontSize: responsive.scaleFont(16),
    color: '#1E293B',
    fontWeight: '500',
  },
  dateSubtext: {
    fontSize: responsive.scaleFont(12),
    color: '#6B7280',
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#EFF6FF',
    marginHorizontal: responsive.scalePadding(20),
    marginBottom: responsive.scalePadding(20),
    padding: responsive.scalePadding(16),
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2563EB',
  },
  infoText: {
    flex: 1,
    fontSize: responsive.scaleFont(14),
    color: '#1E40AF',
    lineHeight: responsive.scaleFont(20),
  },
  nextButton: {
    backgroundColor: '#2563EB',
    marginHorizontal: responsive.scalePadding(20),
    marginBottom: responsive.scalePadding(32),
    paddingVertical: responsive.scalePadding(16),
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
  nextButtonText: {
    color: 'white',
    fontSize: responsive.scaleFont(18),
    fontWeight: 'bold',
  },
});

export default PatientInfoScreen;

