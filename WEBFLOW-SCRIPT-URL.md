# Webflow Script URL - Use This!

## Current Working URL (with cache-busting):

```html
<script src="https://cdn.jsdelivr.net/gh/jonasbergmar/threejs-javascript-portfolio@main/dist/main.js?v=4"></script>
```

## Important Notes:

1. **Change the version number** (`?v=4`) each time you update:

   - After pushing new code, change to `?v=5`, `?v=6`, etc.
   - This forces jsDelivr to fetch the latest version

2. **The latest build includes:**

   - ✅ Zoom disabled (no scroll zoom)
   - ✅ Materials forced to white/bright
   - ✅ Very bright lighting setup
   - ✅ Detailed console logging

3. **If you still see old behavior:**
   - Hard refresh your browser (Cmd+Shift+R or Ctrl+Shift+R)
   - Increment the version number in the URL
   - Wait 30 seconds and try again

## Alternative: Use GitHub Pages (updates immediately)

1. Enable GitHub Pages in repo settings
2. Use: `https://jonasbergmar.github.io/threejs-javascript-portfolio/dist/main.js`
