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
    this.acceptedInputs = ["arrowup", "arrowdown", "arrowleft", "arrowright", " ", "e", "q", "f", "x", "enter"]

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
    this.currentAmmo = 25
    this.unlimitedAmmo = false
    this.ammoTimer = 0
    this.ammoInterval = 400 // in ms
    this.shotSpeed = 3
    this.projectileWidth = 100
    this.projectileHeight = 30
    this.damage = 25
    this.health = 100
    this.invincible = false
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
    ctx.fillStyle = "blue"
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }

  shoot() {
    if (this.currentAmmo > 0 && this.shotTimer >= this.shotInterval) {
      if(this.unlimitedAmmo == false) this.currentAmmo --
      this.game.playerProjectiles.push(new Projectile(this.game, this.x + this.width, this.y + this.height / 2, this.projectileWidth, this.projectileHeight, this.shotSpeed, this.damage))
      this.shotTimer = 0
    }
  }

  takeDamage(damage) {
  if(this.invincible == false) this.health -= damage
  if(this.health <= 0 && this.game.gameState == "ingame") {
    this.game.gameState = "gameover"
    this.game.endTime = this.game.gameTime
    this.unlimitedAmmo = true
    this.game.collectedPowerups = []
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
    this.ammo = randomInt(10,3)
    this.shotTimer = 1000
    this.shotInterval = randomInt(1000,250) // in ms
    this.shotSpeed = this.speedX * this.speedMultiplier - 0.35
    this.projectileWidth = 100
    this.projectileHeight = 30
    this.damage = randomInt(30,15)
    this.health = randomInt(200,50)
    this.dropchance = 0.1
    this.markedForDeletion = false
    this.score = 20
  }
  
  update(deltaTime) {
    this.x += this.speedX * this.speedMultiplier * deltaTime
    if (this.x + this.width < 0) this.markedForDeletion = true
    this.shotTimer += deltaTime
    if (this.shotTimer >= this.shotInterval) {
      this.shoot()
      this.shotTimer = 0
    }
    if(this.health <= 0) {
      this.destory()
    }
  }

  draw(ctx) {
    ctx.fillStyle = "red"
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
  
  shoot() {
    if(this.shooting && this.ammo > 0) {
      this.game.enemyProjectiles.push(new Projectile(this.game, this.x - this.projectileWidth - 0.1, this.y + this.height / 2, this.projectileWidth, this.projectileHeight, this.shotSpeed, this.projectileDamage))
      this.ammo --
    }
  }

  destory() {
    this.markedForDeletion = true
    game.score += this.score
    if(Math.random() <= this.dropchance) {
      this.game.powerups.push(this.game.randomPowerup(this.game, this.x, this.y, 50, 50))
    }
  }
}

class Ship extends Enemy {
  constructor(game, shooting) {
    super(game, shooting)
    this.height = 190
    this.width = 120
    this.speedMultiplier = Math.random() * 2 + 0.15
    this.shotSpeed = this.speedX * this.speedMultiplier - 0.25
    this.projectileDamage = randomInt(30,15)
    this.collisionDamage = randomInt(45,35)
    this.health = randomInt(125,75)
    this.dropchance = 0.2  
    this.score = 20
  }
}

class Speeder extends Enemy {
  constructor(game, shooting) {
    super(game, shooting)
    this.height = 100
    this.width = 200
    this.speedMultiplier = (Math.random() + 0.35) * 3
    this.shotSpeed = this.speedX * this.speedMultiplier - 0.25
    this.projectileDamage = randomInt(20,10)
    this.collisionDamage = randomInt(30,15)
    this.health = randomInt(50,25)
    this.dropchance = 0.5
    this.score = 40
  }
}

class Tank extends Enemy {
  constructor(game, shooting) {
    super(game, shooting)
    this.height = 250
    this.width = 250
    this.speedMultiplier = Math.random() + 0.01
    this.shotSpeed = this.speedX * this.speedMultiplier - 0.25
    this.projectileDamage = randomInt(75,50)
    this.collisionDamage = randomInt(100,80)
    this.health = randomInt(200,125)
    this.dropchance = 0.35
    this.score = 30
  }
}


class Projectile {
  constructor(game, x, y, width, height, speed, damage) {
    this.game = game
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.speedX = speed
    this.damage = damage
    this.markedForDeletion = false
  }

  update(deltaTime) {
    this.x += this.speedX * deltaTime
    if (this.x + this.width < 0 || this.x - this.width > 1700 ) this.markedForDeletion = true
  }

  draw(ctx) {
    ctx.fillStyle = "yellow"
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}

class BouncingProjectile extends Projectile {
  constructor(game, x, y, width, height, speed, damage) {
  }

  update(deltaTime) {

  }
}



class Particle {

}

class Layer {

}

class Background {

}

class Powerup {
  constructor(game, x, y, width, height, color) {
    this.game = game
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.speed = -1
    this.color = color
    this.durationTimer = 0
    this.duration = 1000
    this.pickedUp = false
    this.activated = false
    this.markedForDeletion = false
    this.slot = 0
  }
  update(deltaTime) {
    if(this.pickedUp == false){ 
      this.x += this.speed * deltaTime
      if (this.x + this.width < 0 || this.x - this.width > 1700 ) this.markedForDeletion = true
    }
    if(this.game.currentInputs.includes("e") && this.pickedUp == true && this.activated != true && this.slot == 2) this.startEffect()
    else if(this.game.currentInputs.includes("q") && this.pickedUp == true && this.activated != true && this.slot == 1) this.startEffect()
    if(this.activated == true) {
      this.durationTimer += deltaTime
      if (this.durationTimer >= this.duration){
      this.endEffect()
      }
    }

  }

  draw(ctx) {
    ctx.fillStyle = this.color
    if(this.pickedUp == true) {
      if(this.slot == 1) ctx.fillRect(70, 250, 50, 50)
      if(this.slot == 2) ctx.fillRect(170, 250, 50, 50)
    }
    else if(this.activated == false){
      ctx.fillRect(this.x, this.y, this.height, this.width)
    }
  }

  onPickup() {
    this.pickedUp = true
  }
  
  startEffect() {
    this.activated = true
  }
  
  endEffect() {
    this.markedForDeletion = true
  }
}

class InvincibilityPowerup extends Powerup {
  constructor(game, x, y, width, height) {
    super(game, x, y, width, height, "purple")
    this.duration = 2500
  }
  startEffect() {
    super.startEffect()
    this.game.player.invincible = true
  }
  endEffect() {
    super.endEffect()
    this.game.player.invincible = false
  }
}
class AmmoPowerup extends Powerup {
  constructor(game, x, y, width, height) {
    super(game, x, y, width, height, "orange")
    this.duration = 5000
  }
  startEffect() {
    super.startEffect()
    this.game.player.unlimitedAmmo = true
  }
  endEffect() {
    super.endEffect()
    this.game.player.unlimitedAmmo = false
  }
}

class DamagePowerup extends Powerup {
  constructor(game, x, y, width, height) {
    super(game, x, y, width, height, "red")
    this.duration = 7500
  }
  startEffect() {
    super.startEffect()
    this.game.player.damage *= 2
  }
  endEffect() {
    super.endEffect()
    this.game.player.unlimitedAmmo /= 2
  }
}

class SpeedPowerup extends Powerup {
  constructor(game, x, y, width, height) {
    super(game, x, y, width, height, "blue")
    this.duration = 10000
  }
  startEffect() {
    super.startEffect()
    this.game.player.speedMultiplier = 2
  }
  endEffect() {
    super.endEffect()
    this.game.player.speedMultiplier = 1
  }
}

class HealthPowerup extends Powerup {
  constructor(game, x, y, width, height) {
    super(game, x, y, width, height, "green")
    this.duration = 0
  }
  startEffect() {
    super.startEffect()
    this.game.player.health += 50
  }
}

class UI {
  constructor(game) {
    this.game = game
    this.fontSize = 100
    this.fontFamily = "dashhorizon"
    this.color = "white"
    this.blinking = false
    this.blinkTimer = 0
    this.blinkTimerInterval = 700
    this.visible = true
  }
  update(deltaTime) {
    this.fps = Math.round(1000/deltaTime)
    if (this.blinking) {
      this.blinkTimer += deltaTime
      if (this.blinkTimer >= this.blinkTimerInterval) {
        this.blinkTimer = 0
        if (this.visible == false) this.visible = true
        else this.visible = false
      }
    }
  }
  draw(ctx) {
    ctx.fillStyle = this.color
    ctx.font = this.fontSize + "px " + this.fontFamily
    if (this.game.currentInputs.includes("f")) ctx.fillText("FPS: " + this.fps, 70, 1220)
  }
}

class MainMenuUI extends UI {
  constructor(game) {
    super(game)
    this.fontSize = 150
    this.fontFamily = "dashhorizon"
    this.color = "white"
    this.blinking = true
  }
  update(deltaTime) {
    super.update(deltaTime)
    if(this.game.currentInputs.includes("enter")) {
      this.game.gameState = "ingame"
      this.game.player.unlimitedAmmo = false
      this.game.gameTime = 0
    }
  }
  draw(ctx) {
    ctx.font = "200px " + this.fontFamily
    ctx.fillStyle = "yellow"
    ctx.fillText("Space Shooter", 350, 300)
    super.draw(ctx)
    if (this.visible == true) {
    ctx.fillText("Press Enter to Start", 300, 1100)
    }
  }
}

class IngameUI extends UI {
  constructor(game) {
    super(game)
    this.fontSize = 100
    this.fontFamily = "dashhorizon"
    this.color = "white"
  }
  update(deltaTime) {
    super.update(deltaTime)
  }
  draw(ctx) {
    super.draw(ctx)
    ctx.fillText("Health: " + Math.ceil(game.player.health), 50, 100)
    ctx.fillText("Ammo: " + game.player.currentAmmo, 50, 200)
    ctx.fillText("Time: " + Math.round(game.gameTime/1000) + "s", 1150, 100)
    ctx.fillText("Score: " + game.score, 1150, 200)
  }
}

class GameOverUI extends UI {
  constructor(game) {
    super(game)
    this.fontSize = 150
    this.fontFamily = "dashhorizon"
    this.color = "white"
    this.blinking = true
  }
  update(deltaTime) {
    super.update(deltaTime)
    if(this.game.currentInputs.includes("enter")) {
      startNewGame()
    }
  }
  draw(ctx) {
    ctx.font = "250px " + this.fontFamily
    ctx.fillStyle = "red"
    ctx.fillText("Game Over", 400, 300)
    super.draw(ctx)
    ctx.fillText("Score: " + this.game.score, 450, 600)
    ctx.fillText("Time: " + Math.round(this.game.endTime / 1000) + "s", 450, 750)
    if (this.visible == true) {
    ctx.fillStyle = "white"
    ctx.fillText("Press Enter to Restart", 250, 1100)
    }
  }
}

class Game {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.gameTime = 0 // in ms
    this.endTime = 0
    this.score = 0
    this.gameState = "mainmenu"
    this.inputhandler = new InputHandler(this)
    this.player = new Player(this)
    this.mainMenuUI = new MainMenuUI(this)
    this.ingameUI = new IngameUI(this)
    this.gameOverUI = new GameOverUI(this)
    this.currentInputs = []
    this.playerProjectiles = []
    this.enemySpawnTimer = 0
    this.enemySpawnInterval = 2000 // startvalue, only in ms if spawnAcceleration is 1
    this.spawnAcceleration = 1
    this.spawnAccelerationTimer = 0
    this.spawnAccelerationInterval = 20000 // in ms
    this.enemies = []
    this.enemyProjectiles = []
    this.powerups = []
    this.collectedPowerups = []
    this.player.unlimitedAmmo = true
  }
  update(deltaTime) {
    this.gameTime += deltaTime
    this.player.update(deltaTime)
    // player projectiles
    this.playerProjectiles.forEach(projectile => {
      projectile.update(deltaTime)
      this.enemies.forEach(enemy => {
        if (this.checkCollision(projectile, enemy)) {
          projectile.markedForDeletion = true
          enemy.health -= projectile.damage
          }
        })
      if (projectile.markedForDeletion) {
        this.playerProjectiles.splice(this.playerProjectiles.indexOf(projectile), 1)
      }
    })

    if(this.currentInputs.includes("x")) this.powerups.push(this.randomPowerup(this, 1700, randomInt(1700,0), 50, 50))

    if (this.gameState == "mainmenu") {
      this.mainMenuUI.update(deltaTime)
    }

    else if (this.gameState == "ingame") {
      this.ingameUI.update(deltaTime)
      this.spawnAccelerationTimer += deltaTime
      if (this.spawnAccelerationTimer >= this.spawnAccelerationInterval) {
        this.spawnAcceleration *= 1.1
        this.spawnAccelerationTimer = 0
        console.log(this.spawnAcceleration)
      }
  
      //enemies
      this.enemySpawnTimer += deltaTime * this.spawnAcceleration
      if (this.enemySpawnTimer >= this.enemySpawnInterval) {
        this.enemies.push(this.randomEnemy(this, chance(0.3)))
        this.enemySpawnTimer = 0
      }
      this.enemies.forEach(enemy => {
        enemy.update(deltaTime)
        if (this.checkCollision(enemy, this.player)) {
          this.player.takeDamage(enemy.collisionDamage)
          enemy.markedForDeletion = true
        }
        if (enemy.markedForDeletion) {
          this.enemies.splice(this.enemies.indexOf(enemy), 1)
        }
      })
  
      //enemy projectiles
      this.enemyProjectiles.forEach(projectile => {
        projectile.update(deltaTime)
        if(this.checkCollision(projectile, this.player)) {
          this.player.takeDamage(projectile.damage)
          projectile.markedForDeletion = true
        }
        if (projectile.markedForDeletion) {
          this.enemyProjectiles.splice(this.enemyProjectiles.indexOf(projectile), 1)
        }
      })

      //powerups
      this.powerups.forEach(powerup => {
        powerup.update(deltaTime)
        if(this.checkCollision(powerup, this.player)) {
          if(this.collectedPowerups.length <= 1) {
            if(this.collectedPowerups.length == 0) powerup.slot = 1
            else powerup.slot = 2
            powerup.onPickup()
            this.collectedPowerups.push(powerup)
            this.powerups.splice(this.powerups.indexOf(powerup), 1)
          }
        }
        if(powerup.markedForDeletion == true) {
          this.powerups.splice(this.powerups.indexOf(powerup), 1)
        }
      })

      this.collectedPowerups.forEach(powerup => {
        powerup.update(deltaTime)
        if(this.collectedPowerups.length == 1) powerup.slot = 1
        if(powerup.markedForDeletion == true) {
          this.collectedPowerups.splice(this.collectedPowerups.indexOf(powerup), 1)
        }
      })
    }

    else if (this.gameState == "gameover") {
      this.gameOverUI.update(deltaTime)
      this.enemies = []
    }
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
    
    this.powerups.forEach(powerup => {
      powerup.draw(ctx)
    })
    
    this.collectedPowerups.forEach(powerup => {
      powerup.draw(ctx)
    })

    if (this.gameState == "mainmenu") {
      this.mainMenuUI.draw(ctx)
    }
    else if (this.gameState == "ingame") {
      this.ingameUI.draw(ctx)
    }
    else if (this.gameState == "gameover") {
      this.gameOverUI.draw(ctx)
    }
  }

  checkCollision(object1, object2) {
    return (object1.x < object2.x + object2.width &&
            object1.x + object1.width > object2.x &&
            object1.y < object2.y + object2.height &&
            object1.height + object1.y > object2.y)
  }

  randomEnemy(game, shooting) {
    let random = Math.random()
    if (random < 0.2) {
      return new Tank(game, shooting)
    } else if (random < 0.4) {
      return new Speeder(game, shooting)
    } else {
      return new Ship(game, shooting)
    }
  }

  randomPowerup(game, x, y, width, height) {
    let random = Math.random()
    if (random < 0.2) {
      return new InvincibilityPowerup(game, x, y, width, height)
    }
    else if (random < 0.4) {
      return new AmmoPowerup(game, x, y, width, height)
    }
    else if (random < 0.6) {
      return new DamagePowerup(game, x, y, width, height)
    }
    else if (random < 0.8) {
      return new HealthPowerup(game, x, y, width, height)
    }
    else return new SpeedPowerup(game, x, y, width, height)
  }
}

var game = new Game(canvas.width, canvas.height)

function startNewGame(){
  game = new Game(canvas.width, canvas.height)
}

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