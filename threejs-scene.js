/**
 * Three.js Scene for Webflow
 *
 * This file can be embedded in Webflow using custom code.
 * Make sure to include Three.js CDN in your Webflow project settings:
 * https://cdnjs.cloudflare.com/ajax/libs/three.js/r169/three.min.js
 */

(function () {
  "use strict";

  // Wait for DOM to be ready
  function init() {
    // Check if Three.js is loaded
    if (typeof THREE === "undefined") {
      console.error(
        "Three.js is not loaded. Please include the Three.js library."
      );
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

    // Add a simple rotating cube
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshStandardMaterial({
      color: 0x00ff88,
      metalness: 0.5,
      roughness: 0.5,
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);

      // Rotate cube
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

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
      cube: cube,
    };
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
