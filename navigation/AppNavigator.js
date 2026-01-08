import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import SplashScreen from '../screens/SplashScreen';
import LandingScreen from '../screens/LandingScreen';
import HomeScreen from '../screens/HomeScreen';
import CaseHistoryScreen from '../screens/CaseHistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ContributorsScreen from '../screens/ContributorsScreen';

// Import bottom tab navigator
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createStackNavigator();

// Route names constants for consistency
export const ROUTES = {
  SPLASH: 'Splash',
  LANDING: 'Landing',
  HOME: 'Home',
  PATIENT_INFO: 'PatientInfo',
  ASSESSMENT: 'Assessment',
  RESULTS: 'Results',
  CASE_HISTORY: 'CaseHistory',
  CASE_DETAIL: 'CaseDetail',
  SETTINGS: 'Settings',
  PROFILE: 'Profile',
  CONTRIBUTORS: 'Contributors',
};

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={ROUTES.SPLASH}
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: ({ current, next, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
          transitionSpec: {
            open: {
              animation: 'timing',
              config: {
                duration: 300,
              },
            },
            close: {
              animation: 'timing',
              config: {
                duration: 300,
              },
            },
          },
        }}
      >
        <Stack.Screen 
          name={ROUTES.SPLASH} 
          component={SplashScreen}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen 
          name={ROUTES.LANDING} 
          component={LandingScreen}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen 
          name={ROUTES.HOME} 
          component={HomeScreen}
        />
        <Stack.Screen 
          name="MainTabs" 
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name={ROUTES.CASE_HISTORY} 
          component={CaseHistoryScreen}
        />
        <Stack.Screen 
          name={ROUTES.SETTINGS} 
          component={SettingsScreen}
        />
        <Stack.Screen 
          name={ROUTES.CONTRIBUTORS} 
          component={ContributorsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

