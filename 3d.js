
import "/style.css"
import * as THREE from "three"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"
import { degToRad } from "three/src/math/MathUtils"
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import {darkmode} from "./main.js"


//Setup
const loader = new GLTFLoader()

const scene = new THREE.Scene()
const backgroundTextureDark = new THREE.TextureLoader().load("assets/img/space_dark.jpg")
const backgroundTextureLight = new THREE.TextureLoader().load("assets/img/space_light.jpg")
scene.background = backgroundTextureDark

const arcadeGroup = new THREE.Group()
const cameraGroup = new THREE.Group()

const camera = new THREE.PerspectiveCamera(45, document.querySelector("#arcade").clientWidth / window.innerHeight, 0.1, 20000)
camera.position.set(350, 400, 0)
cameraGroup.add(camera)

const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#arcade'), antialias: true})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(document.querySelector("#about").clientWidth, window.innerHeight)


// Postprocessing
const composer = new EffectComposer(renderer)
const renderPass = new RenderPass(scene, camera)
const bloomPass = new UnrealBloomPass()
composer.addPass(renderPass)
composer.addPass(bloomPass)


// Lighting
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(350, 400, 0)
pointLight.intensity = 0.3
scene.add(pointLight)

const ambientLight = new THREE.AmbientLight(0xffffff)
ambientLight.intensity = 0.1
scene.add(ambientLight)


//Skydome
const skydomeTextureDark = new THREE.TextureLoader().load("assets/img/space_dark.jpg")
skydomeTextureDark.wrapS = THREE.RepeatWrapping
skydomeTextureDark.wrapT = THREE.RepeatWrapping
skydomeTextureDark.repeat.set(10, 11)

const skydomeTextureLight = new THREE.TextureLoader().load("assets/img/space_light.jpg")
skydomeTextureLight.wrapS = THREE.RepeatWrapping
skydomeTextureLight.wrapT = THREE.RepeatWrapping
skydomeTextureLight.repeat.set(5, 5)

const skydomeGeometry = new THREE.SphereGeometry(10000,32,32)

const skydomeMaterial = new THREE.MeshBasicMaterial({ map: skydomeTextureDark })
skydomeMaterial.side = THREE.DoubleSide

const skydome = new THREE.Mesh(skydomeGeometry, skydomeMaterial)

cameraGroup.add(skydome)
scene.add(cameraGroup)

function updateSkydome() {
    if(darkmode == true) {
        scene.background = backgroundTextureDark
        skydome.material.map = skydomeTextureDark
        ambientLight.color.set(0xffffff)
        ambientLight.intensity = 0.1
        
    }
    else {
        scene.background = backgroundTextureLight
        skydome.material.map = skydomeTextureLight
        ambientLight.color.set(0xffa500)
        ambientLight.intensity = 0.5
    }
}

export {updateSkydome}

// Screen
const screenTexture = new THREE.CanvasTexture(document.querySelector("#game"))
screenTexture.needsUpdate = true

const screenGeometry = new THREE.PlaneGeometry(170, 130)

const screenMaterial = new THREE.MeshStandardMaterial({ map: screenTexture, emissive: screenTexture})
screenMaterial.needsUpdate = true

const screen = new THREE.Mesh(screenGeometry, screenMaterial)
screen.position.set(20, 398, 0)
screen.rotation.set(degToRad(90), degToRad(108), degToRad(-90))

arcadeGroup.add(screen)

/*
//Screen emissive
const screenEmissiveMaterial = new THREE.MeshStandardMaterial({ map: screenTexture, emissive: "red"})
screenEmissiveMaterial.needsUpdate = true
const screenEmissive = new THREE.Mesh(screenGeometry, screenEmissiveMaterial)
screenEmissive.position.set(20, 398, 0)
screenEmissive.rotation.set(degToRad(90), degToRad(108), degToRad(-90))
arcadeGroup.add(screenEmissive)
*/


// load Arcade gltf model
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
function updateSize() {
    camera.aspect = document.querySelector("#arcade").clientWidth / window.innerHeight
    renderer.setSize(document.querySelector("#arcade").clientWidth, window.innerHeight)
    camera.updateProjectionMatrix();
}

window.onresize = updateSize

const orbControls = new OrbitControls(camera, renderer.domElement)
orbControls.enabled = false


// animation
function animation() {
    requestAnimationFrame(animation)
    screenTexture.needsUpdate = true
    screenMaterial.needsUpdate = true
    camera.lookAt(screen.position)
    composer.render()
}


// spin controls
let spinning = false
let mouseX
let rotationSpeed = 0


document.querySelector("#arcade").addEventListener("pointerdown", function (event) {
    spinning = true
    mouseX = event.clientX
    console.log(arcadeGroup)

})

document.querySelector("#arcade").addEventListener("pointermove", function (event) {
    if(spinning) {
        rotationSpeed = (event.clientX - mouseX) / 1000 
        arcadeGroup.rotation.y += rotationSpeed
        mouseX = event.clientX
        console.log(darkmode)
    }
})

document.querySelector("#arcade").addEventListener("pointerup", function (event) {
    let fade = 0.0007
    let cutoff = fade + 0.0005
    spinning = false
    let interval = window.setInterval(function() {
        if(rotationSpeed < cutoff && rotationSpeed > -cutoff) {
            rotationSpeed = 0
            window.clearInterval(interval)
            return
            }
        if(rotationSpeed > 0) rotationSpeed -= fade
        if(rotationSpeed < 0) rotationSpeed += fade
        arcadeGroup.rotation.y += rotationSpeed
    
        }, 10)
        console.log(arcadeGroup)
})
