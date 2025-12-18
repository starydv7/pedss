# 🏥 PEDSS - Pediatric Emergency Department Seizure Score

**A clinical decision support tool for healthcare professionals to predict outcomes in pediatric patients presenting with convulsive status epilepticus.**

[![React Native](https://img.shields.io/badge/React%20Native-0.73.6-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-50.0.0-black.svg)](https://expo.dev/)
[![License](https://img.shields.io/badge/License-Proprietary-red.svg)](LICENSE)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Usage](#usage)
- [Technical Stack](#technical-stack)
- [Project Structure](#project-structure)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Privacy & Security](#privacy--security)
- [Contributing](#contributing)
- [Credits](#credits)
- [License](#license)

---

## 🎯 Overview

PEDSS (Pediatric Emergency Department Seizure Score) is a mobile application developed through collaboration between **AIIMS, New Delhi** and **IIIT Delhi**. This app provides evidence-based risk assessment to aid clinical decision-making in emergency and critical care settings.

### Key Highlights

- ✅ **100% Offline** - Works without internet connection
- ✅ **Local Data Storage** - All data stored securely on device
- ✅ **No Backend Required** - Complete privacy and security
- ✅ **Production Ready** - Built for Play Store deployment
- ✅ **Medical Grade** - Designed for healthcare professionals

---

## ✨ Features

### 🎯 Core Functionality

- **PEDSS Score Calculation**
  - Real-time score calculation (0-6 range)
  - All 5 parameters: P (PCPCS), E (EEG), D (Drug), S1 (Semiology), S2 (Sickness)
  - Visual progress indicators
  - Risk level stratification (Low, Medium, High)

- **Patient Management**
  - Patient information entry
  - Assessment workflow
  - Case history tracking
  - Search and filter capabilities

- **Data Management**
  - Local data persistence (AsyncStorage)
  - Save/load assessments
  - Export to CSV/PDF
  - Statistics dashboard

- **Profile Management**
  - Doctor profile creation
  - Local profile storage
  - Statistics tracking
  - Professional information

### 📊 Clinical Features

- **Risk Assessment**
  - Score 0-2: Low Risk
  - Score 3: Medium Risk
  - Score 4-6: High Risk (Mortality Risk)

- **Clinical Interpretation**
  - Evidence-based recommendations
  - Parameter breakdown visualization
  - Risk level descriptions

- **Case History**
  - Complete assessment records
  - Search functionality
  - Statistics and analytics
  - Export capabilities

---

## 📱 Screenshots

*Screenshots will be added after deployment*

---

## 🚀 Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- EAS CLI (for building)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pedss
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   npx expo start
   ```

4. **Run on device**
   - Install Expo Go app on your Android device
   - Scan QR code from terminal
   - Or press `a` for Android emulator

---

## 💻 Usage

### For Healthcare Professionals

1. **Create Assessment**
   - Navigate to "New Assessment"
   - Enter patient information
   - Select all PEDSS parameters
   - Calculate score

2. **View Results**
   - Review calculated score
   - Check risk level
   - Read clinical interpretation
   - Save assessment

3. **Manage Cases**
   - View case history
   - Search previous assessments
   - Export data for documentation
   - Track statistics

4. **Profile Setup**
   - Enter your professional details
   - Save profile locally
   - View your statistics

### Assessment Workflow

```
Patient Info → Clinical Assessment → Results → Save/Export
```

---

## 🛠 Technical Stack

### Core Technologies

- **React Native** (0.73.6) - Mobile framework
- **Expo** (50.0.0) - Development platform
- **React Navigation** (6.x) - Navigation library
- **AsyncStorage** - Local data persistence

### Key Dependencies

```json
{
  "@react-native-async-storage/async-storage": "1.21.0",
  "@react-navigation/native": "^6.1.9",
  "@react-navigation/stack": "^6.3.20",
  "expo-file-system": "~16.0.9",
  "expo-sharing": "~11.10.0",
  "react-native-gesture-handler": "~2.14.0"
}
```

### Architecture

- **Component-based** - Modular React components
- **Service Layer** - StorageService, ExportService
- **Navigation** - Stack-based navigation
- **State Management** - React Hooks (useState, useEffect)

---

## 📁 Project Structure

```
pedss/
├── assets/                 # Images, icons, fonts
│   ├── icon.png           # App icon (512x512)
│   ├── adaptive-icon.png  # Android adaptive icon
│   └── splash.png         # Splash screen
├── components/            # Reusable components
│   └── ErrorBoundary.js   # Error handling
├── navigation/            # Navigation configuration
│   └── AppNavigator.js    # Main navigation stack
├── screens/               # Screen components
│   ├── SplashScreen.js
│   ├── LandingScreen.js
│   ├── HomeScreen.js
│   ├── PatientInfoScreen.js
│   ├── AssessmentScreen.js
│   ├── ResultsScreen.js
│   ├── CaseHistoryScreen.js
│   ├── ProfileScreen.js
│   └── SettingsScreen.js
├── services/              # Business logic
│   ├── StorageService.js  # Data persistence
│   └── ExportService.js   # Export functionality
├── App.js                 # Root component
├── app.json               # Expo configuration
├── package.json           # Dependencies
├── eas.json               # EAS build configuration
└── README.md              # This file
```

---

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm start

# Run on Android
npm run android

# Run on iOS (macOS only)
npm run ios

# Run on web
npm run web

# Clear cache
npx expo start --clear
```

### Development Guidelines

1. **Code Style**
   - Use functional components
   - Follow React best practices
   - Maintain consistent naming

2. **State Management**
   - Use React Hooks for local state
   - AsyncStorage for persistence
   - No external state management library

3. **Navigation**
   - Use React Navigation
   - Consistent route names
   - Proper back button handling

---

## 📦 Building for Production

### Prerequisites

- EAS account (free tier available)
- EAS CLI installed globally
- Google Play Developer account ($25 one-time)

### Build Steps

1. **Install EAS CLI**
   ```bash
   npm install -g eas-cli
   ```

2. **Login to EAS**
   ```bash
   eas login
   ```

3. **Build for Android**
   ```bash
   # Preview build (APK)
   eas build --platform android --profile preview
   
   # Production build (AAB)
   eas build --platform android --profile production
   ```

4. **Download and Test**
   - Download from EAS dashboard
   - Install on device
   - Test thoroughly

5. **Submit to Play Store**
   - Upload AAB file
   - Complete store listing
   - Submit for review

### Build Configuration

- **Package Name**: `com.pedss.app`
- **Version**: `1.0.0`
- **Version Code**: Auto-incremented
- **Min SDK**: Android 6.0+
- **Target SDK**: Latest

---

## 🔒 Privacy & Security

### Data Storage

- **100% Local** - All data stored on device
- **No Cloud Sync** - No data transmission
- **No Backend** - Complete offline functionality
- **Encrypted Storage** - Device-level encryption

### Privacy Policy

Full privacy policy available at:
**https://vermillion-madeleine-3dd58d.netlify.app/**

### Data Handling

- Patient data stored locally only
- Export functionality for documentation
- No analytics or tracking
- No third-party data sharing

---

## ⚠️ Medical Disclaimer

**IMPORTANT:** This app is a clinical decision support tool and should **NOT** replace professional medical judgment.

- PEDSS scores are predictive indicators, not definitive diagnoses
- Always consult with qualified medical professionals
- Use this tool as an aid, not a replacement for clinical expertise
- The developers are not liable for clinical decisions made using this app

---

## 🤝 Contributing

This is a research project developed by AIIMS, New Delhi and IIIT Delhi. For contributions or inquiries, please contact the development team.

### Development Team

- **Developer**: Pawan Yadav
- **LinkedIn**: [pawanstarydv7](https://www.linkedin.com/in/pawanstarydv7/)
- **Institutions**: AIIMS, New Delhi × IIIT Delhi

---

## 📄 Credits

### Developed By

- **AIIMS, New Delhi** - Medical expertise and validation
- **IIIT Delhi** - Technical development

### Developer

- **Pawan Yadav** - Full-stack development

### Version

- **Current Version**: 1.0.0
- **Release Date**: 2025

---

## 📝 License

© 2025 PEDSS APP. All rights reserved.

This application is proprietary software developed for medical use. All rights reserved by AIIMS, New Delhi and IIIT Delhi.

---

## 📞 Support

For support, feedback, or inquiries:

- **Email**: support@pedss.aiims.edu (if applicable)
- **Institution**: AIIMS, New Delhi
- **Developer**: Pawan Yadav

---

## 🎯 Roadmap

### Future Enhancements

- [ ] Dark mode support
- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] Cloud backup (optional)
- [ ] Research data collection
- [ ] Integration with hospital systems

---

## 📊 Statistics

### Current Features

- ✅ 9 Screens
- ✅ 2 Services (Storage, Export)
- ✅ 1 Error Boundary
- ✅ Complete navigation stack
- ✅ Local data persistence
- ✅ Export functionality
- ✅ Production-ready build

---

## 🚀 Quick Start

```bash
# Clone and setup
git clone <repo>
cd pedss
npm install

# Start development
npm start

# Build for production
eas build --platform android --profile production
```

---

## 📚 Documentation

- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [React Native](https://reactnative.dev/)
- [EAS Build](https://docs.expo.dev/build/introduction/)

---

**Made with ❤️ for healthcare professionals**

*Improving pediatric emergency care outcomes through technology*
