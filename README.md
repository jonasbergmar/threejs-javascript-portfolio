# Three.js JavaScript Portfolio Template

A basic Three.js template that can be used in Webflow.

## Setup

1. Install dependencies:

```bash
npm install
```

## Usage in Webflow

1. **Add Three.js Library:**

   - Go to Project Settings → Custom Code
   - Add this in the `<head>` section:

   ```html
   <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r169/three.min.js"></script>
   ```

2. **Add Your Script:**

   - Copy the contents of `threejs-scene.js`
   - Go to your page settings → Custom Code → Before `</body>` tag
   - Paste the script or link to it

3. **Create Container Element:**
   - Add a div with id `canvas-container` where you want the 3D scene
   - Or modify the script to target a different element

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
