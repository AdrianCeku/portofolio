import "/style.css"

const canvas = document.querySelector("#game")
const ctx = canvas.getContext("2d")

canvas.width = 1700
canvas.height = 1300

var dashhorizon = new FontFace("dashhorizon", "url(assets/fonts/dashhorizon.otf)")
document.fonts.add(dashhorizon)

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

function chance(percent) {
  if (Math.random() <= percent) {
    return true
  }
  else return false
}

window.addEventListener("load", function () {
class InputHandler {
  constructor(game) {
    this.game = game
    this.acceptedInputs = ["arrowup", "arrowdown", "arrowleft", "arrowright", " ", "e"]

    window.addEventListener("keydown", event => {
      if ((this.acceptedInputs.includes(event.key.toLowerCase())) && !(this.game.currentInputs.includes(event.key.toLowerCase()))) {
        this.game.currentInputs.push(event.key.toLowerCase())
      }
      event.preventDefault()
    })

    window.addEventListener("keyup", event => {
      if (this.game.currentInputs.includes(event.key.toLowerCase())) {
        this.game.currentInputs.splice(this.game.currentInputs.indexOf(event.key.toLowerCase()), 1)
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

    console.log(this.x + " " + this.y)
    if(this.currentAmmo < this.maxAmmo && this.ammoTimer < this.ammoInterval) this.ammoTimer += deltaTime
    if(this.ammoTimer >= this.ammoInterval) {
      this.currentAmmo ++
      this.ammoTimer = 0
    }
    if(this.shotTimer < this.shotInterval) this.shotTimer += deltaTime 
  }

  draw(ctx) {
    ctx.fillStyle = "blue"
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
  constructor(game, shooting) {
    this.game = game
    this.height = 190
    this.width = 120
    this.x = 1700
    this.y = randomInt(canvas.height - this.height, 0)
    this.speedX = -1
    this.speedMultiplier = Math.random() * 2 + 0.1
    this.shooting = shooting
    this.shotTimer = 0
    this.shotInterval = randomInt(1000,250) // in ms
    this.shotSpeed = this.speedX * this.speedMultiplier - 0.25
    this.projectileWidth = 100
    this.projectileHeight = 30
    this.damage = randomInt(30,15)
    this.health = randomInt(200,50)
    this.markedForDeletion = false

  }
  
  update(deltaTime) {
    this.x += this.speedX * this.speedMultiplier * deltaTime
    if (this.x + this.width < 0) this.markedForDeletion = true
    this.shotTimer += deltaTime
    if (this.shotTimer >= this.shotInterval) {
      this.shoot()
      this.shotTimer = 0
    }
  }

  draw(ctx) {
    ctx.fillStyle = "red"
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
  
  shoot() {
    if(this.shooting) {
      this.game.enemyProjectiles.push(new Projectile(this.game, this.x - this.projectileWidth - 0.1, this.y + this.height / 2, this.projectileWidth, this.projectileHeight, this.shotSpeed, this.damage))
    }
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
    if (this.x + this.width < 0 || this.x - this.width > 1700 ) this.markedForDeletion = true
  }

  draw(ctx) {
    ctx.fillStyle = "yellow"
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
    this.fontSize = 100
    this.fontFamily = "dashhorizon"
    this.color = "white"
  }

  draw(ctx) {
    ctx.fillStyle = this.color
    ctx.font = this.fontSize + "px " + this.fontFamily
    ctx.fillText("Health: " + Math.ceil(game.player.health), 50, 100)
    ctx.fillText("Ammo: " + game.player.currentAmmo, 50, 200)
    ctx.fillText("Time: " + Math.round(game.gameTime/1000) + "s", 1150, 100)
    ctx.fillText("Score: " + game.score, 1150, 200)
  }
}
class Game {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.gameTime = 0 // in ms
    this.score = 0
    this.inputhandler = new InputHandler(this)
    this.player = new Player(this)
    this.ui = new UI(this)
    this.currentInputs = []
    this.playerProjectiles = []
    this.enemySpawnTimer = 0
    this.enemySpawnInterval = 2000 // startvalue, only in ms if spawnAcceleration is 1
    this.spawnAcceleration = 1
    this.spawnAccelerationTimer = 0
    this.spawnAccelerationInterval = 20000 // in ms
    this.enemies = []
    this.enemyProjectiles = []
  }
  update(deltaTime) {
    this.gameTime += deltaTime
    this.player.update(deltaTime)

    this.spawnAccelerationTimer += deltaTime
    if (this.spawnAccelerationTimer >= this.spawnAccelerationInterval) {
      this.spawnAcceleration *= 1.1
      this.spawnAccelerationTimer = 0
      console.log(this.spawnAcceleration)
    }

    //player projectiles 
    this.playerProjectiles.forEach(projectile => {
      projectile.update(deltaTime)
      if (projectile.markedForDeletion) {
        this.playerProjectiles.splice(this.playerProjectiles.indexOf(projectile), 1)
      }
    })

    //enemies
    this.enemySpawnTimer += deltaTime * this.spawnAcceleration
    if (this.enemySpawnTimer >= this.enemySpawnInterval) {
      this.enemies.push(new Enemy(this, chance(0.3)))
      this.enemySpawnTimer = 0
    }
    this.enemies.forEach(enemy => {
      enemy.update(deltaTime)
      if (enemy.markedForDeletion) {
        this.enemies.splice(this.enemies.indexOf(enemy), 1)
      }
    })

    //enemy projectiles
    this.enemyProjectiles.forEach(projectile => {
      projectile.update(deltaTime)
      if (projectile.markedForDeletion) {
        this.enemyProjectiles.splice(this.enemyProjectiles.indexOf(projectile), 1)
      }
    })
  }

  draw(ctx) {
    this.player.draw(ctx)

    this.playerProjectiles.forEach(projectile => {
      projectile.draw(ctx)
    })

    this.enemies.forEach(enemy => {
      enemy.draw(ctx)
    })

    this.enemyProjectiles.forEach(projectile => {
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