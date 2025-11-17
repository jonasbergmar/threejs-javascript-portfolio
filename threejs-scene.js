(function () {
  "use strict";

  // Scripts to load
  const scripts = [
    "https://cdnjs.cloudflare.com/ajax/libs/three.js/r169/three.min.js",
    "https://cdn.jsdelivr.net/npm/three@0.169.0/examples/js/controls/OrbitControls.js",
    "https://cdn.jsdelivr.net/npm/three@0.169.0/examples/js/loaders/GLTFLoader.js",
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
      script.onload = function () {
        console.log("Loaded:", src);
        resolve();
      };
      script.onerror = function () {
        console.error("Failed to load:", src);
        reject(new Error("Failed to load: " + src));
      };
      document.head.appendChild(script);
    });
  }

  // Load all dependencies
  function loadDependencies() {
    return Promise.all(scripts.map(loadScript));
  }

  // Wait for DOM to be ready and dependencies loaded
  function init() {
    console.log("Initializing Three.js scene...");

    // Check if Three.js is loaded
    if (typeof THREE === "undefined") {
      console.error("Three.js failed to load.");
      return;
    }
    console.log("Three.js loaded successfully");

    // Get container element (for Webflow, you can target a specific element)
    const container = document.getElementById("canvas-container");

    if (!container) {
      console.error("Container element with id 'canvas-container' not found!");
      console.log("Available elements:", document.querySelectorAll("[id]"));
      return;
    }
    console.log("Container found:", container);

    // Ensure container has proper styling
    if (container.style.width === "" || container.style.width === "auto") {
      container.style.width = "100%";
      container.style.height = "100vh";
      container.style.position = "relative";
      console.log("Applied default container styling");
    }

    // Scene setup
    const scene = new THREE.Scene();
    const containerWidth = container.clientWidth || window.innerWidth;
    const containerHeight = container.clientHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(
      75,
      containerWidth / containerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(containerWidth, containerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Style the canvas
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";

    // Append canvas to container
    container.appendChild(renderer.domElement);
    console.log(
      "Canvas appended to container. Size:",
      containerWidth,
      "x",
      containerHeight
    );

    // Position camera
    camera.position.z = 5;

    // Add OrbitControls
    let controls = null;
    if (typeof THREE.OrbitControls !== "undefined") {
      controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      console.log("OrbitControls initialized");
    } else if (typeof OrbitControls !== "undefined") {
      // Fallback if loaded as global
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      console.log("OrbitControls initialized (global)");
    } else {
      console.warn("OrbitControls not available");
    }

    // Load GLTF model
    let loader = null;
    if (typeof THREE.GLTFLoader !== "undefined") {
      loader = new THREE.GLTFLoader();
      console.log("GLTFLoader initialized");
    } else if (typeof GLTFLoader !== "undefined") {
      // Fallback if loaded as global
      loader = new GLTFLoader();
      console.log("GLTFLoader initialized (global)");
    } else {
      console.warn(
        "GLTFLoader not available. Trying alternative loading method..."
      );
      // Try to wait a bit more for the script to load
      setTimeout(function () {
        if (typeof THREE.GLTFLoader !== "undefined") {
          loader = new THREE.GLTFLoader();
          loadModel();
        } else {
          console.error("GLTFLoader still not available after waiting.");
        }
      }, 1000);
    }

    function loadModel() {
      if (!loader) {
        if (typeof THREE.GLTFLoader !== "undefined") {
          loader = new THREE.GLTFLoader();
        } else if (typeof GLTFLoader !== "undefined") {
          loader = new GLTFLoader();
        } else {
          console.error("GLTFLoader not available");
          return;
        }
      }

      console.log("Loading GLTF model...");
      loader.load(
        "https://pub-9a148005ec23411eaa0569d3cf870b96.r2.dev/Jonas%203D%20Export_0004.glb",
        function (gltf) {
          console.log("GLTF model loaded successfully");
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
          console.log("Model added to scene, camera adjusted");
        },
        function (progress) {
          if (progress.total > 0) {
            const percent = (progress.loaded / progress.total) * 100;
            console.log("Loading model: " + percent.toFixed(2) + "%");
          }
        },
        function (error) {
          console.error("Error loading GLTF model:", error);
        }
      );
    }

    if (loader) {
      loadModel();
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
      const containerWidth = container.clientWidth || window.innerWidth;
      const containerHeight = container.clientHeight || window.innerHeight;
      camera.aspect = containerWidth / containerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerWidth, containerHeight);
    }

    window.addEventListener("resize", onWindowResize);

    // Start animation
    animate();
    console.log("Animation loop started");

    // Expose scene, camera, renderer for external access if needed
    window.threejsScene = {
      scene: scene,
      camera: camera,
      renderer: renderer,
      controls: controls,
    };
    console.log(
      "Three.js scene initialized and exposed as window.threejsScene"
    );
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
