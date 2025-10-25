import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';

const SettingsScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [dataSync, setDataSync] = useState(false);

  const handleExportData = () => {
    Alert.alert(
      'Export Data',
      'Choose export format:',
      [
        { text: 'Cancel' },
        { text: 'CSV', onPress: () => Alert.alert('Export', 'Data exported as CSV') },
        { text: 'PDF', onPress: () => Alert.alert('Export', 'Data exported as PDF') }
      ]
    );
  };

  const handleClearCache = () => {
    Alert.alert(
      'Clear Cache',
      'This will clear all cached data. Are you sure?',
      [
        { text: 'Cancel' },
        { text: 'Clear', style: 'destructive', onPress: () => Alert.alert('Success', 'Cache cleared successfully') }
      ]
    );
  };

  const handleResetApp = () => {
    Alert.alert(
      'Reset App',
      'This will reset all app data to default settings. This action cannot be undone.',
      [
        { text: 'Cancel' },
        { text: 'Reset', style: 'destructive', onPress: () => Alert.alert('Reset', 'App reset successfully') }
      ]
    );
  };

  const handleAbout = () => {
    Alert.alert(
      'About PEDSS App',
      'Version: 1.0.0\n\nDeveloped by:\nAIIMS × IIITD Collaboration\n\n© 2024 All rights reserved',
      [{ text: 'OK' }]
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
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
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
                  onValueChange={setNotifications}
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
                  onValueChange={setDarkMode}
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
                  onValueChange={setAutoSave}
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
                  onValueChange={setDataSync}
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
              onPress={() => Alert.alert('User Guide', 'User guide coming soon!')}
            />
            <SettingItem
              icon="❓"
              title="Help & FAQ"
              subtitle="Get answers to common questions"
              onPress={() => Alert.alert('Help', 'Help section coming soon!')}
            />
            <SettingItem
              icon="📧"
              title="Contact Support"
              subtitle="Get in touch with our team"
              onPress={() => Alert.alert('Contact', 'support@pedss.aiims.edu')}
            />
            <SettingItem
              icon="⭐"
              title="Rate App"
              subtitle="Rate us on the app store"
              onPress={() => Alert.alert('Rate App', 'Thank you for your feedback!')}
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
              subtitle="Version 1.0.0"
              onPress={handleAbout}
            />
            <SettingItem
              icon="📋"
              title="Terms of Service"
              subtitle="Read our terms and conditions"
              onPress={() => Alert.alert('Terms', 'Terms of service coming soon!')}
            />
            <SettingItem
              icon="🔒"
              title="Privacy Policy"
              subtitle="How we protect your data"
              onPress={() => Alert.alert('Privacy', 'Privacy policy coming soon!')}
            />
          </View>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>PEDSS Outcome Prediction Tool</Text>
          <Text style={styles.appInfoSubtext}>AIIMS × IIITD Collaboration</Text>
          <Text style={styles.appInfoVersion}>Version 1.0.0</Text>
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
  appInfo: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  appInfoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 4,
  },
  appInfoSubtext: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  appInfoVersion: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});

export default SettingsScreen;

