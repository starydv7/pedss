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
            <View style={styles.logoCircle}>
              <Image 
                source={require('../assets/PEDSS_icon_512x512.png')} 
                style={styles.pedssIcon}
                resizeMode="contain"
              />
            </View>
          </View>
          <Text 
            style={styles.appTitle}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            minimumFontScale={0.7}
          >
            PEDSS
          </Text>
          <Text 
            style={styles.appSubtitle}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            minimumFontScale={0.8}
          >
            Outcome Prediction Tool
          </Text>
        </View>

        {/* Collaboration Section */}
        <View style={styles.collaborationSection}>
          <View style={styles.institutionContainer}>
            <Text 
              style={styles.institutionText}
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              minimumFontScale={0.85}
            >
              AIIMS, New Delhi
            </Text>
            <Text style={styles.collaborationAnd}>and</Text>
            <Text 
              style={styles.institutionText}
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              minimumFontScale={0.85}
            >
              IIIT Delhi
            </Text>
          </View>
          <Text 
            style={styles.collaborationText}
            numberOfLines={2}
            adjustsFontSizeToFit={true}
            minimumFontScale={0.85}
          >
            Pediatric Convulsive Status Epilepticus{'\n'}Prediction Score
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonSection}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('MainTabs', { screen: 'PatientInfo' })}
          >
            <Text 
              style={styles.primaryButtonText}
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              minimumFontScale={0.8}
            >
              Get Started
            </Text>
          </TouchableOpacity>
        </View>

        {/* Contributors Link */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Contributors')}
          style={styles.contributorsLinkContainer}
        >
          <Text 
            style={styles.contributorsLinkText}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            minimumFontScale={0.8}
          >
            Contributors
          </Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text 
            style={styles.footerText}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            minimumFontScale={0.8}
          >
            AIIMS-IIITD 2026
          </Text>
          <Text 
            style={styles.footerSubtext}
            numberOfLines={2}
            adjustsFontSizeToFit={true}
            minimumFontScale={0.75}
          >
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
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  pedssIcon: {
    width: 90,
    height: 90,
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
    maxWidth: '100%',
  },
  collaborationSection: {
    alignItems: 'center',
  },
  institutionContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  institutionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 4,
  },
  collaborationAnd: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginVertical: 4,
    fontWeight: '400',
  },
  collaborationText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: '100%',
    marginTop: 8,
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
    maxWidth: '100%',
  },
  footerSubtext: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    textAlign: 'center',
    maxWidth: '100%',
  },
  contributorsLinkContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  contributorsLinkText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    textDecorationLine: 'underline',
    textDecorationColor: 'white',
    maxWidth: '100%',
  },
});

export default LandingScreen;

