import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const LandingScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <View style={styles.hospitalIcon}>
            <Text style={styles.hospitalEmoji}>🏥</Text>
          </View>
          <Text style={styles.appTitle}>PEDSS</Text>
          <Text style={styles.appSubtitle}>Outcome Prediction Tool</Text>
        </View>

        {/* Collaboration Section */}
        <View style={styles.collaborationSection}>
          <View style={styles.institutionRow}>
            <View style={styles.institutionBadge}>
              <Text style={styles.institutionText}>AIIMS, New Delhi</Text>
            </View>
            <Text style={styles.collaborationSymbol}>×</Text>
            <View style={styles.institutionBadge}>
              <Text style={styles.institutionText}>IIITD</Text>
            </View>
          </View>
          <Text style={styles.collaborationText}>
            Pediatric Convulsive Status Epilepticus{'\n'}Prediction Score
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonSection}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('MainTabs', { screen: 'PatientInfo' })}
          >
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </TouchableOpacity>
        </View>

        {/* Contributors Button */}
        <TouchableOpacity
          style={styles.contributorsButton}
          onPress={() => navigation.navigate('Contributors')}
        >
          <Text style={styles.contributorsButtonText}>Contributors</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>AIIMS-IIITD 2026</Text>
          <Text style={styles.footerSubtext}>
            Medical-grade outcome prediction for pediatric seizures
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2563EB',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
    justifyContent: 'space-between',
  },
  logoSection: {
    alignItems: 'center',
    marginTop: 60,
  },
  hospitalIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  hospitalEmoji: {
    fontSize: 60,
  },
  appTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    letterSpacing: 2,
  },
  appSubtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    fontWeight: '500',
  },
  collaborationSection: {
    alignItems: 'center',
  },
  institutionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  institutionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  institutionEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  institutionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  collaborationSymbol: {
    fontSize: 24,
    color: 'white',
    marginHorizontal: 16,
    fontWeight: 'bold',
  },
  collaborationText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonSection: {
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  primaryButtonText: {
    color: '#2563EB',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    marginBottom: 4,
  },
  footerSubtext: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    textAlign: 'center',
  },
  contributorsButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  contributorsButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LandingScreen;

