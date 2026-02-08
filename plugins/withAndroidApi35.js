/**
 * Forces the root android/build.gradle to use compileSdkVersion and targetSdkVersion
 * from gradle.properties (set by expo-build-properties) so the app actually targets API 35.
 * The React Native template hardcodes 34; this plugin patches it after prebuild.
 */
const { withDangerousMod } = require('expo/config-plugins');
const path = require('path');
const fs = require('fs');

function withAndroidApi35(config) {
  return withDangerousMod(config, [
    'android',
    async (config) => {
      const buildGradlePath = path.join(config.modRequest.platformProjectRoot, 'build.gradle');
      let content = fs.readFileSync(buildGradlePath, 'utf8');

      // Replace hardcoded 34 with values from gradle.properties (expo-build-properties writes these)
      content = content.replace(
        /compileSdkVersion\s*=\s*34/,
        "compileSdkVersion = Integer.parseInt(findProperty('android.compileSdkVersion') ?: '35')"
      );
      content = content.replace(
        /targetSdkVersion\s*=\s*34/,
        "targetSdkVersion = Integer.parseInt(findProperty('android.targetSdkVersion') ?: '35')"
      );

      fs.writeFileSync(buildGradlePath, content);
      return config;
    },
  ]);
}

module.exports = withAndroidApi35;
