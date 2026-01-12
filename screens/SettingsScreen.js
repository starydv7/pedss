import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Linking,
} from 'react-native';

const SettingsScreen = ({ navigation }) => {

  const handleAbout = () => {
    Alert.alert(
      'About PEDSS App',
      'Developed by:\nAIIMS, New Delhi\nIIIT Delhi\n\nDeveloper:\nPawan Yadav\n\n© 2026 PEDSS APP. All rights reserved.',
      [
        { text: 'OK' },
        {
          text: 'LinkedIn',
          onPress: () => {
            Linking.openURL('https://www.linkedin.com/in/pawanstarydv7/').catch(() => {
              Alert.alert('Error', 'Could not open LinkedIn');
            });
          }
        }
      ]
    );
  };

  const SettingItem = ({ title, subtitle, onPress, rightComponent }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingLeft}>
        <View style={styles.settingText}>
          <Text 
            style={styles.settingTitle}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            minimumFontScale={0.8}
          >
            {title}
          </Text>
          {subtitle && (
            <Text 
              style={styles.settingSubtitle}
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              minimumFontScale={0.8}
            >
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      {rightComponent || <Text style={styles.settingArrow}>›</Text>}
    </TouchableOpacity>
  );

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
            Settings
          </Text>
          <View style={styles.placeholder} />
        </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>

        {/* Support Section */}
        <View style={styles.section}>
          <Text 
            style={styles.sectionTitle}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            minimumFontScale={0.8}
          >
            Support
          </Text>
          <View style={styles.settingsGroup}>
            <SettingItem
              title="User Guide"
              subtitle="Learn how to use the app"
              onPress={() => {
                Alert.alert(
                  'User Guide',
                  '1. Enter patient information\n2. Select all PEDSS parameters\n3. Calculate score\n4. Review results and save',
                  [{ text: 'OK' }]
                );
              }}
            />
            <SettingItem
              title="Help & FAQ"
              subtitle="Get answers to common questions"
              onPress={() => {
                Alert.alert(
                  'Help & FAQ',
                  'Q: What is PEDSS?\nA: Pediatric Emergency Department Seizure Score for outcome prediction.\n\nQ: How to calculate score?\nA: Select all parameters (P, E, D, S1, S2) and click Calculate.\n\nQ: Can I export data?\nA: Yes, use Export button to save as CSV or PDF.',
                  [{ text: 'OK' }]
                );
              }}
            />
            <SettingItem
              title="Contact Support"
              subtitle="Get in touch with our team"
              onPress={() => {
                Alert.alert(
                  'Contact Support',
                  'Email: aiimsiiitd@gmail.com\n\nDeveloped by:\nAIIMS, New Delhi\nIIIT Delhi',
                  [
                    { text: 'Cancel', style: 'cancel' },
                    {
                      text: 'Send Email',
                      onPress: () => {
                        const email = 'aiimsiiitd@gmail.com';
                        const subject = 'PEDSS App Support Request';
                        const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
                        Linking.openURL(mailtoUrl).catch(() => {
                          Alert.alert('Error', 'Could not open email client. Please email us at: aiimsiiitd@gmail.com');
                        });
                      }
                    }
                  ]
                );
              }}
            />
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text 
            style={styles.sectionTitle}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            minimumFontScale={0.8}
          >
            About
          </Text>
          <View style={styles.settingsGroup}>
            <SettingItem
              title="About PEDSS"
              subtitle="About the app"
              onPress={handleAbout}
            />
            <SettingItem
              title="Terms of Service"
              subtitle="Read our terms and conditions"
              onPress={() => {
                Alert.alert(
                  'Terms of Service',
                  'This app is a clinical decision support tool. It should not replace professional medical judgment. Always consult qualified medical professionals. The developers are not liable for clinical decisions made using this app.',
                  [{ text: 'OK' }]
                );
              }}
            />
            <SettingItem
              title="Privacy Policy"
              subtitle="How we protect your data"
              onPress={() => {
                // Open privacy policy URL if available
                const privacyUrl = 'https://vermillion-madeleine-3dd58d.netlify.app/';
                Alert.alert(
                  'Privacy Policy',
                  'All data is stored locally on your device. No data is transmitted to external servers. View full privacy policy?',
                  [
                    { text: 'Cancel', style: 'cancel' },
                    {
                      text: 'View Online',
                      onPress: () => {
                        Linking.openURL(privacyUrl).catch(() => {
                          Alert.alert('Error', 'Could not open privacy policy');
                        });
                      }
                    }
                  ]
                );
              }}
            />
          </View>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text 
            style={styles.appInfoText}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            minimumFontScale={0.8}
          >
            PEDSS Outcome Prediction Tool
          </Text>
          <Text style={styles.appInfoSubtext}>AIIMS, New Delhi × IIIT Delhi</Text>
          <Text style={styles.appInfoDeveloper}>Developer: Pawan Yadav</Text>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://www.linkedin.com/in/pawanstarydv7/').catch(() => {
                Alert.alert('Error', 'Could not open LinkedIn');
              });
            }}
          >
            <Text style={styles.appInfoLinkedIn}>LinkedIn Profile</Text>
          </TouchableOpacity>
          <Text style={styles.appInfoVersion}>© 2026 PEDSS APP. All rights reserved.</Text>
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
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    zIndex: 1000,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  backButtonText: {
    color: '#2563EB',
    fontSize: 24,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 60,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 12,
  },
  settingsGroup: {
    backgroundColor: 'white',
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
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  settingArrow: {
    fontSize: 18,
    color: '#9CA3AF',
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  appInfoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
    textAlign: 'center',
  },
  appInfoSubtext: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
    textAlign: 'center',
  },
  appInfoDeveloper: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
    fontWeight: '600',
  },
  appInfoLinkedIn: {
    fontSize: 14,
    color: '#2563EB',
    marginBottom: 12,
    textDecorationLine: 'underline',
  },
  appInfoVersion: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});

export default SettingsScreen;

