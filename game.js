import "/style.css"

var canvas = document.querySelector("#game")
var ctx = canvas.getContext("2d")
ctx.fillStyle = "#FFFFFF"
ctx.fillRect(50 , 0, 130, 150)

let controls = []

function keydown(key){
    if(key["key"]==" ") {
        key.preventDefault();
    }
    controls.add(key["key"])
}

function animate() {
    requestAnimationFrame(animate)
    console.log(controls)
}

document.body.onkeydown = keydown
