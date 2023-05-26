
import "/style.css"
import * as THREE from "three"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"
import { degToRad } from "three/src/math/MathUtils"


//Setup
const loader = new GLTFLoader()
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(45, document.querySelector("#arcade").clientWidth / window.innerHeight, 0.1, 10000)
camera.position.set(350, 400, 0)
camera.rotation.set(degToRad(0), degToRad(90), degToRad(0))

const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#arcade')})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(document.querySelector("#about").clientWidth, window.innerHeight)
renderer.render(scene, camera)

// Lighting
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5, 5, 5)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

// Screen
const screenTexture = new THREE.CanvasTexture(document.querySelector("#game"));
const screenGeometry = new THREE.PlaneGeometry(135, 170);
const screenMaterial = new THREE.MeshBasicMaterial({ map: screenTexture });
const screen = new THREE.Mesh(screenGeometry, screenMaterial);

scene.add(screen);

screen.position.set(20, 398, 0)
screen.rotation.set(degToRad(90), degToRad(108), degToRad(0))

// Arcade
let arcade
loader.load("assets/models/arcade_game_machine_001/arcade.gltf", function (gltf) {
    arcade = gltf.scene
    scene.add(arcade)
    arcade.castShadow = true
    arcade.position.set(0,0,0)
    arcade.rotation.set(degToRad(0), degToRad(0), degToRad(0))
    console.log("Model loaded")
    animation()
})

//responsive 3d 
function update_size() {
    camera.aspect = document.querySelector("#arcade").clientWidth / window.innerHeight
    renderer.setSize(document.querySelector("#arcade").clientWidth, window.innerHeight)
}
window.onresize = update_size

function animation() {
    requestAnimationFrame(animation)
    renderer.render(scene, camera)
}