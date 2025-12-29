import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

const HomeScreen = ({ navigation, route }) => {

  const features = [
    {
      icon: '📝',
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
      icon: '⚙️',
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
      icon: '📊',
      title: 'Results & Analysis',
      description: 'View risk assessment and clinical interpretation',
      action: () => {
        const tabNavigator = navigation.getParent();
        if (tabNavigator) {
          tabNavigator.navigate('Results');
        }
      },
    },
    {
      icon: '📚',
      title: 'Case History',
      description: 'Review previous assessments and outcomes',
      action: () => {
        const parent = navigation.getParent()?.getParent();
        if (parent) {
          parent.navigate('CaseHistory');
        }
      },
    },
  ];


  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>🏥 PEDSS</Text>
          <Text style={styles.headerSubtitle}>Outcome Prediction Tool</Text>
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
          <Text style={styles.profileIcon}>👤</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>

        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Welcome to PEDSS</Text>
          <Text style={styles.welcomeText}>
            Pediatric Emergency Department Seizure Score calculator for accurate outcome prediction
          </Text>
        </View>

        {/* Main Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Assessment Workflow</Text>
          <View style={styles.featuresList}>
            {features.map((feature, index) => (
              <TouchableOpacity
                key={index}
                style={styles.featureCard}
                onPress={feature.action}
              >
                <View style={styles.featureIconContainer}>
                  <Text style={styles.featureIcon}>{feature.icon}</Text>
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </View>
                <Text style={styles.featureArrow}>→</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* PEDSS Info */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>About PEDSS Score</Text>
          <Text style={styles.infoText}>
            The Pediatric Emergency Department Seizure Score (PEDSS) is a validated tool for predicting outcomes in pediatric patients with seizures.
          </Text>
          <View style={styles.scoreInfo}>
            <Text style={styles.scoreInfoTitle}>Score Range: 0-6</Text>
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
          <Text style={styles.riskTitle}>Risk Assessment</Text>
          <View style={styles.riskLevels}>
            <View style={[styles.riskLevel, styles.mediumRisk]}>
              <Text style={styles.riskIcon}>🟡</Text>
              <Text style={styles.riskText}>Score ≥3: Risk of poor outcome</Text>
            </View>
            <View style={[styles.riskLevel, styles.highRisk]}>
              <Text style={styles.riskIcon}>🔴</Text>
              <Text style={styles.riskText}>Score ≥4: Risk of mortality</Text>
            </View>
          </View>
        </View>

                    {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>AIIMS, New Delhi × IIIT Delhi</Text>
              <Text style={styles.footerSubtext}>Medical-grade outcome prediction</Text>
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
    paddingVertical: 20,
    backgroundColor: '#2563EB',
    zIndex: 1000,
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    fontSize: 20,
  },
  welcomeSection: {
    backgroundColor: 'white',
    padding: 24,
    marginHorizontal: 20,
    marginTop: 20,
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 16,
    color: '#64748B',
    lineHeight: 24,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 16,
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
  quickActionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  quickActionTextContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionTitle: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 4,
  },
  quickActionSubtitle: {
    fontSize: 11,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 2,
  },
  featuresList: {
    gap: 12,
  },
  featureCard: {
    backgroundColor: 'white',
    padding: 20,
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
  featureIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureIcon: {
    fontSize: 24,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  featureArrow: {
    fontSize: 20,
    color: '#2563EB',
    fontWeight: 'bold',
  },
  infoSection: {
    backgroundColor: 'white',
    margin: 20,
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
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#64748B',
    lineHeight: 24,
    marginBottom: 16,
  },
  scoreInfo: {
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 12,
  },
  scoreInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2563EB',
    marginBottom: 8,
  },
  scoreBreakdown: {
    gap: 4,
  },
  scoreItem: {
    fontSize: 14,
    color: '#374151',
  },
  riskSection: {
    margin: 20,
    backgroundColor: 'white',
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
  riskTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 16,
  },
  riskLevels: {
    gap: 12,
  },
  riskLevel: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
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
  riskIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  riskText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  footer: {
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600',
  },
  footerSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
});

export default HomeScreen;
