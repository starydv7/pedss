import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { responsive } from '../utils/responsive';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import PatientInfoScreen from '../screens/PatientInfoScreen';
import AssessmentScreen from '../screens/AssessmentScreen';
import ResultsScreen from '../screens/ResultsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

// Custom tab bar icon component
const TabIcon = ({ icon, label, focused }) => {
  // Use shorter labels only on very small screens (< 360px width)
  const getShortLabel = (fullLabel) => {
    if (!responsive.isSmallPhone) return fullLabel;
    const shortLabels = {
      'Home': 'Home',
      'Patient': 'Patient',
      'Assessment': 'Assess',
      'Results': 'Results',
      'Profile': 'Profile',
    };
    return shortLabels[fullLabel] || fullLabel;
  };

  const displayLabel = getShortLabel(label);
  // On tablets, use larger font size; on small phones, use smaller
  const fontSize = responsive.isLargeTablet 
    ? responsive.scaleFont(14) 
    : responsive.isTablet 
    ? responsive.scaleFont(13)
    : responsive.isSmallPhone 
    ? responsive.scaleFont(9) 
    : responsive.scaleFont(11);

  // On phones (not tablets), allow font adjustment to fit text
  const shouldAdjustFont = !responsive.isTablet;
  // Allow 2 lines on tablets, 1 line on phones (but phones can adjust font size)
  const numberOfLines = responsive.isTablet ? 2 : 1;

  return (
    <View style={styles.tabIconContainer}>
      <Text style={[styles.tabIcon, focused && styles.tabIconActive]}>
        {icon}
      </Text>
      <Text 
        style={[
          styles.tabLabel, 
          focused && styles.tabLabelActive,
          { fontSize }
        ]}
        numberOfLines={numberOfLines}
        adjustsFontSizeToFit={shouldAdjustFont}
        minimumFontScale={shouldAdjustFont ? 0.75 : 1}
        allowFontScaling={false}
        ellipsizeMode="none"
      >
        {displayLabel}
      </Text>
      {focused && <View style={styles.activeIndicator} />}
    </View>
  );
};

// Custom tab bar button to remove width constraints
const CustomTabBarButton = ({ children, onPress, accessibilityState }) => {
  const focused = accessibilityState?.selected;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.customTabButton,
        {
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      {children}
    </Pressable>
  );
};

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#64748B',
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarButton: (props) => <CustomTabBarButton {...props} />,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="🏠" label="Home" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="PatientInfo"
        component={PatientInfoScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="📝" label="Patient" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Assessment"
        component={AssessmentScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="⚙️" label="Assessment" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Results"
        component={ResultsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="📊" label="Results" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="👤" label="Profile" focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: responsive.scaleSize(70),
    paddingBottom: responsive.scalePadding(10),
    paddingTop: responsive.scalePadding(10),
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    paddingHorizontal: 0, // Remove horizontal padding to maximize space
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'relative',
    paddingHorizontal: responsive.isTablet ? responsive.scalePadding(2) : 0,
  },
  tabIcon: {
    fontSize: responsive.scaleFont(24),
    marginBottom: 4,
    opacity: 0.7,
  },
  tabIconActive: {
    opacity: 1,
    transform: [{ scale: 1.1 }],
  },
  tabLabel: {
    fontSize: responsive.scaleFont(11),
    color: '#64748B',
    fontWeight: '500',
    textAlign: 'center',
    width: '100%',
    paddingHorizontal: responsive.isTablet ? responsive.scalePadding(1) : 0,
  },
  tabLabelActive: {
    color: '#2563EB',
    fontWeight: '700',
  },
  activeIndicator: {
    position: 'absolute',
    top: -2,
    width: responsive.scaleSize(40),
    height: responsive.scaleSize(3),
    backgroundColor: '#2563EB',
    borderRadius: 2,
  },
  customTabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 0,
    maxWidth: 'none',
  },
});

