import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { responsive } from '../utils/responsive';

const HomeScreen = ({ navigation, route }) => {

  const features = [
    {
      title: 'Patient Information',
      description: 'Enter basic patient demographics and case details',
      action: () => {
        const tabNavigator = navigation.getParent();
        if (tabNavigator) {
          tabNavigator.navigate('PatientInfo', { reset: true });
        }
      },
    },
    {
      title: 'Clinical Assessment',
      description: 'Input PEDSS parameters for outcome prediction',
      action: () => {
        const tabNavigator = navigation.getParent();
        if (tabNavigator) {
          tabNavigator.navigate('Assessment');
        }
      },
    },
    {
      title: 'Results & Analysis',
      description: 'View risk assessment and clinical interpretation',
      action: () => {
        const tabNavigator = navigation.getParent();
        if (tabNavigator) {
          tabNavigator.navigate('Results');
        }
      },
    },
  ];


  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text 
            style={styles.headerTitle}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            minimumFontScale={0.8}
          >
            PEDSS
          </Text>
          <Text 
            style={styles.headerSubtitle}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            minimumFontScale={0.8}
          >
            Outcome Prediction Tool
          </Text>
        </View>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => {
            const tabNavigator = navigation.getParent();
            if (tabNavigator) {
              tabNavigator.navigate('Profile');
            }
          }}
        >
          <Text style={styles.profileButtonText}>P</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text 
            style={styles.welcomeTitle}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            minimumFontScale={0.8}
          >
            Welcome to PEDSS
          </Text>
          <Text style={styles.welcomeText}>
            Pediatric Emergency Department Seizure Score calculator for accurate outcome prediction
          </Text>
        </View>

        {/* Main Features */}
        <View style={styles.section}>
          <Text 
            style={styles.sectionTitle}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            minimumFontScale={0.8}
          >
            Assessment Workflow
          </Text>
          <View style={styles.featuresList}>
            {features.map((feature, index) => (
              <TouchableOpacity
                key={index}
                style={styles.featureCard}
                onPress={feature.action}
              >
                <View style={styles.featureContent}>
                  <Text 
                    style={styles.featureTitle}
                    numberOfLines={1}
                    adjustsFontSizeToFit={true}
                    minimumFontScale={0.8}
                  >
                    {feature.title}
                  </Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </View>
                <Text style={styles.featureArrow}>→</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* PEDSS Info */}
        <View style={styles.infoSection}>
          <Text 
            style={styles.infoTitle}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            minimumFontScale={0.8}
          >
            About PEDSS Score
          </Text>
          <Text style={styles.infoText}>
            The Pediatric Emergency Department Seizure Score (PEDSS) is a validated tool for predicting outcomes in pediatric patients with seizures.
          </Text>
          <View style={styles.scoreInfo}>
            <Text 
              style={styles.scoreInfoTitle}
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              minimumFontScale={0.8}
            >
              Score Range: 0-6
            </Text>
            <View style={styles.scoreBreakdown}>
              <Text style={styles.scoreItem}>• P (PCPCS): 0-1 points</Text>
              <Text style={styles.scoreItem}>• E (EEG): 0-1 points</Text>
              <Text style={styles.scoreItem}>• D (Drug): 0-2 points</Text>
              <Text style={styles.scoreItem}>• S (Semiology): 0-1 points</Text>
              <Text style={styles.scoreItem}>• S (Sickness): 0-1 points</Text>
            </View>
          </View>
        </View>

        {/* Risk Levels */}
        <View style={styles.riskSection}>
          <Text 
            style={styles.riskTitle}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            minimumFontScale={0.8}
          >
            Risk Assessment
          </Text>
          <View style={styles.riskLevels}>
            <View style={[styles.riskLevel, styles.mediumRisk]}>
              <Text 
                style={styles.riskText}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.8}
              >
                Score ≥3: Risk of poor outcome
              </Text>
            </View>
            <View style={[styles.riskLevel, styles.highRisk]}>
              <Text 
                style={styles.riskText}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.8}
              >
                Score ≥4: Risk of mortality
              </Text>
            </View>
          </View>
        </View>

                    {/* Footer */}
            <View style={styles.footer}>
              <Text 
                style={styles.footerText}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.8}
              >
                AIIMS, New Delhi × IIIT Delhi
              </Text>
              <Text 
                style={styles.footerSubtext}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.8}
              >
                Medical-grade outcome prediction
              </Text>
            </View>
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
    backgroundColor: '#2563EB',
    zIndex: 1000,
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: responsive.scaleFont(24),
    fontWeight: 'bold',
    color: 'white',
    maxWidth: '100%',
  },
  headerSubtitle: {
    fontSize: responsive.scaleFont(14),
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
    maxWidth: '100%',
  },
  profileButton: {
    width: responsive.scaleSize(40),
    height: responsive.scaleSize(40),
    borderRadius: responsive.scaleSize(20),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileButtonText: {
    fontSize: responsive.scaleFont(16),
    fontWeight: '700',
    color: 'white',
  },
  welcomeSection: {
    backgroundColor: 'white',
    padding: responsive.scalePadding(24),
    marginHorizontal: responsive.scalePadding(20),
    marginTop: responsive.scalePadding(20),
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
  welcomeTitle: {
    fontSize: responsive.scaleFont(24),
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: responsive.scalePadding(8),
    maxWidth: '100%',
  },
  welcomeText: {
    fontSize: responsive.scaleFont(16),
    color: '#64748B',
    lineHeight: responsive.scaleFont(24),
  },
  section: {
    marginTop: responsive.scalePadding(24),
    paddingHorizontal: responsive.scalePadding(20),
  },
  sectionTitle: {
    fontSize: responsive.scaleFont(20),
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: responsive.scalePadding(16),
    maxWidth: '100%',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    minHeight: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  featuresList: {
    gap: 12,
  },
  featureCard: {
    backgroundColor: 'white',
    padding: responsive.scalePadding(20),
    borderRadius: 16,
    flexDirection: 'row',
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
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: responsive.scaleFont(18),
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
    maxWidth: '100%',
  },
  featureDescription: {
    fontSize: responsive.scaleFont(14),
    color: '#64748B',
    lineHeight: responsive.scaleFont(20),
  },
  featureArrow: {
    fontSize: responsive.scaleFont(20),
    color: '#2563EB',
    fontWeight: 'bold',
  },
  infoSection: {
    backgroundColor: 'white',
    margin: responsive.scalePadding(20),
    padding: responsive.scalePadding(24),
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
  infoTitle: {
    fontSize: responsive.scaleFont(20),
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: responsive.scalePadding(12),
    maxWidth: '100%',
  },
  infoText: {
    fontSize: responsive.scaleFont(16),
    color: '#64748B',
    lineHeight: responsive.scaleFont(24),
    marginBottom: responsive.scalePadding(16),
  },
  scoreInfo: {
    backgroundColor: '#F8FAFC',
    padding: responsive.scalePadding(16),
    borderRadius: 12,
  },
  scoreInfoTitle: {
    fontSize: responsive.scaleFont(16),
    fontWeight: 'bold',
    color: '#2563EB',
    marginBottom: responsive.scalePadding(8),
  },
  scoreBreakdown: {
    gap: 4,
  },
  scoreItem: {
    fontSize: responsive.scaleFont(14),
    color: '#374151',
  },
  riskSection: {
    margin: responsive.scalePadding(20),
    backgroundColor: 'white',
    padding: responsive.scalePadding(24),
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
  riskTitle: {
    fontSize: responsive.scaleFont(20),
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: responsive.scalePadding(16),
    maxWidth: '100%',
  },
  riskLevels: {
    gap: responsive.scalePadding(12),
  },
  riskLevel: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: responsive.scalePadding(12),
    borderRadius: 8,
  },
  lowRisk: {
    backgroundColor: '#F0FDF4',
  },
  mediumRisk: {
    backgroundColor: '#FEF3C7',
  },
  highRisk: {
    backgroundColor: '#FEF2F2',
  },
  riskText: {
    fontSize: responsive.scaleFont(16),
    fontWeight: '600',
    color: '#374151',
    maxWidth: '100%',
  },
  footer: {
    alignItems: 'center',
    padding: responsive.scalePadding(20),
    marginTop: responsive.scalePadding(20),
  },
  footerText: {
    fontSize: responsive.scaleFont(14),
    color: '#64748B',
    fontWeight: '600',
    maxWidth: '100%',
  },
  footerSubtext: {
    fontSize: responsive.scaleFont(12),
    color: '#9CA3AF',
    marginTop: 4,
    maxWidth: '100%',
  },
});

export default HomeScreen;
