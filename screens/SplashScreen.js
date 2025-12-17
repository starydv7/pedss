import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Auto-navigate to Landing after 2 seconds
    const timer = setTimeout(() => {
      navigation.replace('Landing');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

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
              <Text style={styles.institutionEmoji}>🏛️</Text>
              <Text style={styles.institutionText}>AIIMS, New Delhi</Text>
            </View>
            <Text style={styles.collaborationSymbol}>×</Text>
            <View style={styles.institutionBadge}>
              <Text style={styles.institutionEmoji}>🔬</Text>
              <Text style={styles.institutionText}>IIITD</Text>
            </View>
          </View>
          <Text style={styles.collaborationText}>
            Pediatric Convulsive Status Epilepticus{'\n'}Prediction Score
          </Text>
        </View>

        {/* Loading Indicator */}
        <View style={styles.loadingSection}>
          <ActivityIndicator size="large" color="white" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Version 1.0 | AIIMS-IIITD 2024</Text>
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
  loadingSection: {
    alignItems: 'center',
    marginVertical: 40,
  },
  loadingText: {
    color: 'white',
    fontSize: 16,
    marginTop: 16,
    fontWeight: '500',
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
});

export default SplashScreen;

