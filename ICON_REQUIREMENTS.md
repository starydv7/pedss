# Play Store Icon Requirements

## ✅ Requirements for Play Store

**App Icon Specifications:**
- **Format:** PNG or JPEG
- **Size:** 512px × 512px (exactly)
- **File Size:** Up to 1 MB
- **Design:** Must meet Google's design specifications

## 📋 What You Need to Do

### Step 1: Check Your Current Icon

Your icon file is at: `assets/icon.png`

**Check if it's 512x512px:**
- Open the file in an image editor
- Check dimensions
- If it's NOT 512x512px, resize it

### Step 2: Resize Icon (if needed)

**Option A: Using Online Tool (Easiest)**
1. Go to: https://www.iloveimg.com/resize-image
2. Upload your `icon.png`
3. Set size to: 512 × 512 pixels
4. Download resized image
5. Replace `assets/icon.png` with new file

**Option B: Using Image Editor**
- Photoshop, GIMP, Paint.NET, etc.
- Resize to exactly 512×512 pixels
- Save as PNG

**Option C: Using Command Line (if you have ImageMagick)**
```bash
magick convert assets/icon.png -resize 512x512 assets/icon.png
```

### Step 3: Verify Icon Meets Requirements

**Design Guidelines:**
- ✅ No transparent backgrounds (use solid color)
- ✅ Icon should be clear and recognizable at small sizes
- ✅ No text that's too small to read
- ✅ No misleading or inappropriate content
- ✅ Should represent your app clearly

**For PEDSS App:**
- Use medical/hospital icon (🏥)
- Or PEDSS logo if you have one
- Blue color scheme (#2563EB) matches your app
- Professional medical appearance

### Step 4: File Size Check

- Icon should be under 1 MB
- If larger, compress it:
  - Use: https://tinypng.com/
  - Or: https://compressor.io/

## 🎨 Icon Design Suggestions

**Recommended Design:**
- Medical cross or hospital icon
- PEDSS text/logo
- Blue background (#2563EB)
- Clean, professional look
- Works well at small sizes

**Example Concept:**
```
┌─────────────────┐
│                 │
│      🏥         │
│                 │
│     PEDSS       │
│                 │
└─────────────────┘
```

## ✅ Quick Checklist

- [ ] Icon is exactly 512×512 pixels
- [ ] File size is under 1 MB
- [ ] Format is PNG or JPEG
- [ ] No transparent background
- [ ] Icon is clear and professional
- [ ] Matches app theme/colors

## 📝 Notes

- EAS Build will automatically use `assets/icon.png`
- Play Store will resize it if needed, but 512×512 is required
- You can upload icon directly in Play Store Console if needed
- Icon appears in Play Store listing and on user's device

## 🔧 Current Status

Your `app.json` is now configured to use:
- `./assets/icon.png` as the app icon

**Next Step:** Verify your `assets/icon.png` is 512×512px!

