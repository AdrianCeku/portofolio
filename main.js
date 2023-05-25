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