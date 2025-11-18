# CDN Options for Webflow

## Why GitHub Raw URLs Don't Work

GitHub raw URLs (`raw.githubusercontent.com`) often have **CORS (Cross-Origin Resource Sharing) issues** that prevent them from loading in Webflow. This is a browser security feature.

## Recommended Solutions

### Option 1: jsDelivr CDN (Best - No CORS issues)

```html
<script src="https://cdn.jsdelivr.net/gh/jonasbergmar/threejs-javascript-portfolio@main/dist/main.js"></script>
```

**Pros:**

- ✅ No CORS issues
- ✅ Fast CDN
- ✅ Proper headers
- ✅ Automatic caching

**Cons:**

- ⚠️ Caches files for 2-5 minutes (updates aren't instant)

**Force Cache Refresh:**
If you need immediate updates, add a version parameter:

```html
<script src="https://cdn.jsdelivr.net/gh/jonasbergmar/threejs-javascript-portfolio@main/dist/main.js?v=3"></script>
```

Change `v=3` to `v=4`, `v=5`, etc. each time you update.

### Option 2: unpkg CDN (Alternative)

```html
<script src="https://unpkg.com/github:jonasbergmar/threejs-javascript-portfolio@main/dist/main.js"></script>
```

**Note:** unpkg syntax for GitHub repos is different. You may need to publish to npm or use a different approach.

### Option 3: GitHub Pages (Most Reliable)

1. **Enable GitHub Pages:**

   - Go to your GitHub repo → Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` / `root`
   - Save

2. **Use this URL:**
   ```html
   <script src="https://jonasbergmar.github.io/threejs-javascript-portfolio/dist/main.js"></script>
   ```

**Pros:**

- ✅ No CORS issues
- ✅ Updates immediately
- ✅ Reliable

**Cons:**

- ⚠️ Requires enabling GitHub Pages
- ⚠️ Takes a minute to deploy

### Option 4: Netlify/Vercel (For Production)

If you want the most control:

1. Deploy the `dist` folder to Netlify or Vercel
2. Use the deployment URL

## Quick Fix for jsDelivr Cache

If jsDelivr shows an old version:

1. **Add cache-busting parameter:**

   ```html
   <script src="https://cdn.jsdelivr.net/gh/jonasbergmar/threejs-javascript-portfolio@main/dist/main.js?v=latest"></script>
   ```

2. **Or use commit hash:**
   ```html
   <script src="https://cdn.jsdelivr.net/gh/jonasbergmar/threejs-javascript-portfolio@COMMIT_HASH/dist/main.js"></script>
   ```

## Recommendation

**For Development/Testing:** Use jsDelivr with cache-busting (`?v=timestamp`)

**For Production:** Use GitHub Pages or jsDelivr (it's very reliable)
