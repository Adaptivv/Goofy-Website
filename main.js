import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import spacebg from  './17520.webp'
import gringo from './gringo.jpg';
import rei from './reitest.jpg';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10,3,16,100);
const material = new THREE.MeshStandardMaterial({color: 0x6600FF});
const torus = new THREE.Mesh(geometry, material);
torus.position.set(20,0,0)

scene.add(torus);

const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.set(5,5,5);

const ambientLight = new THREE.AmbientLight(0xFFFFFF);

scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.5, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xFFFFFF});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load(spacebg);
scene.background = spaceTexture;

const gringoTexture = new THREE.TextureLoader().load(gringo);

const gringo = new THREE.Mesh(
  new THREE.BoxGeometry(6,6,6),
  new THREE.MeshBasicMaterial({map: gringoTexture})
);
gringo.position.set(20,0,0)

scene.add(gringo);

const thingTexture = new THREE.TextureLoader().load(rei);

const thing = new THREE.Mesh(
  new THREE.SphereGeometry(3, 30, 30),
  new THREE.MeshStandardMaterial({
    map: thingTexture,
  })
)

thing.position.z = 10;
thing.position.x = -10;

scene.add(thing);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  thing.rotation.x += 0.0005;
  thing.rotation.y += 0.0075;
  thing.rotation.z += 0.0005;
  
  gringo.rotation.x += 0.01;
  gringo.rotation.y += 0.02;

  camera.position.x = t*-0.1;
  camera.position.x = t*-0.01;
  camera.position.x = t*-0.01;
}

document.body.onscroll = moveCamera

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.01;

  controls.update;
  renderer.render(scene, camera);
}


animate()
