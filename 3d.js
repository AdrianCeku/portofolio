import '/style.css'
import * as THREE from 'three'
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const camera_position_start_x = 1000 
const camera_position_start_y = 1300
const camera_position_start_z = 1000
const camera_position_end_x = 135.79
const camera_position_end_y = 449.05
const camera_position_end_z = 1.285

const camera_rotation_start_x = -1.3 
const camera_rotation_start_y = 1
const camera_rotation_start_z = 1.3
const camera_rotation_end_x = -1.563
const camera_rotation_end_y = 1.167 
const camera_rotation_end_z = 1.562 

// setup

const loader = new GLTFLoader()

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10000)
camera.position.x = camera_position_start_x
camera.position.y = camera_position_start_y
camera.position.z = camera_position_start_z

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#arcade'),
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
    camera.position.x = camera_position_start_x
    camera.position.y = camera_position_start_y
    camera.position.z = camera_position_start_z
    camera.rotation.x = camera_rotation_start_x
    camera.rotation.y = camera_rotation_start_y
    camera.rotation.z = camera_rotation_start_z
    animate()
    console.log("Model loaded")
  })

// lighting

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5, 5, 5)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

// anim loop
var floating = true
var last_pos_z
var last_pos_y
var last_rotation_x
var last_rotation_z
var movement_z = 1
var movement_y = 1
var i = 0

function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  if(floating){
    if(arcade.position.y > 1350){
      movement_y = -1
    }
    else if(arcade.position.y < -300){
      movement_y = 1
    }
    if(arcade.position.z > 2800){
      movement_z = -1
    }
    else if(arcade.position.z < -1700){
      movement_z = 1
    }
    arcade.position.z += movement_z
    arcade.position.y += movement_y
    arcade.rotation.x += 0.003
    arcade.rotation.z += 0.003
  }
  else if(floating == false && i <= 1){
    i += 0.003
    arcade.position.y = get_inbetween(last_pos_y, 0, i)
    arcade.position.z = get_inbetween(last_pos_z, 0, i)
    arcade.rotation.x = get_inbetween(last_rotation_x, 0, i)
    arcade.rotation.z = get_inbetween(last_rotation_z, 0, i)
    camera.position.x = get_inbetween(camera_position_start_x, camera_position_end_x, i)
    camera.position.y = get_inbetween(camera_position_start_y, camera_position_end_y, i)
    camera.position.z = get_inbetween(camera_position_start_z, camera_position_end_z, i)
    camera.rotation.x = get_inbetween(camera_rotation_start_x, camera_rotation_end_x, i)
    camera.rotation.y = get_inbetween(camera_rotation_start_y, camera_rotation_end_y, i)
    camera.rotation.z = get_inbetween(camera_rotation_start_z, camera_rotation_end_z, i)
  }
}

// returns current scroll progress as a float between 0 and 1

function current_scroll_progress()
  {
      return ((document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight));
  }

// returns an inbetween value, between end and start value given the progress as a float between 0 and 1

var played_game = false
function get_inbetween(start, end, progress){
  return (end * progress) + (start * (1-progress))
}
function camera_movement() {
  var progress = current_scroll_progress()
  if(played_game == true){
    floating = true
    camera.position.x = get_inbetween(camera_position_end_x, camera_position_start_x, progress)
    camera.position.y = get_inbetween(camera_position_end_y, camera_position_start_y, progress)
    camera.position.z = get_inbetween(camera_position_end_z, camera_position_start_z, progress)
    camera.rotation.x = get_inbetween(camera_rotation_end_x, camera_rotation_start_x, progress)
    camera.rotation.y = get_inbetween(camera_rotation_end_y, camera_rotation_start_y, progress)
    camera.rotation.z = get_inbetween(camera_rotation_end_z, camera_rotation_start_z, progress)
  }

} 

function keydown(key){
  if(key["key"] == "e" && played_game == false){
    floating = false
    last_pos_y = arcade.position.y
    last_pos_z = arcade.position.z
    last_rotation_x = arcade.rotation.x 
    last_rotation_z = arcade.rotation.z
    arcade.position.y = get_inbetween(last_pos_y, 0, i)
    arcade.position.z = get_inbetween(last_pos_z, 0, i)
    arcade.rotation.x = get_inbetween(last_rotation_x, 0, i)
    arcade.rotation.z = get_inbetween(last_rotation_z, 0, i)
    played_game = true
  }
}

document.body.onscroll = camera_movement
document.body.onkeydown = keydown


//camera.position.x = 135.79
//camera.position.y = 449.05
//camera.position.z = 1.285
//camera.rotation.x = -1.563
//camera.rotation.y = 1.167
//camera.rotation.z = 1.562