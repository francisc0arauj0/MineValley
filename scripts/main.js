import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { World } from './world.js';

const stats = new Stats();
document.body.append(stats.dom);

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x6eb1ff);

document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
);
camera.position.set(-32, 16, -32);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();

const world = new World();
world.generate();
scene.add(world);

function setupLights() {
	const light1 = new THREE.DirectionalLight();
	light1.position.set(1, 1, 1);
	scene.add(light1);

	const light2 = new THREE.DirectionalLight();
	light2.position.set(-1, 1, -0.5);
	scene.add(light2);

	const ambient = new THREE.AmbientLight();
	ambient.intensity = 0.1;
	scene.add(ambient);
}

function renderLoop() {
	requestAnimationFrame(renderLoop);
	renderer.render(scene, camera);
	stats.update();
}

window.addEventListener('resize', () => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
});

setupLights();
renderLoop();
