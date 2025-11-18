# Webflow Quick Start Guide

## Step-by-Step Instructions

### Step 1: Make sure your code is built and pushed to GitHub

1. **Build the project:**

   ```bash
   npm run build
   ```

2. **Push to GitHub:**

   ```bash
   git add dist/
   git commit -m "Update build"
   git push
   ```

3. **Verify your repository is public** on GitHub (needed for jsDelivr to work)

---

### Step 2: Add the script to Webflow

1. **Open your Webflow project**
2. **Go to the page** where you want the 3D scene
3. **Click the gear icon** (⚙️) next to the page name → **Page Settings**
4. **Click "Custom Code"** tab
5. **Scroll to "Footer Code"** section (the one that says "Paste code before `</body>` tag")
6. **Paste this code:**

**Option A: jsDelivr CDN (Recommended - No CORS issues)**

```html
<script src="https://cdn.jsdelivr.net/gh/jonasbergmar/threejs-javascript-portfolio@main/dist/main.js"></script>
```

**Option B: Force refresh jsDelivr cache (if updates not showing)**

```html
<!-- Add ?v= with timestamp or version number to bust cache -->
<script src="https://cdn.jsdelivr.net/gh/jonasbergmar/threejs-javascript-portfolio@main/dist/main.js?v=3"></script>
```

**Option C: Use unpkg (alternative CDN)**

```html
<script src="https://unpkg.com/github:jonasbergmar/threejs-javascript-portfolio@main/dist/main.js"></script>
```

7. **Click "Save"** and **close the settings**

---

### Step 3: Add the container div

1. **On your Webflow page**, add a **Div Block** element
2. **Select the div** and go to **Element Settings** (right panel)
3. **Set the ID** to exactly: `canvas-container`
   - Click on the element
   - In the right panel, find "Element ID" or "Settings" → "ID"
   - Type: `canvas-container` (case-sensitive, no spaces)
4. **Set dimensions:**
   - Width: `100%` (or a fixed width like `800px`)
   - Height: `600px` (or `100vh` for full viewport height)

---

### Step 4: Publish and test

1. **Click "Publish"** in Webflow
2. **Visit your published site**
3. **The 3D model should appear** in the container div
4. **You can interact with it** (drag to rotate, scroll to zoom)

---

## That's it!

Your 3D scene is now live. When you update the code:

1. Edit `src/main.js`
2. Run `npm run build`
3. Push to GitHub
4. Webflow automatically uses the updated file (may need to clear cache)

---

## Troubleshooting

**Nothing showing?**

- Open browser DevTools (F12) → Console tab
- Look for error messages
- Check that the div ID is exactly `canvas-container`
- Verify the script URL is correct

**Script not loading?**

- Make sure your GitHub repo is **public**
- Check the URL: `https://cdn.jsdelivr.net/gh/jonasbergmar/threejs-javascript-portfolio@main/dist/main.js`
- Try opening that URL directly in a browser - you should see JavaScript code

**Model not loading?**

- Check the browser Console for errors
- Verify the GLTF model URL in `src/main.js` is accessible
