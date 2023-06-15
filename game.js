import "/style.css"

const canvas = document.querySelector("#game")
const ctx = canvas.getContext("2d")

canvas.width = 1700
canvas.height = 1300

var dashhorizon = new FontFace("dashhorizon", "url(assets/fonts/dashhorizon.otf)")
document.fonts.add(dashhorizon)

window.addEventListener("load", function () {
class InputHandler {
  constructor(game) {
    this.game = game
    this.acceptedInputs = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " ", "e", "E"]

    window.addEventListener("keydown", event => {
      if ((this.acceptedInputs.includes(event.key)) && !(this.game.inputs.includes(event.key))) {
        this.game.inputs.push(event.key)
        console.log(this.game.inputs)
      }
      event.preventDefault()
    })

    window.addEventListener("keyup", event => {
      if (this.game.inputs.includes(event.key)) {
        this.game.inputs.splice(this.game.inputs.indexOf(event.key), 1)
        console.log(this.game.inputs)
      }
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
    this.padding = 50
    this.speedX = 0
    this.speedY = 0
    this.speedMultiplier = 10
    this.attackspeed = 50
    this.timeSinceLastShot = 0
    this.minTimeBetweenShots = 1000
    this.maxAmmo = 25
    this.currentAmmo = 20
    this.ammoReplenishRate = 0.01
    this.shotSpeed = 20
    this.projectileWidth = 100
    this.projectileHeight = 30
    this.damage = 10
    this.health = 100
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

    if (this.game.inputs.includes(" ")) {
      this.game.player.shoot()
    }

    if(this.currentAmmo < this.maxAmmo) this.currentAmmo += this.ammoReplenishRate
    if(this.timeSinceLastShot < this.minTimeBetweenShots) this.timeSinceLastShot += this.attackspeed
    //console.log(this.currentAmmo)
    //console.log(this.timeSinceLastShot)
  }

  draw(ctx) {
    ctx.fillStyle = "red"
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }

  shoot() {
    if (this.currentAmmo > 1 && this.timeSinceLastShot >= 1000) {
      this.currentAmmo --
      this.game.playerProjectiles.push(new Projectile(this.game, this.x + this.width, this.y + this.height / 2, this.projectileWidth, this.projectileHeight, this.shotSpeed, this.damage))
      this.timeSinceLastShot = 0
    }
  }
}

class Enemy {
  constructor(game) {
  }
  
}

class Projectile {
  constructor(game, x, y, width, height, speed, damage) {
    this.game = game
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.speed = speed
    this.damage = damage
    this.markedForDeletion = false
  }

  update() {
    this.x += this.speed
    if (this.x < 0 || this.x > 1700 ) this.markedForDeletion = true
    console.log(this.game.playerProjectiles)
  }

  draw(ctx) {
    ctx.fillStyle = "blue"
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}

class Particle {

}

class Layer {

}

class Background {

}

class Powerup {

}

class UI {
  constructor(game) {
    this.game = game
  }

  update() {

  }

  draw(ctx) {
    ctx.fillStyle = "white"
    ctx.font = "100px dashhorizon"
    ctx.fillText("Health: " + Math.ceil(game.player.health), 50, 100)
    ctx.fillText("Ammo: " + Math.floor(game.player.currentAmmo), 50, 200)
    ctx.fillText("Score: " + game.score, 1150, 100)
  }
}
class Game {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.inputhandler = new InputHandler(this)
    this.player = new Player(this)
    this.ui = new UI(this)
    this.inputs = []
    this.playerProjectiles = []
    this.enemyProjectiles = []
    this.score = 0
  }
  update() {
    this.player.update()
    this.playerProjectiles.forEach(projectile => {
      projectile.update()
      if (projectile.markedForDeletion) {
        this.playerProjectiles.splice(this.playerProjectiles.indexOf(projectile), 1)
      }
    })
  }
  draw(ctx) {
    this.player.draw(ctx)
    this.playerProjectiles.forEach(projectile => {
      projectile.draw(ctx)
    })
    this.ui.draw(ctx)
  }
}

const game = new Game(canvas.width, canvas.height)

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  game.update()
  game.draw(ctx)
  requestAnimationFrame(animate)
}

animate()

//closing brackets for "load" event listener
})