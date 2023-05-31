import "/style.css"
import * as THREE from "three"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"

//import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

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


const description = document.querySelector("#description")

const descriptions = ["developer.","gamer.","student.","sussy baka."]

function startAnim(){
    let delay = 150 //in ms
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


const hidden_elements = document.querySelectorAll(".hidden")
hidden_elements.forEach((el) => obeserver.observe(el))


// returns current scroll progress for the entire site as a float between 0 and 1

function siteScrollProgress() {
    return ((document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight))
}

// returns current scroll progress for an element as a float between 0 and 1
function element_scroll_progress(selector) {
    let element = document.querySelector(selector)
    let element_space = element.offsetHeight / document.documentElement.scrollHeight
    let element_progress = siteScrollProgress() / element_space
    if(element_progress > 1) {
        element_progress = 1
    }

    return element_progress
}

window.addEventListener("scroll", function() {
    this.document.body.style.setProperty("--about-scroll-progress", element_scroll_progress("#about"))
})

// returns an inbetween value, between end and start value given the progress as a float between 0 and 1
function getInbetween(start, end, progress){
    return (end * progress) + (start * (1-progress))
}

startAnim()