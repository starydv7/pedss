# Privacy Policy Setup Guide

## 📄 Files Created

1. **`PRIVACY_POLICY.md`** - Markdown version (for documentation)
2. **`privacy-policy.html`** - Web version (for hosting)

## 🌐 How to Use

### Option 1: Host on Website (Recommended)

1. **Upload HTML file to your website:**
   - Upload `privacy-policy.html` to your web server
   - Get the URL (e.g., `https://yourwebsite.com/privacy-policy.html`)

2. **Add URL to Play Store:**
   - In Play Store Console → App Content → Privacy Policy
   - Paste the URL

### Option 2: Use GitHub Pages (Free)

1. **Create GitHub repository:**
   ```bash
   git init
   git add privacy-policy.html
   git commit -m "Add privacy policy"
   git remote add origin https://github.com/yourusername/pedss-privacy
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Select main branch
   - Get URL: `https://yourusername.github.io/pedss-privacy/privacy-policy.html`

3. **Use this URL in Play Store**

### Option 3: Use Google Sites (Free)

1. Go to [Google Sites](https://sites.google.com)
2. Create new site
3. Copy content from `PRIVACY_POLICY.md`
4. Publish site
5. Get URL and use in Play Store

### Option 4: Use Simple Web Hosting

- **Netlify** (free): Drag and drop HTML file
- **Vercel** (free): Upload HTML file
- **Firebase Hosting** (free tier available)

## 📱 Add to App (Optional)

You can also add a link to privacy policy in your app:

### Update SettingsScreen.js

Add this to show privacy policy:

```javascript
<SettingItem
  icon="🔒"
  title="Privacy Policy"
  subtitle="How we protect your data"
  onPress={() => {
    // Open privacy policy URL
    Linking.openURL('https://your-privacy-policy-url.com');
  }}
/>
```

Don't forget to import Linking:
```javascript
import { Linking } from 'react-native';
```

## ✅ Play Store Requirements

### Required Information:
- ✅ Privacy Policy URL (you'll get this after hosting)
- ✅ Data collection disclosure
- ✅ Data usage explanation
- ✅ User rights information

### What's Covered in This Policy:
- ✅ What data is collected
- ✅ How data is stored (locally)
- ✅ How data is used
- ✅ Data sharing (none)
- ✅ User rights
- ✅ Medical disclaimer
- ✅ Contact information

## 🔧 Customization

### Update These Sections:

1. **Contact Information (Section 14):**
   - Update email if you have one
   - Add phone number if needed
   - Add physical address if required

2. **Support Email:**
   - Change `support@pedss.aiims.edu` to your actual email
   - Or remove if not applicable

3. **Institution Names:**
   - Already includes AIIMS and IIIT Delhi
   - Update if needed

## 📋 Checklist

- [ ] Review privacy policy content
- [ ] Update contact information
- [ ] Host privacy policy online
- [ ] Get privacy policy URL
- [ ] Add URL to Play Store Console
- [ ] (Optional) Add link in app Settings screen
- [ ] Test privacy policy link works

## 🚀 Quick Start

**Fastest way to get privacy policy URL:**

1. Use GitHub Pages (5 minutes):
   - Create repo
   - Upload `privacy-policy.html`
   - Enable Pages
   - Get URL

2. Add URL to Play Store:
   - Play Console → App Content → Privacy Policy
   - Paste URL
   - Save

## 📝 Notes

- Privacy policy is required for Play Store if app collects any data
- Your app collects patient data (even if local), so policy is required
- Policy should be accessible via public URL
- Update policy if app functionality changes

---

**Status:** Privacy Policy created ✅  
**Next Step:** Host it online and get URL for Play Store

