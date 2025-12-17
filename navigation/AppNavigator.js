import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import SplashScreen from '../screens/SplashScreen';
import LandingScreen from '../screens/LandingScreen';
import HomeScreen from '../screens/HomeScreen';
import PatientInfoScreen from '../screens/PatientInfoScreen';
import AssessmentScreen from '../screens/AssessmentScreen';
import ResultsScreen from '../screens/ResultsScreen';
import CaseHistoryScreen from '../screens/CaseHistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';

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
          name={ROUTES.PATIENT_INFO} 
          component={PatientInfoScreen}
        />
        <Stack.Screen 
          name={ROUTES.ASSESSMENT} 
          component={AssessmentScreen}
        />
        <Stack.Screen 
          name={ROUTES.RESULTS} 
          component={ResultsScreen}
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
          name={ROUTES.PROFILE} 
          component={ProfileScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

