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

const description = document.querySelector("#description")

const descriptions = ["developer.","gamer.","student.","hardware enthusiast."]

function startDescriptionsAnim(){
    let fill = false
    let word
    let i = 0
    let i2 = 0
    window.setInterval(function() {
        if(description.innerHTML.length == 0 && fill==true) {
            i = 0
            description.innerHTML = word[i]
            i++
        }
        else if(description.innerHTML.length != 0 && fill==true) {
            description.innerHTML += word[i]
            if(i==word.length-1) {
                fill=false
                i=0
            }
            else {
                i++
            }
        }
        else if(description.innerHTML.length == 0 && fill==false){
            if(i2==descriptions.length-1){
                i2 = 0
                word = descriptions[0]
            }
            else {
                word = descriptions[i2]
                i2 ++
            }
            fill = true
            
        }
        else if(description.innerHTML.length != 0 && fill==false) {
            description.innerHTML = description.innerHTML.slice(0,-1)
        }
    }, 300)
}

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

startDescriptionsAnim()