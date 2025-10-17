import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

// Import screens
import SplashScreen from './screens/SplashScreen';
import PatientInfoScreen from './screens/PatientInfoScreen';
import AssessmentScreen from './screens/AssessmentScreen';
import ResultsScreen from './screens/ResultsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#2563EB" />
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#F8FAFC' },
          animationEnabled: true,
          gestureEnabled: true,
        }}
      >
        <Stack.Screen 
          name="Splash" 
          component={SplashScreen}
          options={{
            animationTypeForReplace: 'push',
          }}
        />
        <Stack.Screen 
          name="PatientInfo" 
          component={PatientInfoScreen}
          options={{
            gestureDirection: 'horizontal',
          }}
        />
        <Stack.Screen 
          name="Assessment" 
          component={AssessmentScreen}
          options={{
            gestureDirection: 'horizontal',
          }}
        />
        <Stack.Screen 
          name="Results" 
          component={ResultsScreen}
          options={{
            gestureDirection: 'horizontal',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}