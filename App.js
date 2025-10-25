import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Animated } from 'react-native';

// Import screens
import LandingScreen from './screens/LandingScreen';
import HomeScreen from './screens/HomeScreen';
import PatientInfoScreen from './screens/PatientInfoScreen';
import AssessmentScreen from './screens/AssessmentScreen';
import ResultsScreen from './screens/ResultsScreen';
import CaseHistoryScreen from './screens/CaseHistoryScreen';
import SettingsScreen from './screens/SettingsScreen';
import ProfileScreen from './screens/ProfileScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarAnimation] = useState(new Animated.Value(-250));

  const screens = [
    { id: 'landing', name: '🏠 Landing', component: LandingScreen },
    { id: 'home', name: '🏠 Home', component: HomeScreen },
    { id: 'patient', name: '📝 Patient Info', component: PatientInfoScreen },
    { id: 'assessment', name: '⚙️ Assessment', component: AssessmentScreen },
    { id: 'results', name: '📊 Results', component: ResultsScreen },
    { id: 'history', name: '📚 Case History', component: CaseHistoryScreen },
    { id: 'settings', name: '⚙️ Settings', component: SettingsScreen },
    { id: 'profile', name: '👤 Profile', component: ProfileScreen },
  ];

  const toggleSidebar = () => {
    if (sidebarOpen) {
      Animated.timing(sidebarAnimation, {
        toValue: -250,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(sidebarAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
    setSidebarOpen(!sidebarOpen);
  };

  const navigateToScreen = (screenId) => {
    setCurrentScreen(screenId);
    toggleSidebar(); // Close sidebar after navigation
  };

  const goBack = () => {
    if (currentScreen === 'landing') {
      return; // Can't go back from landing
    }
    if (currentScreen === 'home') {
      setCurrentScreen('landing');
    } else {
      setCurrentScreen('home');
    }
  };

  const renderScreen = () => {
    const screen = screens.find(s => s.id === currentScreen);
    if (!screen) return null;

    const ScreenComponent = screen.component;
    return (
      <ScreenComponent 
        navigation={{ 
          navigate: navigateToScreen,
          goBack,
          currentScreen
        }} 
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <TouchableOpacity 
          style={styles.overlay}
          onPress={toggleSidebar}
          activeOpacity={1}
        />
      )}

      {/* Sidebar */}
      <Animated.View style={[styles.sidebar, { left: sidebarAnimation }]}>
        <View style={styles.sidebarHeader}>
          <Text style={styles.sidebarTitle}>🏥 PEDSS</Text>
          <TouchableOpacity onPress={toggleSidebar} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.sidebarContent}>
          {screens.map((screen) => (
            <TouchableOpacity
              key={screen.id}
              style={[
                styles.sidebarItem,
                currentScreen === screen.id && styles.sidebarItemActive
              ]}
              onPress={() => navigateToScreen(screen.id)}
            >
              <Text style={[
                styles.sidebarItemText,
                currentScreen === screen.id && styles.sidebarItemTextActive
              ]}>
                {screen.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Navigation Bar */}
        {currentScreen !== 'landing' && (
          <View style={styles.navBar}>
            <TouchableOpacity onPress={toggleSidebar} style={styles.menuButton}>
              <Text style={styles.menuButtonText}>☰</Text>
            </TouchableOpacity>
            <Text style={styles.navTitle}>
              {screens.find(s => s.id === currentScreen)?.name || 'PEDSS'}
            </Text>
            {currentScreen !== 'landing' && currentScreen !== 'home' && (
              <TouchableOpacity onPress={goBack} style={styles.backButton}>
                <Text style={styles.backButtonText}>←</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Screen Content */}
        <View style={styles.screenContent}>
          {renderScreen()}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 250,
    backgroundColor: '#1E293B',
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  sidebarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  sidebarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sidebarContent: {
    flex: 1,
    paddingTop: 20,
  },
  sidebarItem: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  sidebarItemActive: {
    backgroundColor: '#2563EB',
  },
  sidebarItemText: {
    fontSize: 16,
    color: '#E5E7EB',
    fontWeight: '500',
  },
  sidebarItemTextActive: {
    color: 'white',
    fontWeight: 'bold',
  },
  mainContent: {
    flex: 1,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#2563EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  navTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  screenContent: {
    flex: 1,
  },
});