import "/style.css"
import * as THREE from "three"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"


//Setup
const loader = new GLTFLoader()
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(60, document.querySelector("#about").clientWidth / window.innerHeight, 0.1, 10000)
camera.position.x = 319
camera.position.y = 503
camera.position.z = 23
camera.rotation.x = -1.55
camera.rotation.y = 1.16
camera.rotation.z = 1.56
const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#arcade')})
const control = new OrbitControls(camera, renderer.domElement)

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(document.querySelector("#about").clientWidth, window.innerHeight)
renderer.render(scene, camera)


const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5, 5, 5)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

// Arcade
let arcade
loader.load("assets/models/arcade_game_machine_001/arcade.gltf", function (gltf) {
    arcade = gltf.scene
    scene.add(arcade)
    console.log("Model loaded")
    animation()
})


// Create a texture for the arcade machine screen using the gameCanvas
const screenTexture = new THREE.CanvasTexture(document.querySelector("#game"));

// Create a plane geometry for the screen
const screenGeometry = new THREE.PlaneGeometry(100, 100);
const screenMaterial = new THREE.MeshBasicMaterial({ map: screenTexture });
const screen = new THREE.Mesh(screenGeometry, screenMaterial);

// Add the screen mesh to your scene
scene.add(screen);
console.log(screen.position[0])


//responsive 3d 
function update_size() {
    camera.aspect = document.querySelector("#about").clientWidth / window.innerHeight
    renderer.setSize(document.querySelector("#about").clientWidth, window.innerHeight)
}
window.onresize = update_size

let old_rotation
let old_position

function animation() {
    requestAnimationFrame(animation)
    control.update()
    renderer.render(scene, camera)
}

