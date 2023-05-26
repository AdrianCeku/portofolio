import "/style.css"
import * as THREE from "three"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"


//Setup
const loader = new GLTFLoader()
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(45, document.querySelector("#arcade").clientWidth / window.innerHeight, 0.1, 10000)
camera.position.set(350, 400, 0)
camera.rotation.set(degreeToRadian(0), degreeToRadian(90), degreeToRadian(0))

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
screen.rotation.set(degreeToRadian(90), degreeToRadian(108), degreeToRadian(0))

// Arcade
let arcade
loader.load("assets/models/arcade_game_machine_001/arcade.gltf", function (gltf) {
    arcade = gltf.scene
    scene.add(arcade)
    arcade.castShadow = true
    arcade.position.set(0,0,0)
    arcade.rotation.set(degreeToRadian(0), degreeToRadian(0), degreeToRadian(0))
    console.log("Model loaded")
    animation()
})




screen.attach(arcade)


//responsive 3d 
function update_size() {
    camera.aspect = document.querySelector("#arcade").clientWidth / window.innerHeight
    renderer.setSize(document.querySelector("#arcade").clientWidth, window.innerHeight)
}
window.onresize = update_size

let old_rotation
let old_position

function animation() {
    requestAnimationFrame(animation)
    renderer.render(scene, camera)
}

// returns an inbetween value, between end and start value given the progress as a float between 0 and 1
function degreeToRadian(degree) {
    return degree * (Math.PI / 180)
}

function get_inbetween(start, end, progress){
    return (end * progress) + (start * (1-progress))
}