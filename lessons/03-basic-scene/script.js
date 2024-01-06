import * as THREE from "three";

// Canvas
const canvas = document.getElementById("webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Axes helper
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

camera.position.z = 1.8;
camera.position.x = 1.8;
camera.position.y = 1.8;
camera.rotation.reorder("YXZ");
camera.rotation.x = -Math.PI / 4;
camera.rotation.y = Math.PI / 4;

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
