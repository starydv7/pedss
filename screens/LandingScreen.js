import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { responsive } from '../utils/responsive';

const LandingScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.content, { maxWidth: responsive.getMaxContentWidth() }]}>
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
            onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })}
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
    paddingHorizontal: responsive.scalePadding(24),
    paddingVertical: responsive.scalePadding(40),
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '100%',
  },
  logoSection: {
    alignItems: 'center',
    marginTop: responsive.scalePadding(60),
  },
  hospitalIcon: {
    width: responsive.scaleSize(120),
    height: responsive.scaleSize(120),
    borderRadius: responsive.scaleSize(60),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsive.scalePadding(24),
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  logoCircle: {
    width: responsive.scaleSize(100),
    height: responsive.scaleSize(100),
    borderRadius: responsive.scaleSize(50),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  pedssIcon: {
    width: responsive.scaleSize(90),
    height: responsive.scaleSize(90),
  },
  appTitle: {
    fontSize: responsive.scaleFont(48),
    fontWeight: 'bold',
    color: 'white',
    marginBottom: responsive.scalePadding(8),
    letterSpacing: 2,
  },
  appSubtitle: {
    fontSize: responsive.scaleFont(18),
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
    fontSize: responsive.scaleFont(16),
    fontWeight: '600',
    marginVertical: 4,
  },
  collaborationAnd: {
    fontSize: responsive.scaleFont(14),
    color: 'rgba(255, 255, 255, 0.7)',
    marginVertical: 4,
    fontWeight: '400',
  },
  collaborationText: {
    fontSize: responsive.scaleFont(16),
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: responsive.scaleFont(24),
    maxWidth: '100%',
    marginTop: responsive.scalePadding(8),
  },
  buttonSection: {
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: 'white',
    paddingVertical: responsive.scalePadding(16),
    paddingHorizontal: responsive.scalePadding(32),
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
    fontSize: responsive.scaleFont(18),
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    marginTop: responsive.scalePadding(20),
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: responsive.scaleFont(14),
    marginBottom: 4,
    maxWidth: '100%',
  },
  footerSubtext: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: responsive.scaleFont(12),
    textAlign: 'center',
    maxWidth: '100%',
  },
  contributorsLinkContainer: {
    alignItems: 'center',
    marginTop: responsive.scalePadding(20),
  },
  contributorsLinkText: {
    color: 'white',
    fontSize: responsive.scaleFont(16),
    fontWeight: '500',
    textDecorationLine: 'underline',
    textDecorationColor: 'white',
    maxWidth: '100%',
  },
});

export default LandingScreen;

