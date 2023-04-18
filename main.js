import * as THREE from 'three'; 
import gsap from 'gsap'
import "./style.css"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
// import {PipePair} from './pipePair.js'
import { PipePair } from './PipePair';
// scene
// cant u see 
const TIMESTEP = 1 / 60; // time between frames
const GRAVITY = 40;
const MAXVELOCITY = 100;
const JUMP_FORCE = -6;
const DAMPING = 0.09; // DAMPING factor to apply smoothing
const ZOOM=100;

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
// const mesh2 = new THREE.Mesh(geometry, material)

scene.add(mesh)
// scene.add(mesh2)
// scene.add(mesh)



// Light
const light = new THREE.PointLight(0xffffff,1.25,100)
const widerLight= new THREE.AmbientLight(0xffffff,0.1)
widerLight.position.set(0,10,8)
light.position.set(0,10,10)
scene.add(widerLight)
scene.add(light)

const sizes= {
  width: window.innerWidth,
  height: window.innerHeight 
}
// add Camera
// const camera = new THREE.PerspectiveCamera(60,2, 0.1,100)
// CAMERA THAT keeps items at constant size
// const camera = new THREE.OrthographicCamera(1,-1,1,-1,0.1,200)
const camera= new THREE.PerspectiveCamera(ZOOM, sizes.width/sizes.height, 0.1, 100)


camera.position.z=20
scene.add(camera)


// let pair1= new PipePair(10, 0, 10);
// scene.add(pp.getMesh())
// console.log(pair1.getGap())

// scene.add(pair1.getMesh())
// 
// console.log(mesh)
// console.log(pp.getMesh())
// pipe stuff 
function makePipe(gapRange){
  // get the top of the camera's view
  


  // console.log("top of camera: "+topOfCamera)
  // console.log(position)
  
  // console.log(distanceFromeTop)
  let gap = Math.random()*gapRange;



  let pbody = new THREE.BoxGeometry(2,40,2);
  let pbody2= new THREE.BoxGeometry(2,40,2);
  let height=10;

  // let distFromTopOfScene = distanceFromeTop/2;
  let pmat = new THREE.MeshStandardMaterial({color: 0x00ff00});

  let pipe = new THREE.Mesh(pbody, pmat);
  let lowerPipe = new THREE.Mesh(pbody2, pmat);

  lowerPipe.position.set(20,-height, 1);

  // console.log("pipe: "+pipe.position.y+pipe.position.x+pipe.position.z)

  pipe.position.set(20, height+gap, 1);
  scene.add(lowerPipe);
  scene.add(pipe)
  return pipe;

}

let s=makePipe(35)


//Renderer
const canvas = document.querySelector('.webgl')

const renderer= new THREE.WebGLRenderer({canvas})

renderer.setSize(sizes.width,sizes.height)
// renderer.setOpaqueSort(false)
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





function simulateGRAVITY(mesh, TIMESTEP, isJumping) {
  // apply GRAVITY
  velocity += GRAVITY * TIMESTEP;
  velocity = Math.min(velocity, MAXVELOCITY); // limit velocity
  // log mesh position
  // console.log(mesh.position.y)
  // apply jump force if jumping
  if (isJumping) {
    // 
    velocity = JUMP_FORCE;

  }


  // update position
  if (mesh.position.y <-50) {
    // reset position
    mesh.position.y = 0;
    velocity = 0;
  }
  mesh.getWorldPosition(position);
  position.y -= velocity * TIMESTEP;
  mesh.position.copy(position);
}






let lastTime = 0;
// let TIMESTEP = 0;
function gameLoop(currentTime) {
  // calculate time step
  if (lastTime === 0) {
    lastTime = currentTime+1;
  }
  const TIMESTEP = (currentTime - lastTime) / 1000; // convert to seconds
  lastTime = currentTime;

  // update game objects
  simulateGRAVITY(mesh, TIMESTEP, isJumping);

  // render the scene
  renderer.render(scene, camera);

  // request the next frame
  requestAnimationFrame(gameLoop);
}
gameLoop(0);  