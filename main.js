import './style.css'
import * as THREE from 'three'
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const camera_position_start_x = 10000 
const camera_position_start_y = 10000
const camera_position_start_z = 10000.285
const camera_position_end_x = 135.79
const camera_position_end_y = 449.05
const camera_position_end_z = 1.285

const camera_rotation_start_x = 0 
const camera_rotation_start_y = 0
const camera_rotation_start_z = 0
const camera_rotation_end_x = -1.563
const camera_rotation_end_y = 1.167 
const camera_rotation_end_z = 1.562 

// setup

const loader = new GLTFLoader()

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 15000)
camera.position.x = camera_position_start_x
camera.position.y = camera_position_start_y
camera.position.z = camera_position_start_z

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.render(scene, camera)

//const controls = new OrbitControls(camera, renderer.domElement)

// Arcade
var arcade
loader.load("models/arcade_game_machine_001/arcade.gltf", function (gltf) {
    arcade = gltf.scene
    scene.add(arcade)
    camera.rotation.x = camera_rotation_start_x
    camera.rotation.y = camera_rotation_start_y
    camera.rotation.z = camera_rotation_start_z
    animate()
  })

// lighting

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5, 5, 5)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

// anim loop

function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}

// returns current scroll progress as a float between 0 and 1

function current_scroll_progress()
  {
      return ((document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight));
  }

// returns an inbetween value, between end and start value given the progress as a float between 0 and 1
function get_inbetween(start, end, progress){
  if(progress >= 0 || progress <= 1){
    return (end * progress) + (start * (1-progress))
  }
  else{
    console.log("Progress needs to be between 0 (0%) and 1 (100%)")
  }
}

function camera_movement() {
  var progress = current_scroll_progress()
  camera.position.x = get_inbetween(camera_position_start_x, camera_position_end_x, progress)
  camera.position.y = get_inbetween(camera_position_start_y, camera_position_end_y, progress)
  camera.position.z = get_inbetween(camera_position_start_z, camera_position_end_z, progress)
  camera.rotation.x = get_inbetween(camera_rotation_start_x, camera_rotation_end_x, progress)
  camera.rotation.y = get_inbetween(camera_rotation_start_y, camera_rotation_end_y, progress)
  camera.rotation.z = get_inbetween(camera_rotation_start_z, camera_rotation_end_z, progress)
}


document.body.onscroll = camera_movement



//camera.position.x = 135.79
//camera.position.y = 449.05
//camera.position.z = 1.285
//camera.rotation.x = -1.563
//camera.rotation.y = 1.167
//camera.rotation.z = 1.562