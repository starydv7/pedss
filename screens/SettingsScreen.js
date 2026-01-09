import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Switch,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import StorageService from '../services/StorageService';
import ExportService from '../services/ExportService';

const SettingsScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [dataSync, setDataSync] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const settings = await StorageService.getSettings();
      setNotifications(settings.notifications ?? true);
      setDarkMode(settings.darkMode ?? false);
      setAutoSave(settings.autoSave ?? true);
      setDataSync(settings.dataSync ?? false);
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async (newSettings) => {
    try {
      await StorageService.saveSettings({
        notifications,
        darkMode,
        autoSave,
        dataSync,
        ...newSettings,
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      Alert.alert('Error', 'Failed to save settings');
    }
  };

  const handleNotificationToggle = (value) => {
    setNotifications(value);
    saveSettings({ notifications: value });
  };

  const handleDarkModeToggle = (value) => {
    setDarkMode(value);
    saveSettings({ darkMode: value });
    Alert.alert('Dark Mode', 'Dark mode feature will be available in a future update.');
  };

  const handleAutoSaveToggle = (value) => {
    setAutoSave(value);
    saveSettings({ autoSave: value });
  };

  const handleDataSyncToggle = (value) => {
    setDataSync(value);
    saveSettings({ dataSync: value });
    Alert.alert('Data Sync', 'Data sync feature will be available in a future update.');
  };

  const handleExportData = async () => {
    try {
      const result = await ExportService.exportAllAssessmentsCSV();
      if (result.success) {
        Alert.alert('Success', result.message);
      } else {
        Alert.alert('Error', result.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to export data. Please try again.');
    }
  };

  const handleClearCache = async () => {
    Alert.alert(
      'Clear Cache',
      'This will clear all cached data. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              await StorageService.clearAllAssessments();
              Alert.alert('Success', 'Cache cleared successfully');
            } catch (error) {
              Alert.alert('Error', 'Failed to clear cache. Please try again.');
            }
          }
        }
      ]
    );
  };

  const handleResetApp = () => {
    Alert.alert(
      'Reset App',
      'This will reset all app data including assessments and settings. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            try {
              await StorageService.clearAllAssessments();
              await StorageService.saveSettings({
                notifications: true,
                darkMode: false,
                autoSave: true,
                dataSync: false,
              });
              setNotifications(true);
              setDarkMode(false);
              setAutoSave(true);
              setDataSync(false);
              Alert.alert('Success', 'App reset successfully');
            } catch (error) {
              Alert.alert('Error', 'Failed to reset app. Please try again.');
            }
          }
        }
      ]
    );
  };

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

  const SettingItem = ({ icon, title, subtitle, onPress, rightComponent }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingLeft}>
        <Text style={styles.settingIcon}>{icon}</Text>
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
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
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
          <View style={styles.placeholder} />
        </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>

        {/* Profile Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile</Text>
          <View style={styles.profileCard}>
            <View style={styles.profileInfo}>
              <View style={styles.profileAvatar}>
                <Text style={styles.profileAvatarText}>👤</Text>
              </View>
              <View style={styles.profileDetails}>
                <Text style={styles.profileName}>Dr. User</Text>
                <Text style={styles.profileRole}>Medical Professional</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.settingsGroup}>
            <SettingItem
              icon="🔔"
              title="Notifications"
              subtitle="Get notified about important updates"
              rightComponent={
                <Switch
                  value={notifications}
                  onValueChange={handleNotificationToggle}
                  trackColor={{ false: '#E5E7EB', true: '#2563EB' }}
                  thumbColor={notifications ? 'white' : '#9CA3AF'}
                />
              }
            />
            <SettingItem
              icon="🌙"
              title="Dark Mode"
              subtitle="Use dark theme for better visibility"
              rightComponent={
                <Switch
                  value={darkMode}
                  onValueChange={handleDarkModeToggle}
                  trackColor={{ false: '#E5E7EB', true: '#2563EB' }}
                  thumbColor={darkMode ? 'white' : '#9CA3AF'}
                />
              }
            />
            <SettingItem
              icon="💾"
              title="Auto Save"
              subtitle="Automatically save assessment data"
              rightComponent={
                <Switch
                  value={autoSave}
                  onValueChange={handleAutoSaveToggle}
                  trackColor={{ false: '#E5E7EB', true: '#2563EB' }}
                  thumbColor={autoSave ? 'white' : '#9CA3AF'}
                />
              }
            />
            <SettingItem
              icon="☁️"
              title="Data Sync"
              subtitle="Sync data across devices"
              rightComponent={
                <Switch
                  value={dataSync}
                  onValueChange={handleDataSyncToggle}
                  trackColor={{ false: '#E5E7EB', true: '#2563EB' }}
                  thumbColor={dataSync ? 'white' : '#9CA3AF'}
                />
              }
            />
          </View>
        </View>

        {/* Data Management Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Management</Text>
          <View style={styles.settingsGroup}>
            <SettingItem
              icon="📤"
              title="Export Data"
              subtitle="Export your assessment data"
              onPress={handleExportData}
            />
            <SettingItem
              icon="🗑️"
              title="Clear Cache"
              subtitle="Free up storage space"
              onPress={handleClearCache}
            />
            <SettingItem
              icon="🔄"
              title="Reset App"
              subtitle="Reset to default settings"
              onPress={handleResetApp}
            />
          </View>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.settingsGroup}>
            <SettingItem
              icon="📖"
              title="User Guide"
              subtitle="Learn how to use the app"
              onPress={() => {
                Alert.alert(
                  'User Guide',
                  '1. Enter patient information\n2. Select all PEDSS parameters\n3. Calculate score\n4. Review results and save\n5. View case history',
                  [{ text: 'OK' }]
                );
              }}
            />
            <SettingItem
              icon="❓"
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
              icon="📧"
              title="Contact Support"
              subtitle="Get in touch with our team"
              onPress={() => {
                Alert.alert(
                  'Contact Support',
                  'Email: support@pedss.aiims.edu\n\nDeveloped by:\nAIIMS, New Delhi\nIIIT Delhi',
                  [{ text: 'OK' }]
                );
              }}
            />
            <SettingItem
              icon="⭐"
              title="Rate App"
              subtitle="Rate us on the app store"
              onPress={() => {
                const appStoreUrl = Platform.OS === 'ios'
                  ? 'https://apps.apple.com/app/id123456789'
                  : 'https://play.google.com/store/apps/details?id=com.pedss.app';
                
                Alert.alert(
                  'Rate App',
                  'Thank you for using PEDSS! Your feedback helps us improve.',
                  [
                    { text: 'Cancel', style: 'cancel' },
                    {
                      text: 'Rate Now',
                      onPress: () => {
                        Linking.openURL(appStoreUrl).catch(() => {
                          Alert.alert('Error', 'Could not open app store');
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
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.settingsGroup}>
            <SettingItem
              icon="ℹ️"
              title="About PEDSS"
              subtitle="About the app"
              onPress={handleAbout}
            />
            <TouchableOpacity 
              style={styles.termsCard}
              onPress={() => {
                Alert.alert(
                  'Terms of Service',
                  'This app is a clinical decision support tool. It should not replace professional medical judgment. Always consult qualified medical professionals. The developers are not liable for clinical decisions made using this app.',
                  [{ text: 'OK' }]
                );
              }}
            >
              <View style={styles.termsCardContent}>
                <Text style={styles.termsCardIcon}>📋</Text>
                <View style={styles.termsCardText}>
                  <Text style={styles.termsCardTitle}>Terms of Service</Text>
                  <Text style={styles.termsCardSubtitle}>Read our terms and conditions</Text>
                </View>
                <Text style={styles.termsCardArrow}>→</Text>
              </View>
            </TouchableOpacity>
            <SettingItem
              icon="🔒"
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
          <Text style={styles.appInfoText}>PEDSS Outcome Prediction Tool</Text>
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
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
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
  profileCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileAvatarText: {
    fontSize: 24,
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 14,
    color: '#6B7280',
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2563EB',
  },
  editButtonText: {
    color: '#2563EB',
    fontSize: 14,
    fontWeight: '600',
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
  settingIcon: {
    fontSize: 20,
    marginRight: 16,
    width: 24,
    textAlign: 'center',
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
  termsCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  termsCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  termsCardIcon: {
    fontSize: 28,
    marginRight: 16,
  },
  termsCardText: {
    flex: 1,
  },
  termsCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  termsCardSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  termsCardArrow: {
    fontSize: 20,
    color: '#2563EB',
    fontWeight: 'bold',
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

