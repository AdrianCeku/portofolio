import "/style.css"

const canvas = document.querySelector("#game")
const ctx = canvas.getContext("2d")

const size = 10
canvas.width = 170 * size
canvas.height = 130 * size

class inputHandler {
  
}

class Player {
  constructor(game) {
    this.game = game
    this.width = 120
    this.height = 190
    this.x = 0
    this.y = 0
    this.speedX = 0
    this.speedY = 0
  }
  update() {
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

class layer {

}

class background {

}

class powerup {

}
class Game {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.player = new Player(this)
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