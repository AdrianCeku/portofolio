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

// returns current scroll progress as a float between 0 and 1
function current_scroll_progress()
{
    return ((document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight));
}

// returns an inbetween value, between end and start value given the progress as a float between 0 and 1
function getInbetween(start, end, progress){
    return (end * progress) + (start * (1-progress))
}