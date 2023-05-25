import '/style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const obeserver = new IntersectionObserver((elements) => {
    elements.forEach((element) => {
        console.log(element)
        if (element.isIntersecting) {
            element.target.classList.add("shown")
        } 
        else {
            element.target.classList.remove("shown")
        }
    })
})

const hidden_elements = document.querySelectorAll(".hidden")
hidden_elements.forEach((el) => obeserver.observe(el))


/*
let darkmode = true

function switchMode() {
    root = document.querySelector(":root")
    if(darkmode==true) {
        darkmode = false
        root.style.setProperty("--bg-color-main", "#ffffff")
        root.style.setProperty(" --bg-color-secondary", "#b8b8b8")
        root.style.setProperty("--font-color-main", "#090000")
        root.style.setProperty("--font-color-secondary", "#656565")
        root.style.setProperty("--inverse-border-color", "#000000")
    }
    else {
        darkmode= true
        root.style.setProperty("--bg-color-main", "#0a000c")
        root.style.setProperty(" --bg-color-secondary", "#090a10")
        root.style.setProperty("--font-color-main", "#ffffff")
        root.style.setProperty("--font-color-secondary", "#484848")
        root.style.setProperty("--inverse-border-color", "#ffffff")
    }
}

*/