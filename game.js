import "/style.css"

const canvas = document.querySelector("#game")
const ctx = canvas.getContext("2d")

canvas.width = 1700
canvas.height = 1300

window.addEventListener("load", function () {
class InputHandler {
  constructor(game) {
    this.game = game
    this.acceptedInputs = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " ", "e", "E"]

    window.addEventListener("keydown", event => {
      if ((this.acceptedInputs.includes(event.key)) && !(this.game.inputs.includes(event.key))) {
        this.game.inputs.push(event.key)
      }
      console.log(this.game.inputs)
      event.preventDefault()
    })

    window.addEventListener("keyup", event => {
      if (this.game.inputs.includes(event.key)) {
        this.game.inputs.splice(this.game.inputs.indexOf(event.key), 1)
      }
      console.log(this.game.inputs)
      }
    )
  }
}

class Player {
  constructor(game) {
    this.game = game
    this.height = 190
    this.width = 120
    this.x = 130
    this.y = 550
    this.speedX = 0
    this.speedY = 0
    this.speedMultiplier = 10
    this.padding = 50
  }
  update() {
    this.speedX = 0
    this.speedY = 0
      if (this.game.inputs.includes("ArrowUp") && this.y > 0) {
        this.speedY -= 1 * this.speedMultiplier
      }
      if (this.game.inputs.includes("ArrowDown") && this.y < canvas.height - (this.height + this.padding)) {
        this.speedY += 1 * this.speedMultiplier
      }
    
      if (this.game.inputs.includes("ArrowLeft") && this.x > 50) {
        this.speedX -= 1 * this.speedMultiplier
      }
      if (this.game.inputs.includes("ArrowRight") && this.x < canvas.width - (this.width + this.padding )) {
        this.speedX += 1 * this.speedMultiplier
      }
    

    this.y += this.speedY
    this.x += this.speedX
  }
  draw(ctx) {
    ctx.fillStyle = "red"
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}

class Enemy {
  
}

class Projectile {

}

class Particle {

}

class Layer {

}

class Background {

}

class Powerup {

}
class Game {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.player = new Player(this)
    this.inputhandler = new InputHandler(this)
    this.inputs = []
  }
  update() {
    this.player.update()
  }
  draw(ctx) {
    this.player.draw(ctx)
  }
}

const game = new Game(canvas.width, canvas.height)

game.draw(ctx)

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  game.update()
  game.draw(ctx)
  requestAnimationFrame(animate)
}

animate()

//closing brackets for "load" event listener
})