
import "/style.css"
import * as THREE from "three"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"
import { degToRad } from "three/src/math/MathUtils"


//Setup
const loader = new GLTFLoader()
const scene = new THREE.Scene()
const backgroundTexture = new THREE.Color("white")//new THREE.TextureLoader().load("assets/img/space.jpg")
scene.background = backgroundTexture

const camera = new THREE.PerspectiveCamera(45, document.querySelector("#arcade").clientWidth / window.innerHeight, 0.1, 11000)
camera.position.set(250, 400, 0)

const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#arcade')})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(document.querySelector("#about").clientWidth, window.innerHeight)
renderer.render(scene, camera)

const arcadeGroup = new THREE.Group()
const cameraGroup = new THREE.Group()
cameraGroup.add(camera)

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff)

scene.add(ambientLight)

//Skydome
const skydomeTexture = new THREE.TextureLoader().load("assets/img/space_dev.jpg")
skydomeTexture.wrapS = THREE.RepeatWrapping;
skydomeTexture.wrapT = THREE.RepeatWrapping;
skydomeTexture.repeat.set( 10, 11 );
const skydomeMaterial = new THREE.MeshBasicMaterial({ map: skydomeTexture })
skydomeMaterial.side = THREE.DoubleSide
const skydomeGeometry = new THREE.SphereGeometry(10000,32,32)
const skydome = new THREE.Mesh(skydomeGeometry, skydomeMaterial)
cameraGroup.add(skydome)
scene.add(cameraGroup)

// Screen
const screenTexture = new THREE.CanvasTexture(document.querySelector("#game"))
screenTexture.needsUpdate = true
const screenGeometry = new THREE.PlaneGeometry(170, 130)
const screenMaterial = new THREE.MeshBasicMaterial({ map: screenTexture })
screenMaterial.needsUpdate = true
const screen = new THREE.Mesh(screenGeometry, screenMaterial)
screen.position.set(20, 398, 0)
screen.rotation.set(degToRad(90), degToRad(108), degToRad(-90))
arcadeGroup.add(screen)

// Arcade
let arcade
loader.load("assets/models/arcade_no_screen.glb", function (glb) {
    arcade = glb.scene
    arcade.castShadow = true
    arcade.position.set(0,0,0)
    arcade.rotation.set(degToRad(0), degToRad(0), degToRad(0))
    arcadeGroup.add(arcade)
    scene.add(arcadeGroup)
    console.log("Model loaded")
    animation()
})

//responsive 3d 
function update_size() {
    camera.aspect = document.querySelector("#arcade").clientWidth / window.innerHeight
    renderer.setSize(document.querySelector("#arcade").clientWidth, window.innerHeight)
    camera.updateProjectionMatrix();
}
window.onresize = update_size

function animation() {
    requestAnimationFrame(animation)
    screenTexture.needsUpdate = true
    screenMaterial.needsUpdate = true
    cameraGroup.position.x += 0.1
    cameraGroup.position.y += 0.1
    cameraGroup.position.z += 0.1
    camera.lookAt(screen.position)
    renderer.render(scene, camera)
}
