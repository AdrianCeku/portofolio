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
    this.acceptedInputs = ["arrowup", "arrowdown", "arrowleft", "arrowright", " ", "e"]

    window.addEventListener("keydown", event => {
      if ((this.acceptedInputs.includes(event.key.toLowerCase())) && !(this.game.currentInputs.includes(event.key.toLowerCase()))) {
        this.game.currentInputs.push(event.key.toLowerCase())
        console.log(this.game.currentInputs)
      }
      event.preventDefault()
    })

    window.addEventListener("keyup", event => {
      if (this.game.currentInputs.includes(event.key.toLowerCase())) {
        this.game.currentInputs.splice(this.game.currentInputs.indexOf(event.key.toLowerCase()), 1)
        console.log(this.game.currentInputs)
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
    this.speedMultiplier = 1
    this.attackspeed = 50
    this.shotTimer = 0
    this.shotInterval = 100 // in ms
    this.maxAmmo = 25
    this.currentAmmo = 20
    this.ammoTimer = 0
    this.ammoInterval = 750 // in ms
    this.shotSpeed = 3
    this.projectileWidth = 100
    this.projectileHeight = 30
    this.damage = 10
    this.health = 100
  }

  update(deltaTime) {
    this.speedX = 0
    this.speedY = 0
    if (this.game.currentInputs.includes("arrowup") && this.y > 0) {
      this.speedY -= 1 * this.speedMultiplier
    }
    if (this.game.currentInputs.includes("arrowdown") && this.y < canvas.height - (this.height + this.padding)) {
      this.speedY += 1 * this.speedMultiplier
    }
    if (this.game.currentInputs.includes("arrowleft") && this.x > 50) {
      this.speedX -= 1 * this.speedMultiplier
    }
    if (this.game.currentInputs.includes("arrowright") && this.x < canvas.width - (this.width + this.padding )) {
      this.speedX += 1 * this.speedMultiplier
    }
    
    this.y += this.speedY * deltaTime
    this.x += this.speedX * deltaTime

    if (this.game.currentInputs.includes(" ")) {
      this.game.player.shoot()
    }

    if(this.currentAmmo < this.maxAmmo && this.ammoTimer < this.ammoInterval) this.ammoTimer += deltaTime
    if(this.ammoTimer >= this.ammoInterval) {
      this.currentAmmo ++
      this.ammoTimer = 0
    }
    if(this.shotTimer < this.shotInterval) this.shotTimer += deltaTime 
  }

  draw(ctx) {
    ctx.fillStyle = "red"
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }

  shoot() {
    if (this.currentAmmo > 0 && this.shotTimer >= this.shotInterval) {
      this.currentAmmo --
      this.game.playerProjectiles.push(new Projectile(this.game, this.x + this.width, this.y + this.height / 2, this.projectileWidth, this.projectileHeight, this.shotSpeed, this.damage))
      this.shotTimer = 0
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

  update(deltaTime) {
    this.x += this.speed * deltaTime
    if (this.x < 0 || this.x > 1700 ) this.markedForDeletion = true
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
    ctx.fillText("Ammo: " + game.player.currentAmmo, 50, 200)
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
    this.currentInputs = []
    this.playerProjectiles = []
    this.enemyProjectiles = []
    this.score = 0
  }
  update(deltaTime) {
    this.player.update(deltaTime)
    this.playerProjectiles.forEach(projectile => {
      projectile.update(deltaTime)
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

let lastTime = 0
function animate(timeStamp) {
  const deltaTime = timeStamp - lastTime
  lastTime = timeStamp
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  game.update(deltaTime)
  game.draw(ctx)
  requestAnimationFrame(animate)
}

animate(0)

//closing brackets for "load" event listener
})