import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import GUI from "lil-gui";

/**
 * Debug GUI
 */
const gui = new GUI();
const debugObject = {};

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
debugObject.color = "#ff0000"; // We need to keep the color outside Threejs color management to avoid unexpected results when using the GUI
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
const material = new THREE.MeshBasicMaterial({
  color: debugObject.color,
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/**
 * GUI
 */

// prettier-ignore
gui.add(mesh.position, "y")
  .min(-3)
  .max(3)
  .step(0.1)
  .name('elevation');

// prettier-ignore
gui
  .add(mesh, "visible")
  .enable(true);

gui.add(mesh.material, "wireframe");

gui
  .addColor(debugObject, "color")
  .onChange((value) => material.color.set(value));

debugObject.spin = () =>
  gsap.to(mesh.rotation, { y: mesh.rotation.y + 2 * Math.PI });

gui.add(debugObject, "spin");

debugObject.subdivision = 2; // We'll use the same for width, height, and depth

// prettier-ignore
gui.add(debugObject, 'subdivision')
  .min(1)
  .max(20)
  .step(1)
  .onFinishChange((value) => {
    // Before setting a new geometry we free the resources allocated by the old ones.
    mesh.geometry.dispose();
    mesh.geometry = new THREE.BoxGeometry(1, 1, 1, value, value, value)
  });

let test = 1;
gui.add({ test }, "test");

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
