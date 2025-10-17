# PedssApp - React Native with JavaScript

A React Native application built with Expo and JavaScript for Android development.

## Features

- ✅ React Native with JavaScript
- ✅ Expo development environment
- ✅ Android support
- ✅ Hot reloading
- ✅ Navigation ready
- ✅ Modern UI components

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- Android device or emulator
- Expo Go app (download from Google Play Store)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npx expo start
```

3. Install Expo Go on your Android device from Google Play Store

4. Scan the QR code with Expo Go app to run the app on your device

### Development Commands

```bash
# Start development server
npm start

# Start with Android
npm run android

# Start with iOS (if on macOS)
npm run ios

# Start web version
npm run web
```

### Project Structure

```
PedssApp/
├── App.js                 # Main application component
├── app.json              # Expo configuration
├── package.json          # Dependencies and scripts
├── babel.config.js       # Babel configuration
├── assets/               # Images, icons, fonts
└── README.md            # This file
```

### Key Dependencies

- **expo**: Expo SDK for React Native development
- **react**: React library
- **react-native**: React Native framework
- **@react-navigation/native**: Navigation library
- **expo-status-bar**: Status bar component

### Configuration

The app is configured in `app.json` with:
- App name: PedssApp
- Package name: com.pedss.app
- Android adaptive icon support
- Portrait orientation

### Development Tips

- Use Expo Go for quick testing and development
- Hot reloading is enabled by default
- Check Expo documentation for component APIs
- Use React Native Debugger for debugging

### Building for Production

```bash
# Build Android APK
npx expo build:android
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is open source and available under the MIT License.

