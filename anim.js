import "/style.css"
import * as THREE from "three"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"

//import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"


const description = document.querySelector("#description")

const descriptions = ["developer.","gamer.","student.", "tech enthusiast."]

function startAnim(){
    let delay = 135 //in ms
    let deleting = true
    let i = 0 //word index  
    let i2 = 0 //char index
    window.setInterval(function() {
        //if word is deleted, but still in deletion mode, switch to adding mode and go to next word
        if(description.innerHTML.length == 0 && deleting == true) {
            i++
            //if at end of array, go back to start
            if(i == descriptions.length) {
                i = 0
            }
            deleting = false
        }
        // add next char if not deleting
        else if(deleting == false) {
            //If word is fully printed, start deleting instead and reset char index 
            if(description.innerHTML.length == descriptions[i].length) {
                deleting = true
                i2 = 0
            }
            // add next char and increment char index
            else {
                description.innerHTML += descriptions[i][i2]
                i2 ++
            }
        }
        //remove last char if deleting 
        else if(deleting == true) {
            description.innerHTML = description.innerHTML.slice(0,-1)
        }
    }, delay)
}


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

function scrollProgress() {
    return ((document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight))
}


window.addEventListener("scroll", function() {
    this.document.body.style.setProperty("--scroll-progress", scrollProgress())
})

// returns an inbetween value, between end and start value given the progress as a float between 0 and 1
function getInbetween(start, end, progress){
    return (end * progress) + (start * (1-progress))
}

startAnim()