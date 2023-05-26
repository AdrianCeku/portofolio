import "/style.css"

var canvas = document.querySelector("#game")
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#FF0000";
ctx.fillRect(0, 0, 75, 75);

function keydown(key){
    if(key["key"]=="e") {
        console.log("e pressed")
    }
}

document.body.onkeydown = keydown