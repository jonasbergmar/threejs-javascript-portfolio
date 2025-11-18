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
    renderer.toneMappingExposure = 2.5; // Very high exposure to brighten the scene
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

    // Add lights - EXTREMELY bright setup to ensure model is visible
    // Ambient light - provides overall illumination (very bright)
    const ambientLight = new THREE.AmbientLight(0xffffff, 3.0);
    scene.add(ambientLight);
    console.log("Ambient light added (intensity: 3.0)");

    // Hemisphere light - natural sky/ground lighting (very effective)
    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x888888, 2.5);
    hemisphereLight.position.set(0, 10, 0);
    scene.add(hemisphereLight);
    console.log("Hemisphere light added (intensity: 2.5)");

    // Directional light - simulates sunlight (very bright)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 3.0);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = false;
    scene.add(directionalLight);
    console.log("Directional light added (intensity: 3.0)");

    // Second directional light from the opposite side
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 2.5);
    directionalLight2.position.set(-5, 5, -5);
    scene.add(directionalLight2);
    console.log("Second directional light added (intensity: 2.5)");

    // Third directional light from the side
    const directionalLight3 = new THREE.DirectionalLight(0xffffff, 2.0);
    directionalLight3.position.set(0, 5, 10);
    scene.add(directionalLight3);
    console.log("Third directional light added (intensity: 2.0)");

    // Point light above for top-down illumination
    const pointLight = new THREE.PointLight(0xffffff, 2.0);
    pointLight.position.set(0, 10, 0);
    scene.add(pointLight);
    console.log("Point light added (intensity: 2.0)");

    // Additional point lights around the model
    const pointLight2 = new THREE.PointLight(0xffffff, 1.5);
    pointLight2.position.set(10, 5, 0);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xffffff, 1.5);
    pointLight3.position.set(-10, 5, 0);
    scene.add(pointLight3);

    console.log("All lights added - total intensity very high");

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
    controls.minDistance = 0; // Prevent zoom limits
    controls.maxDistance = Infinity; // Prevent zoom limits
    controls.mouseButtons = {
      LEFT: THREE.MOUSE.ROTATE,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.PAN,
    };
    controls.touches = {
      ONE: THREE.TOUCH.ROTATE,
      TWO: THREE.TOUCH.DOLLY_PAN,
    };

    // Completely prevent wheel zoom - multiple methods
    function preventZoom(e) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    renderer.domElement.addEventListener("wheel", preventZoom, {
      passive: false,
    });
    renderer.domElement.addEventListener("DOMMouseScroll", preventZoom, {
      passive: false,
    });
    renderer.domElement.addEventListener("mousewheel", preventZoom, {
      passive: false,
    });

    // Also prevent zoom on the container
    if (container) {
      container.addEventListener("wheel", preventZoom, { passive: false });
    }

    console.log("OrbitControls initialized - zoom disabled");

    // Load GLTF model
    const loader = new GLTFLoader();
    console.log("GLTFLoader initialized");

    console.log("Loading GLTF model...");
    loader.load(
      "https://pub-9a148005ec23411eaa0569d3cf870b96.r2.dev/Jonas%203D%20Export_0004.glb",
      function (gltf) {
        console.log("GLTF model loaded successfully");

        // CRITICAL: Alert to verify new code is running
        alert("NEW CODE LOADED - Check console for material processing logs!");

        console.log("*** STARTING MATERIAL PROCESSING ***");
        console.log("GLTF scene type:", gltf.scene.type);
        console.log("GLTF scene children:", gltf.scene.children.length);

        // CRITICAL: Force immediate log to verify code is running
        console.error(
          "*** THIS IS NEW CODE - IF YOU SEE THIS, CODE IS RUNNING ***"
        );

        // Traverse the model and ensure materials are properly configured
        let meshCount = 0;
        let materialCount = 0;
        let totalChildren = 0;

        // FIRST: Try to access meshes directly
        console.log("*** DIRECT ACCESS TEST ***");
        console.log("gltf.scene:", gltf.scene);
        console.log("gltf.scene.children:", gltf.scene.children);

        // Try to find meshes in children directly
        gltf.scene.children.forEach((child, index) => {
          console.log(`Child ${index}:`, child.type, child.name || "unnamed");
          if (child.isMesh) {
            console.log(`*** DIRECT MESH FOUND at index ${index} ***`);
          }
        });

        gltf.scene.traverse(function (child) {
          totalChildren++;
          console.log(
            "*** TRAVERSING *** child:",
            child.type,
            child.name || "unnamed",
            "isMesh:",
            child.isMesh
          );

          if (child.isMesh) {
            meshCount++;
            console.log(
              "*** FOUND MESH ***",
              child.name || "unnamed",
              "Type:",
              child.type,
              "Visible:",
              child.visible
            );
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
                materialCount++;
                console.log(
                  "Processing material:",
                  material.type,
                  "Material:",
                  material
                );

                // Make sure material is visible
                material.visible = true;

                // FORCE all materials to be bright and visible - regardless of type
                console.log("*** PROCESSING MATERIAL *** Type:", material.type);

                // ALWAYS brighten the color, no matter what
                if (material.color) {
                  const originalBrightness =
                    material.color.r + material.color.g + material.color.b;
                  console.log(
                    "Original material brightness:",
                    originalBrightness
                  );

                  // FORCE bright color - multiply by large amount
                  material.color.multiplyScalar(10.0); // Very aggressive

                  // Clamp to ensure it's visible
                  material.color.r = Math.max(material.color.r, 0.5);
                  material.color.g = Math.max(material.color.g, 0.5);
                  material.color.b = Math.max(material.color.b, 0.5);

                  console.log(
                    "New material brightness:",
                    material.color.r + material.color.g + material.color.b
                  );
                } else {
                  console.log("Material has no color property!");
                }

                // Handle ALL material types - be more aggressive
                if (
                  material.isMeshStandardMaterial ||
                  material.isMeshPhysicalMaterial ||
                  material.isMeshLambertMaterial ||
                  material.isMeshPhongMaterial ||
                  material.isMeshBasicMaterial ||
                  material.isMeshToonMaterial
                ) {
                  // For Standard/Physical materials, adjust properties
                  if (
                    material.isMeshStandardMaterial ||
                    material.isMeshPhysicalMaterial
                  ) {
                    // Reduce metalness to make it more reflective of light
                    if (material.metalness !== undefined) {
                      material.metalness = Math.min(material.metalness, 0.5);
                    }
                    // Increase roughness to catch more light
                    if (material.roughness !== undefined) {
                      material.roughness = Math.max(material.roughness, 0.3);
                    }
                  }

                  // If it's a BasicMaterial, it doesn't respond to lights - convert it
                  if (material.isMeshBasicMaterial) {
                    console.log(
                      "*** Converting BasicMaterial to StandardMaterial ***"
                    );
                    const newMaterial = new THREE.MeshStandardMaterial({
                      color: material.color || 0xffffff,
                      map: material.map,
                      transparent: material.transparent,
                      opacity: material.opacity,
                    });
                    child.material = newMaterial;
                    material = newMaterial; // Update reference
                  }
                } else {
                  // For unknown material types, ALWAYS replace with visible material
                  console.log(
                    "*** UNKNOWN MATERIAL TYPE - REPLACING ***",
                    material.type
                  );
                  const newMaterial = new THREE.MeshStandardMaterial({
                    color: 0xffffff,
                    metalness: 0.3,
                    roughness: 0.7,
                  });
                  child.material = newMaterial;
                  material = newMaterial; // Update reference
                }

                // FINAL CHECK - ALWAYS force material to bright white
                if (material.color) {
                  material.color.setRGB(1, 1, 1); // Force white
                  console.log("*** FORCED material to white ***");
                } else {
                  // If no color property, replace entire material
                  console.log("*** NO COLOR PROPERTY - REPLACING MATERIAL ***");
                  const whiteMaterial = new THREE.MeshStandardMaterial({
                    color: 0xffffff,
                    metalness: 0.3,
                    roughness: 0.7,
                  });
                  child.material = whiteMaterial;
                }

                // Force material update
                material.needsUpdate = true;
              });
            } else {
              // If no material, add one
              console.log("Mesh has no material, adding default material");
              child.material = new THREE.MeshStandardMaterial({
                color: 0xffffff,
                metalness: 0.3,
                roughness: 0.7,
              });
            }
          }
        });

        console.log(
          "*** TRAVERSE COMPLETE *** - Total children:",
          totalChildren,
          "Meshes found:",
          meshCount,
          "Materials processed:",
          materialCount
        );

        // Debug: Check if model is actually in the scene
        console.log("Model scene children count:", gltf.scene.children.length);
        console.log(
          "Full scene children:",
          scene.children.map((c) => c.type)
        );

        // Add a test cube to verify lighting works
        const testGeometry = new THREE.BoxGeometry(1, 1, 1);
        const testMaterial = new THREE.MeshStandardMaterial({
          color: 0xff0000,
        });
        const testCube = new THREE.Mesh(testGeometry, testMaterial);
        testCube.position.set(0, 0, 0);
        scene.add(testCube);
        console.log("*** Added red test cube to verify lighting ***");

        scene.add(gltf.scene);
        console.log("*** GLTF scene added to main scene ***");

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
