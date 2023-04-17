import * as THREE from 'three'; 
import gsap from 'gsap'
import "./style.css"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
// import {PipePair} from './pipePair.js'
import { PipePair } from './pipePair';
// scene
const timeStep = 1 / 60; // time between frames
const gravity = 40;
const maxVelocity = 100;
const jumpForce = -6;
const damping = 0.09; // damping factor to apply smoothing
let velocity = 0;
let position = new THREE.Vector3();
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x67d2d6)
//Create Sphere
const geometry = new THREE.SphereGeometry(3,64,64)
// create material
const material = new THREE.MeshStandardMaterial({
  color: "#e1fc2b",
  roughness: 0.1,
})
// mesh acceleration
// let velocity=0;
let acceleration=0;
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Light
const light = new THREE.PointLight(0xffffff,1.25,100)
const widerLight= new THREE.AmbientLight(0xffffff,0.1)
widerLight.position.set(0,10,10)
light.position.set(0,10,10)
scene.add(widerLight)
scene.add(light)

const sizes= {
  width: window.innerWidth,
  height: window.innerHeight 
}
// add Camera
const camera = new THREE.PerspectiveCamera(60,sizes.width/sizes.height, 0.1,100)
camera.position.z=20
scene.add(camera)


let pp= new PipePair(1,1,10)

// scene.add(pp.getMesh())

// console.log(pp.getMesh())





//Renderer
const canvas = document.querySelector('.webgl')

const renderer= new THREE.WebGLRenderer({canvas})

renderer.setSize(sizes.width,sizes.height)
renderer.setOpaqueSort(true)
renderer.setPixelRatio(.4)
renderer.render(scene, camera)


let jumped=false;
let isJumping = false;
document.addEventListener('keydown', function(event) {
  if(event.keyCode == 32 && !jumped) {
      // make this only work once
      isJumping=true;
      // velocity-=.1
      setTimeout(function() {
        isJumping = false;
      }, 100);
  }
});
document.addEventListener('keyup', function(event) {
  if(event.keyCode == 32 && !jumped) {
      // make this only work once
      isJumping=false;
      // velocity-=.1
      // setTimeout(function() {
      //   jumped = false;
      // }, 500);
  }
});

// resize
window.addEventListener('resize',() => {
  // update sizes
  sizes.width = window.innerWidth
  sizes.height= window.innerHeight
  // update camera
  camera.aspect=sizes.width/sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width,sizes.height)
} )





function simulateGravity(mesh, timeStep, isJumping) {
  // apply gravity
  velocity += gravity * timeStep;
  velocity = Math.min(velocity, maxVelocity); // limit velocity
  // log mesh position
  // console.log(mesh.position.y)
  // apply jump force if jumping
  if (isJumping) {
    // 
    velocity = jumpForce;

  }


  // update position
  if (mesh.position.y <-20   ) {
    // reset position
    mesh.position.y = 0;
    velocity = 0;
  }
  mesh.getWorldPosition(position);
  position.y -= velocity * timeStep;
  mesh.position.copy(position);
}






let lastTime = 0;
// let timeStep = 0;
function gameLoop(currentTime) {
  // calculate time step
  if (lastTime === 0) {
    lastTime = currentTime+1;
  }
  const timeStep = (currentTime - lastTime) / 1000; // convert to seconds
  lastTime = currentTime;

  // update game objects
  simulateGravity(mesh, timeStep, isJumping);

  // render the scene
  renderer.render(scene, camera);

  // request the next frame
  requestAnimationFrame(gameLoop);
}
gameLoop(0);  