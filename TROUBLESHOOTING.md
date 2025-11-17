# Troubleshooting Guide

If you don't see your 3D model on your Webflow page, follow these steps:

## 1. Check Browser Console

Open your browser's Developer Tools (F12 or Right-click → Inspect) and check the Console tab for errors.

**Look for these messages:**

- ✅ "Loaded: [script URL]" - Scripts are loading successfully
- ✅ "Three.js loaded successfully" - Three.js is ready
- ✅ "Container found: [element]" - Your div was found
- ✅ "GLTFLoader initialized" - Loader is ready
- ✅ "Loading GLTF model..." - Model is being loaded
- ✅ "GLTF model loaded successfully" - Model loaded!

**Common errors:**

- ❌ "Container element with id 'canvas-container' not found!" - Your div ID is wrong
- ❌ "Failed to load: [URL]" - A dependency failed to load
- ❌ "GLTFLoader not available" - The loader script didn't load
- ❌ "Error loading GLTF model: [error]" - Model file issue

## 2. Verify Your Div Element

**In Webflow:**

1. Make sure you have a **Div Block** on your page
2. Set its **ID** to exactly: `canvas-container` (case-sensitive, no spaces)
3. Give it some dimensions:
   - Width: 100% (or a fixed width like 800px)
   - Height: 600px (or 100vh for full viewport height)
   - Position: Relative (or Absolute/Fixed if needed)

## 3. Check Script URL

Make sure your script tag in Webflow is exactly:

```html
<script src="https://raw.githubusercontent.com/jonasbergmar/threejs-javascript-portfolio/main/threejs-scene.js"></script>
```

**Verify:**

- The repository is **public** on GitHub
- The branch name is correct (`main` or `master`)
- The file exists at that path

## 4. Test the Script URL

Open this URL in your browser to verify the script loads:

```
https://raw.githubusercontent.com/jonasbergmar/threejs-javascript-portfolio/main/threejs-scene.js
```

You should see JavaScript code, not an error page.

## 5. Check Network Tab

In Developer Tools → Network tab:

- Look for failed requests (red)
- Check if `three.min.js`, `OrbitControls.js`, and `GLTFLoader.js` are loading
- Check if your GLTF model URL is accessible

## 6. Common Issues

### Issue: Container has no size

**Solution:** Add CSS to your div in Webflow:

- Width: 100% or fixed width (e.g., 800px)
- Height: 600px or 100vh

### Issue: Script loads but nothing happens

**Solution:**

- Check console for errors
- Verify the div ID is exactly `canvas-container`
- Make sure the div is visible (not hidden with display:none)

### Issue: "GLTFLoader not available"

**Solution:**

- The addon scripts might be blocked
- Check Network tab to see if they're loading
- Try waiting a few seconds - they load asynchronously

### Issue: Model loads but is invisible

**Solution:**

- Check if the model is too large/small
- Try adjusting camera position in the script
- Check if there's lighting (the script adds lights automatically)

## 7. Quick Test

Add this temporary code to your page to verify the container exists:

```html
<script>
  window.addEventListener("load", function () {
    const container = document.getElementById("canvas-container");
    if (container) {
      console.log("✅ Container found!", container);
      container.style.border = "2px solid red"; // Temporary visual check
    } else {
      console.error("❌ Container NOT found!");
    }
  });
</script>
```

If you see a red border around your div, the container exists. If not, check the ID.

## 8. Still Not Working?

1. **Check Webflow's custom code section:**

   - Make sure the script is in the **Footer Code** (before `</body>`)
   - Not in Head Code

2. **Try publishing your site:**

   - Webflow Designer might not show the 3D scene
   - Publish and check the live site

3. **Check for conflicts:**

   - Other scripts might be interfering
   - Try on a blank page first

4. **Verify model URL:**
   - Test the GLTF URL directly in browser
   - Should download a `.glb` file

## Need More Help?

Check the browser console and share:

- Any error messages
- Console logs (especially the ones starting with "✅" or "❌")
- Screenshot of the Network tab showing failed requests
