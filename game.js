import "/style.css"

const canvas = document.querySelector("#game")
const ctx = canvas.getContext("2d")

ctx.imageSmoothingEnabled = false

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

//assets

const playerSprite = new Image()
playerSprite.src = "assets/game/player.png"

const enemyShipSprite = new Image()
enemyShipSprite.src = "assets/game/enemy_ship.png"

const enemyTankSprite = new Image()
enemyTankSprite.src = "assets/game/enemy_tank.png"

const enemySpeederSprite = new Image()
enemySpeederSprite.src = "assets/game/enemy_Speeder.png"

const enemyBossSprite = new Image()
enemyBossSprite.src = "assets/game/enemy_boss.png"

const playerProjectileSprite = new Image()
playerProjectileSprite.src = "assets/game/player_projectile.png"

const enemyProjectileSprite = new Image()
enemyProjectileSprite.src = "assets/game/enemy_projectile.png"

const powerupInvincibleSprite = new Image()
powerupInvincibleSprite.src = "assets/game/powerup_invincible.png"

const powerupBulletSprite = new Image()
powerupBulletSprite.src = "assets/game/powerup_bullets.png"

const powerupAmmoSprite = new Image()
powerupAmmoSprite.src = "assets/game/powerup_ammo.png"

const powerupHealthSprite = new Image()
powerupHealthSprite.src = "assets/game/powerup_health.png"

const powerupDamageSprite = new Image()
powerupDamageSprite.src = "assets/game/powerup_damage.png"

const powerupSpeedSprite = new Image()
powerupSpeedSprite.src = "assets/game/powerup_speed.png"

const alienPlanet1Sprite = new Image()
alienPlanet1Sprite.src = "assets/game/alien_planet_1.png"

const alienPlanet2Sprite = new Image()
alienPlanet2Sprite.src = "assets/game/alien_planet_2.png"

const bluePlanet1Sprite = new Image()
bluePlanet1Sprite.src = "assets/game/blue_planet_1.png"

const bluePlanet2Sprite = new Image()
bluePlanet2Sprite.src = "assets/game/blue_planet_2.png"

const redPlanet1Sprite = new Image()
redPlanet1Sprite.src = "assets/game/red_planet_1.png"

const redPlanet2Sprite = new Image()
redPlanet2Sprite.src = "assets/game/red_planet_2.png"

const icePlanet1Sprite = new Image()
icePlanet1Sprite.src = "assets/game/ice_planet_1.png"

const icePlanet2Sprite = new Image()
icePlanet2Sprite.src = "assets/game/ice_planet_2.png"

const lavaPlanet1Sprite = new Image()
lavaPlanet1Sprite.src = "assets/game/lava_planet_1.png"

const lavaPlanet2Sprite = new Image()
lavaPlanet2Sprite.src = "assets/game/lava_planet_2.png"

const ringedPlanet1Sprite = new Image()
ringedPlanet1Sprite.src = "assets/game/ringed_planet_1.gif"

const ringedPlanet2Sprite = new Image()
ringedPlanet2Sprite.src = "assets/game/ringed_planet_2.gif"

const gasGiant1Sprite = new Image()
gasGiant1Sprite.src = "assets/game/gas_giant_1.png"

const gasGiant2Sprite = new Image()
gasGiant2Sprite.src = "assets/game/gas_giant_2.png"

const galaxyBlueSprite = new Image()
galaxyBlueSprite.src = "assets/game/galaxy_blue.gif"

const galaxyGoldSprite = new Image()
galaxyGoldSprite.src = "assets/game/galaxy_gold.gif"

const galaxyGreenSprite = new Image()
galaxyGreenSprite.src = "assets/game/galaxy_green.gif"

const galaxyPinkSprite = new Image()
galaxyPinkSprite.src = "assets/game/galaxy_pink.gif"

const blackholeSprite = new Image()
blackholeSprite.src = "assets/game/black_hole.gif"

const starSprite = new Image()
starSprite.src = "assets/game/star.gif"

const asteroid1Sprite = new Image()
asteroid1Sprite.src = "assets/game/asteroid_1.png"

const asteroid2Sprite = new Image()
asteroid2Sprite.src = "assets/game/asteroid_2.png"

const asteroid3Sprite = new Image()
asteroid3Sprite.src = "assets/game/asteroid_3.png"

const asteroid4Sprite = new Image()
asteroid4Sprite.src = "assets/game/asteroid_4.png"

const asteroid5Sprite = new Image()
asteroid5Sprite.src = "assets/game/asteroid_5.png"

const asteroid6Sprite = new Image()
asteroid6Sprite.src = "assets/game/asteroid_6.png"

const asteroid7Sprite = new Image()
asteroid7Sprite.src = "assets/game/asteroid_7.png"

const asteroid8Sprite = new Image()
asteroid8Sprite.src = "assets/game/asteroid_8.png"

const asteroid9Sprite = new Image()
asteroid9Sprite.src = "assets/game/asteroid_9.png"

const asteroid10Sprite = new Image()
asteroid10Sprite.src = "assets/game/asteroid_10.png"

const cloudsSprite = new Image()
cloudsSprite.src = "assets/game/bg_clouds.png"


window.addEventListener("load", function () {
class InputHandler {
  constructor(game) {
    this.game = game
    this.acceptedInputs = ["arrowup", "arrowdown", "arrowleft", "arrowright","w","a","s","d", " ", "e", "q", "f", "x", "enter"]

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
    this.height = 120
    this.width = 190
    this.x = 130
    this.y = 550
    this.padding = 50
    this.speedX = 0
    this.speedY = 0
    this.speedMultiplier = 1.3
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
    this.invincible = true
    this.bouncingBullets = false
  }

  update(deltaTime) {
    this.speedX = 0
    this.speedY = 0
    if ((this.game.currentInputs.includes("arrowup") || this.game.currentInputs.includes("w")) && this.y > 0) {
      this.speedY -= 1 * this.speedMultiplier
    }
    if ((this.game.currentInputs.includes("arrowdown") || this.game.currentInputs.includes("s")) && this.y < canvas.height - (this.height + this.padding)) {
      this.speedY += 1 * this.speedMultiplier
    }
    if ((this.game.currentInputs.includes("arrowleft") || this.game.currentInputs.includes("a")) && this.x > 50) {
      this.speedX -= 1 * this.speedMultiplier
    }
    if ((this.game.currentInputs.includes("arrowright") || this.game.currentInputs.includes("d")) && this.x < canvas.width - (this.width + this.padding )) {
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
    if(this.game.currentInputs.includes("f")) {
      ctx.fillStyle = "blue"
      ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    ctx.drawImage(playerSprite, this.x, this.y, this.width, this.height)
  }

  shoot() {
    if (this.currentAmmo > 0 && this.shotTimer >= this.shotInterval) {
      if(this.unlimitedAmmo == false) this.currentAmmo --
      this.game.playerProjectiles.push(new Projectile(this.game, this.x + this.width, this.y + this.height / 2, this.projectileWidth, this.projectileHeight, this.shotSpeed, this.damage, true))
      if(this.bouncingBullets == true) {
        this.game.playerProjectiles.push(new BouncingProjectile(this.game, this.x + this.width, this.y + this.height / 2, this.projectileWidth, this.projectileHeight, this.shotSpeed, this.damage, this.shotSpeed, true))
        this.game.playerProjectiles.push(new BouncingProjectile(this.game, this.x + this.width, this.y + this.height / 2, this.projectileWidth, this.projectileHeight, this.shotSpeed, this.damage, this.shotSpeed * -1, true))
      } 
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
    this.game.enemies = []
    this.game.playerProjectiles = []
    this.game.enemyProjectiles = []
    this.game.powerups = []
  }
  }
}

class Enemy {
  constructor(game, shooting) {
    this.game = game
    this.height = 190
    this.width = 120
    this.x = 1700
    this.y = randomInt(canvas.height - this.height-50, 0)
    this.speedX = -1
    this.speedMultiplier = Math.random() * 2 + 0.1
    this.shooting = shooting
    this.ammo = randomInt(10,3)
    this.shotTimer = 1000
    this.shotInterval = randomInt(1000,250) // in ms
    this.shotSpeed = this.speedX * this.speedMultiplier - 0.35
    this.projectileWidth = 70
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
  }

  draw(ctx) {
    if(this.game.currentInputs.includes("f")) {
      ctx.fillStyle = "red"
      ctx.fillRect(this.x, this.y, this.width, this.height)
    }
  }

  shoot() {
    if(this.shooting && this.ammo > 0) {
      this.game.enemyProjectiles.push(new Projectile(this.game, this.x - this.projectileWidth - 0.1, this.y + this.height / 2, this.projectileWidth, this.projectileHeight, this.shotSpeed, this.projectileDamage))
      this.ammo --
    }
  }

  takeDamage(damage) {
    this.health -= damage
    if(this.health <= 0) this.destory()
  }

  destory() {
    this.markedForDeletion = true
    game.score += this.score
    if(Math.random() <= this.dropchance) {
      this.game.powerups.push(this.game.randomPowerup(this.game, this.x, this.y, 100, 100))
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

  draw(ctx) {
    super.draw(ctx)
    ctx.drawImage(enemyShipSprite, this.x, this.y, this.width, this.height)
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

  draw(ctx) {
    super.draw(ctx)
    ctx.drawImage(enemySpeederSprite, this.x, this.y, this.width, this.height)
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
    this.collisionDamage = randomInt(99,75)
    this.health = randomInt(250,150)
    this.dropchance = 0.35
    this.score = 30
  }
  draw(ctx) {
    super.draw(ctx)
    ctx.drawImage(enemyTankSprite, this.x, this.y, this.width, this.height)
  }
}


class Projectile {
  constructor(game, x, y, width, height, speed, damage, playerProjectile = false) {
    this.game = game
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.speedX = speed
    this.damage = damage
    this.speedY  = this.game.player.shotSpeed
    this.playerProjectile = playerProjectile
    this.markedForDeletion = false
  }

  update(deltaTime) {
    this.x += this.speedX * deltaTime
    if (this.x + this.width < 0 || this.x - this.width > 1700 ) this.markedForDeletion = true
  }

  draw(ctx) {
    if(this.game.currentInputs.includes("f")) {
      ctx.fillStyle = "green"
      ctx.fillRect(this.x, this.y, this.width, this.height)
    } 
    if(this.playerProjectile) {
      ctx.drawImage(playerProjectileSprite, this.x, this.y, this.width, this.height)
    }
    else {
      ctx.drawImage(enemyProjectileSprite, this.x, this.y, this.width, this.height)
    }
  }
}

class BouncingProjectile extends Projectile {
  constructor(game, x, y, width, height, speed, damage, speedY, playerProjectile = false) {
    super(game, x, y, width, height, speed, damage, playerProjectile)
    this.padding = 50
    this.speedY = speedY
  }

  update(deltaTime) {
    super.update(deltaTime)
    this.y += this.speedY * deltaTime
    if (this.y + this.height + this.padding > canvas.height || this.y < 0 + this.padding) this.speedY *= -1
  }

}



class Particle {
  constructor(game, x, y, width, height, speedX, speedY, color, lifeTime) {
    this.game = game
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.speedX = speedX
    this.speedY = speedY
    this.color = color
    this.lifeTime = lifeTime
    this.markedForDeletion = false
  }

  update(deltaTime) {
    this.x += this.speedX * deltaTime
    this.y += this.speedY * deltaTime
    if (this.lifeTime <= 0) this.markedForDeletion = true
    else this.lifeTime -= deltaTime
  }

  draw(ctx) {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}

class Layer {
  constructor(game, sprite, speedMultiplier, width, height, sparkling = false, sparkleInterval = 500, sparkleSize = 5, sparkleColor = "white" ) {
    this.game = game  
    this.sprite = sprite
    this.speed = 1 
    this.speedMultiplier = speedMultiplier
    this.width = width
    this.height = height
    this.x = 1700
    this.y = randomInt(canvas.height - this.height, 0)
    this.markedForDeletion = false
    
  }
  
  update(deltaTime) {
    this.x -= this.speed * this.speedMultiplier * deltaTime
    if (this.x + this.width < 0) this.markedForDeletion = true
  }
  
  draw(ctx) {
    ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height)
  }
  
}

class SparklingLayer extends Layer {
  constructor(game, sprite, speedMultiplier, width, height, sparkling = true, sparkleInterval = 25, sparkleSize = 4, sparkleColor = "white" ) {
    super(game, sprite, speedMultiplier, width, height)
    this.sparkling = sparkling
    this.sparkleTimer = 0
    this.sparkleInterval = sparkleInterval
    this.sparkleSize = sparkleSize
    this.sparkleColor = sparkleColor
    this.layerParticles = []
    this.bg_color = false
  }

  update(deltaTime) {
    this.x -= this.speed * this.speedMultiplier * deltaTime
    if (this.x + this.width < 0) this.markedForDeletion = true
    if (this.sparkling){ 
      if (this.sparkleTimer >= this.sparkleInterval) {
        this.sparkleTimer = 0
        this.sparkle()
      }
      this.sparkleTimer += deltaTime
    }
    this.layerParticles.forEach(particle => {
      particle.update(deltaTime)
      if(particle.markedForDeletion) this.layerParticles.splice(this.layerParticles.indexOf(particle), 1)
    })
  }

  sparkle() {
    this.layerParticles.push(new Particle(this.game, randomInt(this.x,this.x - this.width), randomInt(this.y, this.y + this.height), this.sparkleSize, this.sparkleSize, 0, 0, this.sparkleColor, 5000))
  }
}

class BackgroundColor extends SparklingLayer {
  constructor(game, color) {
    super(game, null, 0, canvas.width, canvas.height, true)
    this.color = color
    this.x = 0
    this.y = 0
  }
  update(deltaTime) {
    super.update(deltaTime)
  }

  draw(ctx) {
    ctx.fillStyle = this.color
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  sparkle() {
    this.game.background.backgroundParticles.push(new Particle(this.game, randomInt(canvas.width, 0), randomInt(canvas.height, 0), this.sparkleSize, this.sparkleSize, 0, 0, this.sparkleColor, 500))
  }

}

class CloudLayer extends SparklingLayer {
  constructor(game, speedMultiplier, width, height, x) {
    super(game, cloudsSprite, speedMultiplier, width, height, false)
    this.x = x
  }

  update(deltaTime) {
    this.x -= this.speed * this.speedMultiplier * deltaTime
    if (this.x + this.width <= 0) this.x = 1700
    if (this.sparkling){ 
      if (this.sparkleTimer >= this.sparkleInterval) {
        this.sparkleTimer = 0
        this.sparkle()
      }
    this.sparkleTimer += deltaTime
    }
    this.layerParticles.forEach(particle => {
      particle.update(deltaTime)
      if(particle.markedForDeletion) this.layerParticles.splice(this.layerParticles.indexOf(particle), 1)
    })
  }

  draw(ctx) {
    super.draw(ctx)
    this.layerParticles.forEach(particle => particle.draw(ctx))
  }
}

class Background {
  constructor(game) {
    this.game = game
    this.layers = []
    this.backgroundLayers = [new CloudLayer(this.game, 0.02, 1700, 1300, 0), new CloudLayer(this.game, 0.02, 1700, 1300, 1700)]
    this.foregroundLayers = []
    this.backgroundColor = new BackgroundColor(this.game, "#141d27")
    this.backgroundParticles = []
    this.planetInterval = 25000
    this.starTimer = randomInt(900000, 0)
    this.starInterval = 100000
    this.galaxyTimer = randomInt(900000, 0)
    this.galaxyInterval = 100000
    this.asteroidTimer = 0
    this.asteroidInterval = 5000
    this.blackholeTimer = 0
    this.blackholeInterval = 100000
    this.planetSprites = [  alienPlanet1Sprite,
                            alienPlanet2Sprite,
                            bluePlanet1Sprite,
                            bluePlanet2Sprite,
                            redPlanet1Sprite,
                            redPlanet2Sprite,
                            icePlanet1Sprite,
                            icePlanet2Sprite,
                            lavaPlanet1Sprite,
                            lavaPlanet2Sprite,
                            gasGiant1Sprite,
                            gasGiant2Sprite
                      ]
    this.starSprites = [    starSprite]
    this.galaxySprites = [  galaxyBlueSprite,
                            galaxyGreenSprite,
                            galaxyGoldSprite,
                            galaxyPinkSprite]
    this.asteroidSprites = [asteroid1Sprite,
                            asteroid2Sprite,
                            asteroid3Sprite,
                            asteroid4Sprite,
                            asteroid5Sprite,
                            asteroid6Sprite,
                            asteroid7Sprite,
                            asteroid8Sprite,
                            asteroid9Sprite,
                            asteroid10Sprite
                            ]
    this.blackholeSprites = [blackholeSprite]
    let startingAsteroid = new Layer(this.game, this.asteroidSprites[randomInt(this.asteroidSprites.length - 1, 0)], 0.1, 200, 200)
    startingAsteroid.y = 200
    this.foregroundLayers.push(startingAsteroid)
  }

  update(deltaTime) {
    
    this.backgroundColor.update(deltaTime)
    this.backgroundLayers.forEach(layer => layer.update(deltaTime))
    this.backgroundParticles.forEach(particle => {
      particle.update(deltaTime)
      if(particle.markedForDeletion) this.backgroundParticles.splice(this.backgroundParticles.indexOf(particle), 1)
    })
    this.layers.forEach(layer => {
      layer.update(deltaTime)
      if (layer.markedForDeletion) this.layers.splice(this.layers.indexOf(layer), 1)
    })
    this.foregroundLayers.forEach(layer => {
      layer.update(deltaTime)
      if (layer.markedForDeletion) this.foregroundLayers.splice(this.foregroundLayers.indexOf(layer), 1)
    })
    this.planetTimer += deltaTime, this.starTimer+= deltaTime, this.galaxyTimer+= deltaTime, this.asteroidTimer+= deltaTime, this.blackholeTimer += deltaTime

    
    if(this.blackholeTimer > this.blackholeInterval) {
      let size = randomInt(200, 50)
      let distance = randomInt(50000, 10000)
      console.log("spawn blackhole")
      this.backgroundLayers.unshift(new Layer(this.game, this.blackholeSprites[randomInt(this.blackholeSprites.length - 1, 0)], size/distance + 0.0001, size, size))
      this.blackholeTimer = 0
    }
    if(this.galaxyTimer > this.galaxyInterval) {
      let size = randomInt(400, 200)
      let distance = randomInt(40000, 20000)
      console.log("spawn galaxy")
      this.backgroundLayers.unshift(new Layer(this.game, this.galaxySprites[randomInt(this.galaxySprites.length - 1, 0)], size/distance, size, size))
      this.galaxyTimer = 0
    }
    if(this.starTimer > this.starInterval) {
      let size = randomInt(500, 300)
      let distance = randomInt(15000, 10000)
      console.log("spawn star")
      this.layers.unshift(new Layer(this.game, this.starSprites[randomInt(this.starSprites.length - 1, 0)], size/distance, size, size))
      this.starTimer = 0
    }
    if(this.planetTimer > this.planetInterval) {
      let size = randomInt(700, 50)
      let distance = randomInt(8000, 5000)
      console.log("spawn planet")
      this.layers.push(new Layer(this.game, this.planetSprites[randomInt(this.planetSprites.length - 1, 0)], size/distance, size, size))
      this.planetTimer = 0
    }
    if(this.asteroidTimer > this.asteroidInterval) {
      let size = randomInt(200, 50)
      let distance = randomInt(1000, 100)
      console.log("spawn asteroid")
      if(Math.random() < 0.25) this.foregroundLayers.push(new Layer(this.game, this.asteroidSprites[randomInt(this.asteroidSprites.length - 1, 0)], size/distance, size, size))
      else this.layers.push(new Layer(this.game, this.asteroidSprites[randomInt(this.asteroidSprites.length - 1, 0)], size/distance, size, size))
      this.asteroidTimer = 0
      console.log(this.foregroundLayers)
    }
  }

  draw(ctx) {
    this.backgroundColor.draw(ctx)
    this.backgroundParticles.forEach(particle => particle.draw(ctx))
    this.backgroundLayers.forEach(layer => layer.draw(ctx))
    this.layers.forEach(layer => layer.draw(ctx))
  }
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
    this.slot = 0
    this.showText = false
    this.name = "Powerup"
    this.markedForDeletion = false
    this.sprite = powerupHealthSprite
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
      if(this.slot == 1) ctx.drawImage(this.sprite, 75, 250, 75, 75)
      if(this.slot == 2) ctx.drawImage(this.sprite, 200, 250, 75, 75)
    }
    else if(this.activated == false){
      ctx.drawImage(this.sprite, this.x, this.y, this.height, this.width)
    }
    if(this.showText == true) {
      if(this.slot == 1) ctx.fillText(this.name, 550, 100)
      if(this.slot == 2) ctx.fillText(this.name, 550, 200)
    }
  }

  onPickup() {
    this.pickedUp = true
  }
  
  startEffect() {
    this.activated = true
    this.showText = true
  }
  
  endEffect() {
    this.markedForDeletion = true
  }
}

class InvincibilityPowerup extends Powerup {
  constructor(game, x, y, width, height) {
    super(game, x, y, width, height, "gold")
    this.duration = 2500
    this.name = "Invincibility"
    this.sprite = powerupInvincibleSprite
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
    super(game, x, y, width, height, "turquoise")
    this.duration = 5000
    this.name = "Unlimited Ammo"
    this.sprite = powerupAmmoSprite
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
    this.name = "Double Damage"
    this.sprite = powerupDamageSprite
  }

  startEffect() {
    super.startEffect()
    this.game.player.damage *= 2
  }

  endEffect() {
    super.endEffect()
    this.game.player.damage /= 2
  }
}

class SpeedPowerup extends Powerup {
  constructor(game, x, y, width, height) {
    super(game, x, y, width, height, "blue")
    this.duration = 12000
    this.name = "Speed Boost"
    this.sprite = powerupSpeedSprite
  }

  startEffect() {
    super.startEffect()
    this.game.player.speedMultiplier *= 1.5
  }

  endEffect() {
    super.endEffect()
    this.game.player.speedMultiplier /= 1.5
  }
}

class HealthPowerup extends Powerup {
  constructor(game, x, y, width, height) {
    super(game, x, y, width, height, "red")
    this.duration = 200
    this.name = "Health Boost"
    this.sprite = powerupHealthSprite
  }

  startEffect() {
    super.startEffect()
    this.game.player.health += 50
  }
}

class BulletPowerup extends Powerup {
  constructor(game, x, y, width, height) {
    super(game, x, y, width, height, "green")
    this.duration = 3500
    this.name = "Bouncing Bullets"
    this.sprite = powerupBulletSprite
  }

  startEffect() {
    super.startEffect()
    this.game.player.bouncingBullets = true
  }

  endEffect() {
    super.endEffect()
    this.game.player.bouncingBullets = false
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
    if (this.game.currentInputs.includes("f")) {
      ctx.font = "75px " + this.fontFamily
      ctx.fillText("FPS: " + this.fps, 70, 1220)
      ctx.fillText("EPS: " + Math.round(this.game.spawnAcceleration/2*100)/100, 350, 1220)
      ctx.fillText("APS: " + Math.round(1000/this.game.player.ammoInterval*100)/100, 650, 1220)
      ctx.font = this.fontSize + "px " + this.fontFamily
    }
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
    ctx.fillText("Horizon    Strike", 300, 300)
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
    this.background = new Background(this)
    this.currentInputs = []
    this.playerProjectiles = []
    this.particles = []
    this.enemySpawnTimer = 0
    this.enemySpawnInterval = 2000 // startvalue, only in ms if spawnAcceleration is 1
    this.spawnAcceleration = 1
    this.spawnAccelerationTimer = 0
    this.spawnAccelerationInterval = 15000 // in ms
    this.enemies = []
    this.enemyProjectiles = []
    this.powerups = []
    this.collectedPowerups = []
    this.player.unlimitedAmmo = true

  }
  update(deltaTime) {
    this.gameTime += deltaTime
    this.player.update(deltaTime)
    this.background.update(deltaTime)

    // particles
    this.particles.forEach(particle => {
      particle.update(deltaTime)
      if (particle.markedForDeletion) {
        this.particles.splice(this.particles.indexOf(particle), 1)
      }
    })

    // player projectiles
    this.playerProjectiles.forEach(projectile => {
      projectile.update(deltaTime)
      this.enemies.forEach(enemy => {
        if (this.checkCollision(projectile, enemy)) {
          projectile.markedForDeletion = true
          enemy.takeDamage(projectile.damage)
          }
        })
      if (projectile.markedForDeletion) {
        this.playerProjectiles.splice(this.playerProjectiles.indexOf(projectile), 1)
      }
    })

    if(this.currentInputs.includes("x")) this.background.asteroidTimer += 50000//this.powerups.push(this.randomPowerup(this, 1700, randomInt(1700,0), 100, 100))


    // menu specific
    if (this.gameState == "mainmenu") {
      this.mainMenuUI.update(deltaTime)
    }

    else if (this.gameState == "ingame") {
      this.ingameUI.update(deltaTime)
      this.spawnAccelerationTimer += deltaTime
      if (this.spawnAccelerationTimer >= this.spawnAccelerationInterval) {
        this.spawnAcceleration *= 1.1
        this.player.ammoInterval *= 0.95
        this.spawnAccelerationTimer = 0
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
    }

    //end menu specific
  }
  
  draw(ctx) {
    this.background.draw(ctx)
    
    this.particles.forEach(particle => {
      particle.draw(ctx)
    })
    
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

    this.background.foregroundLayers.forEach(layer => {
      layer.draw(ctx)
    })
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
    let numberOfPowerups = 6
    let random = Math.random()
    if (random < 1/numberOfPowerups) {
      return new InvincibilityPowerup(game, x, y, width, height)
    }
    else if (random <= 2/numberOfPowerups) {
      return new AmmoPowerup(game, x, y, width, height)
    }
    else if (random <= 3/numberOfPowerups) {
      return new DamagePowerup(game, x, y, width, height)
    }
    else if (random <= 4/numberOfPowerups) {
      return new HealthPowerup(game, x, y, width, height)
    }
    else if (random <= 5/numberOfPowerups) {
      return new SpeedPowerup(game, x, y, width, height)
    }
    else if (random <= 6/numberOfPowerups) {
      return new BulletPowerup(game, x, y, width, height)
    }
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