import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import StorageService from '../services/StorageService';
import { responsive } from '../utils/responsive';

const ProfileScreen = ({ navigation }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    name: '',
    title: '',
    hospital: '',
    email: '',
    phone: '',
  });

  const [tempData, setTempData] = useState(profileData);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const savedProfile = await StorageService.getProfile();
      if (savedProfile) {
        setProfileData(savedProfile);
        setTempData(savedProfile);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await StorageService.saveProfile(tempData);
      setProfileData(tempData);
      setIsEditing(false);
      Alert.alert('Success', 'Profile saved successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save profile. Please try again.');
    }
  };

  const handleCancel = () => {
    setTempData(profileData);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChangeText = (field, value) => {
    setTempData({ ...tempData, [field]: value });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2563EB" />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

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
          Profile
        </Text>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => {
            const parent = navigation.getParent();
            if (parent) {
              parent.navigate('Settings');
            }
          }}
        >
          <Text 
            style={styles.settingsButtonText}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            minimumFontScale={0.8}
          >
            Settings
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {isEditing && tempData.name 
                  ? tempData.name.charAt(0).toUpperCase() 
                  : profileData.name 
                    ? profileData.name.charAt(0).toUpperCase() 
                    : '👨‍⚕️'}
              </Text>
            </View>
          </View>
          <Text 
            style={styles.profileName}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            minimumFontScale={0.8}
          >
            {isEditing ? tempData.name || 'Name' : profileData.name || 'Name'}
          </Text>
          {profileData.title ? (
            <Text 
              style={styles.profileTitle}
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              minimumFontScale={0.8}
            >
              {isEditing ? tempData.title : profileData.title}
            </Text>
          ) : null}
          {profileData.hospital ? (
            <Text 
              style={styles.profileHospital}
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              minimumFontScale={0.8}
            >
              {isEditing ? tempData.hospital : profileData.hospital}
            </Text>
          ) : null}
        </View>

        {/* Profile Information */}
        <View style={styles.infoSection}>
          <View style={styles.sectionHeader}>
            <Text 
              style={styles.sectionTitle}
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              minimumFontScale={0.8}
            >
              Profile Information
            </Text>
            {!isEditing ? (
              <TouchableOpacity onPress={handleEdit}>
                <Text 
                  style={styles.editButton}
                  numberOfLines={1}
                  adjustsFontSizeToFit={true}
                  minimumFontScale={0.8}
                >
                  Edit
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.editActions}>
                <TouchableOpacity onPress={handleCancel}>
                  <Text 
                    style={styles.cancelButton}
                    numberOfLines={1}
                    adjustsFontSizeToFit={true}
                    minimumFontScale={0.8}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSave}>
                  <Text 
                    style={styles.saveButton}
                    numberOfLines={1}
                    adjustsFontSizeToFit={true}
                    minimumFontScale={0.8}
                  >
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Full Name *</Text>
              {isEditing ? (
                <TextInput
                  style={styles.infoInput}
                  value={tempData.name}
                  onChangeText={(text) => handleChangeText('name', text)}
                  placeholder="Enter your name"
                  placeholderTextColor="#9CA3AF"
                />
              ) : (
                <Text style={styles.infoValue}>{profileData.name || '—'}</Text>
              )}
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Professional Title</Text>
              {isEditing ? (
                <TextInput
                  style={styles.infoInput}
                  value={tempData.title}
                  onChangeText={(text) => handleChangeText('title', text)}
                  placeholder="e.g., Pediatric Neurologist"
                  placeholderTextColor="#9CA3AF"
                />
              ) : (
                <Text style={styles.infoValue}>{profileData.title || '—'}</Text>
              )}
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Hospital/Institution</Text>
              {isEditing ? (
                <TextInput
                  style={styles.infoInput}
                  value={tempData.hospital}
                  onChangeText={(text) => handleChangeText('hospital', text)}
                  placeholder="e.g., AIIMS, New Delhi"
                  placeholderTextColor="#9CA3AF"
                />
              ) : (
                <Text style={styles.infoValue}>{profileData.hospital || '—'}</Text>
              )}
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Email</Text>
              {isEditing ? (
                <TextInput
                  style={styles.infoInput}
                  value={tempData.email}
                  onChangeText={(text) => handleChangeText('email', text)}
                  keyboardType="email-address"
                  placeholder="Enter email address"
                  placeholderTextColor="#9CA3AF"
                />
              ) : (
                <Text style={styles.infoValue}>{profileData.email || '—'}</Text>
              )}
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Phone</Text>
              {isEditing ? (
                <TextInput
                  style={styles.infoInput}
                  value={tempData.phone}
                  onChangeText={(text) => handleChangeText('phone', text)}
                  keyboardType="phone-pad"
                  placeholder="Enter phone number"
                  placeholderTextColor="#9CA3AF"
                />
              ) : (
                <Text style={styles.infoValue}>{profileData.phone || '—'}</Text>
              )}
            </View>
          </View>
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
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    zIndex: 1000,
  },
  backButton: {
    paddingVertical: responsive.scalePadding(8),
    paddingHorizontal: responsive.scalePadding(12),
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
  settingsButton: {
    paddingVertical: responsive.scalePadding(8),
    paddingHorizontal: responsive.scalePadding(12),
  },
  settingsButtonText: {
    fontSize: responsive.scaleFont(20),
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: responsive.scalePadding(30),
    backgroundColor: 'white',
    marginBottom: responsive.scalePadding(20),
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: responsive.scalePadding(16),
    alignItems: 'center',
  },
  avatar: {
    width: responsive.scaleSize(100),
    height: responsive.scaleSize(100),
    borderRadius: responsive.scaleSize(50),
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#2563EB',
  },
  avatarText: {
    fontSize: responsive.scaleFont(48),
    fontWeight: 'bold',
    color: '#2563EB',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: responsive.scalePadding(16),
    fontSize: responsive.scaleFont(16),
    color: '#6B7280',
  },
  profileName: {
    fontSize: responsive.scaleFont(24),
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  profileTitle: {
    fontSize: responsive.scaleFont(16),
    color: '#2563EB',
    fontWeight: '600',
    marginBottom: 4,
  },
  profileHospital: {
    fontSize: responsive.scaleFont(14),
    color: '#6B7280',
  },
  sectionTitle: {
    fontSize: responsive.scaleFont(18),
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: responsive.scalePadding(16),
  },
  infoSection: {
    paddingHorizontal: responsive.scalePadding(20),
    marginBottom: responsive.scalePadding(20),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsive.scalePadding(16),
  },
  editButton: {
    color: '#2563EB',
    fontSize: responsive.scaleFont(16),
    fontWeight: '600',
  },
  editActions: {
    flexDirection: 'row',
    gap: responsive.scalePadding(16),
  },
  cancelButton: {
    color: '#DC2626',
    fontSize: responsive.scaleFont(16),
    fontWeight: '600',
  },
  saveButton: {
    color: '#16A34A',
    fontSize: responsive.scaleFont(16),
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: responsive.scalePadding(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  infoItem: {
    marginBottom: responsive.scalePadding(20),
  },
  infoLabel: {
    fontSize: responsive.scaleFont(14),
    color: '#6B7280',
    marginBottom: responsive.scalePadding(8),
    fontWeight: '500',
  },
  infoValue: {
    fontSize: responsive.scaleFont(16),
    color: '#1E293B',
    fontWeight: '600',
  },
  infoInput: {
    fontSize: responsive.scaleFont(16),
    color: '#1E293B',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: responsive.scalePadding(8),
  },
  specializationsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  specializationsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  specializationTag: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2563EB',
  },
  specializationText: {
    color: '#2563EB',
    fontSize: 14,
    fontWeight: '600',
  },
  achievementsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  achievementsList: {
    gap: 12,
  },
  achievementCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  achievementIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
});

export default ProfileScreen;

