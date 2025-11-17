# Quick Webflow Setup Guide

## Step-by-Step Instructions

### 1. Push to GitHub

Make sure your repository is pushed to GitHub and you know:

- Your GitHub username
- Your repository name (should be `threejs-javascript-portfolio`)
- Your default branch name (`main` or `master`)

### 2. Get Your GitHub Raw URL

Replace the placeholders in this URL:

```
https://raw.githubusercontent.com/YOUR_USERNAME/threejs-javascript-portfolio/main/threejs-scene.js
```

Example (if your username is `jonasbergmar`):

```
https://raw.githubusercontent.com/jonasbergmar/threejs-javascript-portfolio/main/threejs-scene.js
```

### 3. Add to Webflow

#### In Project Settings (Site-wide):

1. Go to **Project Settings** → **Custom Code**
2. In the **Head Code** section, add:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r169/three.min.js"></script>
```

#### In Page Settings (Per Page):

1. Go to **Page Settings** → **Custom Code**
2. In the **Footer Code** section (Before `</body>` tag), add:

```html
<script src="https://raw.githubusercontent.com/YOUR_USERNAME/threejs-javascript-portfolio/main/threejs-scene.js"></script>
```

### 4. Add Container Element

1. In your Webflow page, add a **Div Block**
2. Set its ID to: `canvas-container`
3. Style it as needed (width, height, position, etc.)

### 5. Publish and Test

- Publish your site
- The 3D scene should load automatically
- Any updates you push to GitHub will automatically reflect on your live site

## Troubleshooting

- **Script not loading?** Check that your GitHub repository is public
- **Three.js error?** Make sure you added the Three.js CDN in the Head Code
- **No canvas showing?** Verify the container div has the correct ID: `canvas-container`
- **Wrong branch?** If your default branch is `master` instead of `main`, update the URL accordingly
