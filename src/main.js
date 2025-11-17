import "./styles/style.css";

// Three
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

(function () {
  "use strict";

  // Wait for DOM to be ready
  function init() {
    console.log("Initializing Three.js scene...");

    // Get container element (for Webflow)
    const container = document.getElementById("canvas-container");

    if (!container) {
      console.error("Container element with id 'canvas-container' not found!");
      console.log(
        "Available elements with IDs:",
        Array.from(document.querySelectorAll("[id]")).map((el) => el.id)
      );
      return;
    }
    console.log("Container found:", container);

    // Ensure container has proper styling
    if (!container.style.width || container.style.width === "auto") {
      container.style.width = "100%";
      container.style.height = "100vh";
      container.style.position = "relative";
      console.log("Applied default container styling");
    }

    // Scene setup
    const containerWidth = container.clientWidth || window.innerWidth;
    const containerHeight = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
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

    // Enable tone mapping for better color rendering
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5; // Increased exposure to brighten the scene
    renderer.outputEncoding = THREE.sRGBEncoding;

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

    // Add lights - very bright setup to ensure model is visible
    // Ambient light - provides overall illumination (very bright)
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);
    scene.add(ambientLight);
    console.log("Ambient light added");

    // Hemisphere light - natural sky/ground lighting (very effective)
    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.5);
    hemisphereLight.position.set(0, 10, 0);
    scene.add(hemisphereLight);
    console.log("Hemisphere light added");

    // Directional light - simulates sunlight (very bright)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.0);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = false;
    scene.add(directionalLight);
    console.log("Directional light added");

    // Second directional light from the opposite side
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight2.position.set(-5, 5, -5);
    scene.add(directionalLight2);
    console.log("Second directional light added");

    // Point light above for top-down illumination
    const pointLight = new THREE.PointLight(0xffffff, 1.5);
    pointLight.position.set(0, 10, 0);
    scene.add(pointLight);
    console.log("Point light added");

    // Optional: Add a point light for additional detail
    // const pointLight = new THREE.PointLight(0xffffff, 0.5);
    // pointLight.position.set(0, 10, 0);
    // scene.add(pointLight);

    // Optional: Add hemisphere light for natural outdoor lighting
    // const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
    // scene.add(hemisphereLight);

    // Add OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false; // Disable zoom completely
    controls.enablePan = true; // Allow panning
    controls.mouseButtons = {
      LEFT: THREE.MOUSE.ROTATE,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.PAN,
    };
    controls.touches = {
      ONE: THREE.TOUCH.ROTATE,
      TWO: THREE.TOUCH.DOLLY_PAN,
    };

    // Explicitly prevent wheel zoom
    renderer.domElement.addEventListener(
      "wheel",
      function (e) {
        e.preventDefault();
      },
      { passive: false }
    );

    console.log("OrbitControls initialized - zoom disabled");

    // Load GLTF model
    const loader = new GLTFLoader();
    console.log("GLTFLoader initialized");

    console.log("Loading GLTF model...");
    loader.load(
      "https://pub-9a148005ec23411eaa0569d3cf870b96.r2.dev/Jonas%203D%20Export_0004.glb",
      function (gltf) {
        console.log("GLTF model loaded successfully");

        // Traverse the model and ensure materials are properly configured
        gltf.scene.traverse(function (child) {
          if (child.isMesh) {
            // Enable shadows if needed
            child.castShadow = false;
            child.receiveShadow = false;

            // Ensure materials are properly set up
            if (child.material) {
              // If material is an array, handle each one
              const materials = Array.isArray(child.material)
                ? child.material
                : [child.material];

              materials.forEach((material) => {
                // Make sure material is visible
                material.visible = true;

                // Handle different material types
                if (
                  material.isMeshStandardMaterial ||
                  material.isMeshPhysicalMaterial ||
                  material.isMeshLambertMaterial ||
                  material.isMeshPhongMaterial
                ) {
                  // Increase material brightness
                  if (material.color) {
                    // Make colors brighter if they're too dark
                    const brightness =
                      material.color.r + material.color.g + material.color.b;
                    if (brightness < 0.3) {
                      material.color.multiplyScalar(2.0); // Brighten dark materials
                    }
                  }

                  // Set minimum brightness
                  if (material.emissive) {
                    material.emissive.setHex(0x000000);
                    material.emissiveIntensity = 0.0;
                  }

                  // Ensure metalness and roughness are reasonable
                  if (material.metalness !== undefined) {
                    material.metalness = Math.min(material.metalness, 0.8);
                  }
                  if (material.roughness !== undefined) {
                    material.roughness = Math.max(material.roughness, 0.1);
                  }
                }

                // Force material update
                material.needsUpdate = true;
              });
            }
          }
        });

        scene.add(gltf.scene);

        // Adjust camera to fit model
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
        cameraZ *= 1.5; // Add some padding
        camera.position.set(center.x, center.y, center.z + cameraZ);
        camera.lookAt(center);

        controls.target.copy(center);
        controls.update();
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

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      controls.update();
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

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
