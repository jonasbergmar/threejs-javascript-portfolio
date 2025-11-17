# Three.js JavaScript Portfolio Template

A basic Three.js template that can be used in Webflow.

## Setup

1. Install dependencies:

```bash
npm install
```

## Usage in Webflow

### Option 1: Using GitHub Raw URL (Recommended - Live Updates)

1. **Push this repository to GitHub** (if you haven't already)

2. **Add Three.js Library:**

   - Go to Project Settings → Custom Code
   - Add this in the `<head>` section:

   ```html
   <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r169/three.min.js"></script>
   ```

3. **Add Your Script from GitHub:**

   - Go to your page settings → Custom Code → Before `</body>` tag
   - Add this script tag (replace `YOUR_USERNAME` with your GitHub username):

   ```html
   <script src="https://raw.githubusercontent.com/YOUR_USERNAME/threejs-javascript-portfolio/main/threejs-scene.js"></script>
   ```

   - **Note:** If your default branch is not `main`, replace it with `master` or your branch name

4. **Create Container Element:**
   - Add a div with id `canvas-container` where you want the 3D scene
   - Or modify the script to target a different element

### Option 2: Copy/Paste Script

1. **Add Three.js Library** (same as Option 1, step 2)

2. **Copy and Paste Script:**
   - Copy the entire contents of `threejs-scene.js`
   - Go to your page settings → Custom Code → Before `</body>` tag
   - Paste the script directly (wrapped in `<script>` tags if needed)

### Benefits of GitHub Raw URL:

- ✅ Live updates: Changes pushed to GitHub automatically reflect in Webflow
- ✅ No need to copy/paste code manually
- ✅ Version control: Easy to track changes
- ✅ Single source of truth

## Local Development

Run a local server:

```bash
npm run dev
```

Then open `http://localhost:3000` (or the port shown)

## Customization

Edit `threejs-scene.js` to customize your 3D scene. The script exposes a global `window.threejsScene` object with:

- `scene` - The Three.js scene
- `camera` - The camera
- `renderer` - The WebGL renderer
- `cube` - The example cube mesh

You can access these from other scripts or Webflow interactions.
