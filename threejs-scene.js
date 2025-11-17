/**
 * Three.js Scene for Webflow
 *
 * This file can be embedded in Webflow using custom code.
 * It automatically loads all required dependencies - you only need this one script!
 */

(function () {
  "use strict";

  // Scripts to load
  const scripts = [
    "https://cdnjs.cloudflare.com/ajax/libs/three.js/r169/three.min.js",
    "https://unpkg.com/three@0.169.0/examples/js/controls/OrbitControls.js",
    "https://unpkg.com/three@0.169.0/examples/js/loaders/GLTFLoader.js",
  ];

  // Load a script dynamically
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      // Check if already loaded
      const existingScript = document.querySelector(`script[src="${src}"]`);
      if (existingScript) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // Load all dependencies
  function loadDependencies() {
    return Promise.all(scripts.map(loadScript));
  }

  // Wait for DOM to be ready and dependencies loaded
  function init() {
    // Check if Three.js is loaded
    if (typeof THREE === "undefined") {
      console.error("Three.js failed to load.");
      return;
    }

    // Get container element (for Webflow, you can target a specific element)
    const container =
      document.getElementById("canvas-container") || document.body;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Append canvas to container
    container.appendChild(renderer.domElement);

    // Position camera
    camera.position.z = 5;

    // Add OrbitControls
    let controls = null;
    if (typeof THREE.OrbitControls !== "undefined") {
      controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
    } else if (typeof OrbitControls !== "undefined") {
      // Fallback if loaded as global
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
    }

    // Load GLTF model
    let loader = null;
    if (typeof THREE.GLTFLoader !== "undefined") {
      loader = new THREE.GLTFLoader();
    } else if (typeof GLTFLoader !== "undefined") {
      // Fallback if loaded as global
      loader = new GLTFLoader();
    }

    if (loader) {
      loader.load(
        "https://pub-9a148005ec23411eaa0569d3cf870b96.r2.dev/Jonas%203D%20Export_0004.glb",
        function (gltf) {
          scene.add(gltf.scene);

          // Optional: Adjust camera to fit model
          const box = new THREE.Box3().setFromObject(gltf.scene);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);
          const fov = camera.fov * (Math.PI / 180);
          let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
          cameraZ *= 1.5; // Add some padding
          camera.position.set(center.x, center.y, center.z + cameraZ);
          camera.lookAt(center);

          if (controls) {
            controls.target.copy(center);
            controls.update();
          }
        },
        undefined,
        function (error) {
          console.error("Error loading GLTF model:", error);
        }
      );
    } else {
      console.warn("GLTFLoader not available. Add the GLTFLoader script.");
    }

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);

      // Update controls if available
      if (controls) {
        controls.update();
      }

      renderer.render(scene, camera);
    }

    // Handle window resize
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener("resize", onWindowResize);

    // Start animation
    animate();

    // Expose scene, camera, renderer for external access if needed
    window.threejsScene = {
      scene: scene,
      camera: camera,
      renderer: renderer,
      controls: controls,
    };
  }

  // Initialize when DOM is ready and dependencies are loaded
  function start() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () {
        loadDependencies()
          .then(init)
          .catch(function (error) {
            console.error("Failed to load dependencies:", error);
          });
      });
    } else {
      loadDependencies()
        .then(init)
        .catch(function (error) {
          console.error("Failed to load dependencies:", error);
        });
    }
  }

  start();
})();
