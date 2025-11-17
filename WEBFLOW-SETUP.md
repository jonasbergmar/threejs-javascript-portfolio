# Webflow Setup Guide

This project is based on the [threejs-webflow-template](https://github.com/persephonepunch/threejs-webflow-template) and uses Vite to bundle Three.js and all dependencies into a single file.

## Quick Setup

### 1. Build the Project

```bash
npm run build
```

This creates `dist/main.js` - a single bundled file with all dependencies (Three.js, OrbitControls, GLTFLoader).

### 2. Push to GitHub

1. **Commit the built file** to your repository:

   ```bash
   git add dist/main.js dist/assets/
   git commit -m "Add built Three.js bundle"
   git push
   ```

2. Make sure your repository is **public** on GitHub.

### 3. Add to Webflow

1. Go to **Page Settings** → **Custom Code** → **Footer Code** (Before `</body>` tag)
2. Add this single script:

```html
<script src="https://raw.githubusercontent.com/jonasbergmar/threejs-javascript-portfolio/main/dist/main.js"></script>
```

**Note:** Replace `jonasbergmar` with your GitHub username if different.

### 4. Add Container Element

1. In your Webflow page, add a **Div Block**
2. Set its **ID** to exactly: `canvas-container` (case-sensitive)
3. Set width and height (e.g., 800px × 600px or 100% × 100vh)

### 5. Publish and Test

- Publish your site
- The 3D scene should load automatically
- Any updates you push to GitHub will automatically reflect on your live site

## Development Workflow

1. **Edit** `src/main.js` to make changes
2. **Test locally** with `npm run dev` (starts on http://localhost:3000)
3. **Build** with `npm run build` to create the bundle
4. **Commit and push** the `dist/` folder to GitHub
5. **Webflow automatically uses** the updated file

## Local Development with Webflow

The template includes a smart script that detects if you're running localhost and loads from there, otherwise uses production. You can add this to Webflow's Global Code:

```html
<script>
  (function () {
    const LOCALHOST_URL = [
      "http://localhost:3000/@vite/client",
      "http://localhost:3000/src/main.js",
    ];
    const PROD_URL = [
      "https://raw.githubusercontent.com/jonasbergmar/threejs-javascript-portfolio/main/dist/main.js",
    ];

    function createScripts(arr, isDevMode) {
      return arr.map(function (url) {
        const s = document.createElement("script");
        s.src = url;

        if (isDevMode) {
          s.type = "module";
        }

        return s;
      });
    }

    function insertScript(scriptArr) {
      scriptArr.forEach(function (script) {
        document.body.appendChild(script);
      });
    }

    const localhostScripts = createScripts(LOCALHOST_URL, true);
    const prodScripts = createScripts(PROD_URL, false);

    let choosedScripts = null;

    fetch(LOCALHOST_URL[0], {})
      .then(() => {
        choosedScripts = localhostScripts;
      })
      .catch((e) => {
        choosedScripts = prodScripts;
        console.error(e);
      })
      .finally(() => {
        if (choosedScripts) {
          insertScript(choosedScripts);
          return;
        }
        console.error("something went wrong, no scripts loaded");
      });
  })();
</script>
```

This allows you to:

- Develop locally with hot reload
- Automatically use production build when localhost isn't available

## Troubleshooting

- **Script not loading?**

  - Check that your GitHub repository is public
  - Verify the path includes `/dist/main.js`
  - Make sure you've run `npm run build` and committed the dist folder

- **No canvas showing?**

  - Verify the container div has the correct ID: `canvas-container`
  - Check browser console for errors
  - Make sure the div has width and height set

- **Model not loading?**
  - Check browser console for CORS or loading errors
  - Verify the GLTF model URL is accessible
  - Check Network tab in DevTools

## File Structure

```
threejs-javascript-portfolio/
├── src/
│   ├── main.js          # Main Three.js scene code
│   └── styles/
│       └── style.css    # Styles
├── dist/
│   ├── main.js          # Built bundle for Webflow
│   └── assets/          # CSS assets
├── index.html           # Local development HTML
├── vite.config.js       # Vite build configuration
└── package.json         # Dependencies and scripts
```

## Credits

Based on the template by [@persephonepunch](https://github.com/persephonepunch/threejs-webflow-template)
