import "/style.css"

const canvas = document.querySelector("#game")
const ctx = canvas.getContext("2d")

ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

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
enemyBossSprite.src = "assets/game/enemy_boss_new.png"

const playerProjectileSprite = new Image()
playerProjectileSprite.src = "assets/game/player_projectile.png"

const playerExplosiveProjectileSprite = new Image()
playerExplosiveProjectileSprite.src = "assets/game/player_explosive_projectile.png"

const enemyProjectileSprite = new Image()
enemyProjectileSprite.src = "assets/game/enemy_projectile.png"

const enemyExplosiveProjectileSprite = new Image()
enemyExplosiveProjectileSprite.src = "assets/game/enemy_explosive_projectile.png"

const powerupInvincibleSprite = new Image()
powerupInvincibleSprite.src = "assets/game/powerup_invincible.png"

const shieldSprite = new Image()
shieldSprite.src = "assets/game/shield.png"

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

const powerupExplosiveSprite = new Image()
powerupExplosiveSprite.src = "assets/game/powerup_explosive.png"

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

const explosion1Sprite = new Image()
explosion1Sprite.src = "assets/game/exp1.png"

const explosion2Sprite = new Image()
explosion2Sprite.src = "assets/game/exp2.png"

const explosion3Sprite = new Image()
explosion3Sprite.src = "assets/game/exp3.png"

const explosion4Sprite = new Image()
explosion4Sprite.src = "assets/game/exp4.png"

const exclamationPointSprite = new Image()
exclamationPointSprite.src = "assets/game/exclamation_point.png"

const UISprite = new Image()
UISprite.src = "assets/game/ui.png"


window.addEventListener("load", function () {
class InputHandler {
  constructor(game) {
    this.game = game
    this.acceptedInputs = ["arrowup", "arrowdown", "arrowleft", "arrowright","w","a","s","d", " ", "q", "e", "r", "f", "x", "enter", "1", "2"]

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
    this.height = 160
    this.width = 160
    this.x = 130
    this.y = 550
    this.padding = 50
    this.speedX = 0
    this.speedY = 0
    this.speedMultiplier = 1.3
    this.shotTimer = 0
    this.shotInterval = 100 // in ms
    this.maxAmmo = 20
    this.currentAmmo = 20
    this.unlimitedAmmo = false
    this.ammoTimer = 0
    this.ammoInterval = 400 // in ms
    this.explosiveAmmo = 5
    this.shotSpeed = 3
    this.projectileWidth = 100
    this.projectileHeight = 30
    this.damage = 25
    this.maxHealth = 200
    this.health = 200
    this.invincible = false
    this.bouncingBullets = false
    this.explosiveBullets = false
    this.timeSinceLastHit = 0
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

    this.timeSinceLastHit += deltaTime
  }

  draw(ctx) {
    if(this.game.currentInputs.includes("f")) {
      ctx.fillStyle = "blue"
      ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    ctx.drawImage(playerSprite, this.x, this.y, this.width, this.height)

    //hp bar

    if (this.game.gameState == "ingame") {
      if(this.timeSinceLastHit < 1000) {
        ctx.fillStyle = "lightblue"
        ctx.fillRect(this.x, this.y - 30, this.width * (this.health / this.maxHealth), 10)
      }
      
      if(this.currentAmmo < this.maxAmmo) {
        ctx.fillStyle = "orange"
        ctx.fillRect(this.x, this.y + this.height + 10, this.width * (this.currentAmmo / this.maxAmmo), 10)

        /*
        let size = this.width/10
        for(let i = 0; i < this.currentAmmo; i++) {
          ctx.fillStyle = "orange"
          if(i <= 9) ctx.fillRect(this.x + i*size*1.2, this.y + 180, size, size)
          else if(i <= 19) ctx.fillRect(this.x + (i-10)*size*1.2, this.y + 200, size, size)
          else ctx.fillRect(this.x + (i-20)*size*1.2, this.y + 220, size, size)
        }
        */
      }
    }
  }

  shoot() {
    if (this.currentAmmo > 0 && this.shotTimer >= this.shotInterval) {
      if(this.unlimitedAmmo == false) this.currentAmmo -- 
      if(this.explosiveBullets) this.game.playerProjectiles.push(new ExplosiveProjectile(this.game, playerExplosiveProjectileSprite, this.x + this.width, this.y + this.height / 2, this.projectileWidth, 50, this.shotSpeed * 0.5, this.damage * 3, 300, 0, true))
      else this.game.playerProjectiles.push(new Projectile(this.game, playerProjectileSprite, this.x + this.width, this.y + this.height / 2, this.projectileWidth, this.projectileHeight, this.shotSpeed, this.damage, true))
      if(this.bouncingBullets == true) {
        if(this.explosiveBullets) {
          this.game.playerProjectiles.push(new ExplosiveProjectile(this.game, playerExplosiveProjectileSprite, this.x + this.width, this.y + this.height / 2, this.projectileWidth, 50, this.shotSpeed * 0.5, this.damage * 3, 300, -this.shotSpeed * 0.5, 0, true))
          this.game.playerProjectiles.push(new ExplosiveProjectile(this.game, playerExplosiveProjectileSprite, this.x + this.width, this.y + this.height / 2, this.projectileWidth, 50, this.shotSpeed * 0.5, this.damage * 3, 300, this.shotSpeed * 0.5, 0, true))
        }
        else {
          this.game.playerProjectiles.push(new BouncingProjectile(this.game, playerProjectileSprite, this.x + this.width, this.y + this.height / 2, this.projectileWidth, this.projectileHeight, this.shotSpeed, this.damage, this.shotSpeed, true))
          this.game.playerProjectiles.push(new BouncingProjectile(this.game, playerProjectileSprite, this.x + this.width, this.y + this.height / 2, this.projectileWidth, this.projectileHeight, this.shotSpeed, this.damage, -this.shotSpeed, true))
        }
      } 
      this.shotTimer = 0
    }
  }

  takeDamage(damage, bullet = true) {
    if(this.invincible == false) {
      this.health -= damage
      this.timeSinceLastHit = 0
      if(bullet == false)this.game.particles.push(new NumberParticle(this.game, this.x + this.width/2 - 20, this.y - 10, 75, 0, 0, "red", 300, damage))
    }
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
  constructor(game, shooting, hp = randomInt(200,50), projectileDamage = 25, collisionDamage = 50) {
    this.game = game
    this.height = 190
    this.width = 120
    this.x = 1700
    this.y = randomInt(canvas.height - this.height-50, 0)
    this.speedX = -1
    this.speedY = 0
    this.speedMultiplier = Math.random() * 2 + 0.1
    this.shooting = shooting
    this.ammo = randomInt(10,3)
    this.shotTimer = 1000
    this.shotInterval = randomInt(1000,250) // in ms
    this.shotSpeed = this.speedX * this.speedMultiplier - 0.35
    this.projectileWidth = 100
    this.projectileHeight = 30
    this.projectileDamage = projectileDamage
    this.collisionDamage = collisionDamage
    this.health = hp
    this.maxHealth = hp
    this.dropchance = 0.1
    this.markedForDeletion = false
    this.score = 20
    this.sprite = enemyShipSprite
    this.boss = false
  }
  
  update(deltaTime) {
    this.x += this.speedX * this.speedMultiplier * deltaTime
    this.y += this.speedY * this.speedMultiplier * deltaTime
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
    ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height)
    
    //hp bar
    ctx.fillStyle = "red"
    ctx.fillRect(this.x, this.y - 30, this.width * (this.health / this.maxHealth), 10)
  }

  shoot() {
    if(this.shooting && this.ammo > 0) {
      this.game.enemyProjectiles.push(new Projectile(this.game, enemyProjectileSprite, this.x - this.projectileWidth - 0.1, this.y + this.height / 2  - this.projectileHeight/2, this.projectileWidth, this.projectileHeight, this.shotSpeed, this.projectileDamage))
      this.ammo --
    }
  }

  takeDamage(damage, bullet = true) {
    this.health -= damage
    if(this.health <= 0) this.destory()
    if(bullet == false)this.game.particles.push(new NumberParticle(this.game, this.x + this.width/2 - 20, this.y - 10, 75, 0, 0, "lightblue", 300, damage))
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
  constructor(game, shooting, hp = 125, projectileDamage = 25, collisionDamage = 50) {
    super(game, shooting, hp, projectileDamage, collisionDamage)
    this.height = 160
    this.width = 160
    this.speedMultiplier = Math.random() * 2 + 0.15
    this.shotSpeed = this.speedX * this.speedMultiplier - 0.25
    this.dropchance = 0.2  
    this.score = 25
    this.sprite = enemyShipSprite
  }

}

class Speeder extends Enemy {
  constructor(game,hp = 60, projectileDamage = 15, collisionDamage = 25, dropchance = 0.1) {
    super(game, null, hp, projectileDamage, collisionDamage)
    this.height = 100
    this.width = 160
    this.y = this.game.player.y
    this.speedMultiplier = (Math.random() + 0.35) * 3
    this.shotSpeed = this.speedX * this.speedMultiplier - 0.25
    this.dropchance = dropchance
    this.score = 45
    this.timer = 0
    this.timerInterval = 500
    this.sprite = enemySpeederSprite
  }

  update(deltaTime) {
    if(this.timer <= this.timerInterval)  this.timer += deltaTime
    else super.update(deltaTime)
  }

  draw(ctx) {
    super.draw(ctx)
    if(this.timer < this.timerInterval) {
      ctx.drawImage(exclamationPointSprite, 100, this.y + this.height/2 - 60, 40, 120)
    }
  }

}


class Tank extends Enemy {
  constructor(game, shooting, hp = 200,  projectileDamage = 35, collisionDamage = 75) {
    super(game, shooting, hp, projectileDamage, collisionDamage)
    this.height = 256
    this.width = 256
    this.speedMultiplier = Math.random() + 0.01
    this.shotSpeed = this.speedX * this.speedMultiplier - 0.25
    this.dropchance = 0.35
    this.score = 35
    this.sprite = enemyTankSprite
  }

}

class Boss extends Enemy {
  constructor(game, hp=2500, projectileDamage = 50, collisionDamage = 100) {
    super(game, false, hp, projectileDamage, collisionDamage)
    this.height = 56 * 9
    this.width = 52 * 9
    this.speedMultiplier = Math.random() + 0.01
    this.shotSpeed = this.speedX * this.speedMultiplier - 0.25
    this.dropchance = 0.5
    this.score = 350
    this.sprite = enemyBossSprite
    this.boss = true
    this.phase = 0
    this.shotInterval = 3000
    this.speedMultiplier = 0.5
    this.y = canvas.height / 2 - this.height / 2
    this.health = this.maxHealth * 1
    this.game.spawnEnemies = false
    this.shotSpeed = -0.5
  }

  update(deltaTime) {
    this.x += this.speedX * this.speedMultiplier * deltaTime
    this.y += this.speedY * this.speedMultiplier * deltaTime
    this.shotTimer += deltaTime
    console.log(this.phase)
    if(this.y >= canvas.height - this.height - 50 || this.y <= 100) this.speedY *= -1
    if(this.phase == 0) {
      if(this.x <= 1150) {
        this.phase = 1
        this.speedX = 0
        this.speedY = 1
        this.shotInterval = 1500 
        this.shoot()
      }

    }
    else if(this.phase == 1) {
      if (this.shotTimer >= this.shotInterval) {
        this.shoot()
        this.shotTimer = 0
      }
      if(this.health <= this.maxHealth * 0.75) {
        this.phase = 2
        this.shotInterval = 1500
      }
    }
    else if(this.phase == 2) {
      if (this.shotTimer >= this.shotInterval) {
        this.shoot()
        this.shotTimer = 0
      }
      if(this.health <= this.maxHealth * 0.5) {
        this.phase = 3
        this.shotInterval = 2500
      }
    }
    else if(this.phase == 3) {
      if (this.shotTimer >= this.shotInterval) {
        this.shoot()
        this.shotTimer = 0
      }
      if(this.health <= this.maxHealth * 0.35) {
        this.phase = 4
        this.shotInterval = 1500
      }
    }
    else if(this.phase == 4) {
      if (this.shotTimer >= this.shotInterval) {
        this.shoot()
        this.shotTimer = 0
      }
      if(this.health <= this.maxHealth * 0.15) {
        this.phase = 5
        this.shotInterval = 2200
        this.shotspeed = -0.2
      }
    }
    else if(this.phase == 5) {
      if (this.shotTimer >= this.shotInterval) {
        this.shoot()
        this.shotTimer = 0
      }
    }
  }    

  draw(ctx) {
    super.draw(ctx)
  }

  shoot() {
    if(this.phase == 1 || this.phase == 5) {
      this.game.enemyProjectiles.push(new BouncingProjectile(this.game, enemyProjectileSprite, this.x - this.projectileWidth - 0.1, this.y + this.height / 2 - this.projectileHeight/2, this.projectileWidth, this.projectileHeight, this.shotSpeed, this.projectileDamage, -this.shotSpeed*2))
      this.game.enemyProjectiles.push(new BouncingProjectile(this.game, enemyProjectileSprite, this.x - this.projectileWidth - 0.1, this.y + this.height / 2 - this.projectileHeight/2, this.projectileWidth, this.projectileHeight, this.shotSpeed, this.projectileDamage, this.shotSpeed*2))
    }
    if(this.phase >= 3 ) {
      this.game.enemies.push(new Speeder(this.game, 50, 15, 25, 0))
    }

    if(this.phase != 1 && this.phase != 5) {
      let angle_to_player = (this.game.player.y - this.y) / 2000 //dont ask
      this.game.enemyProjectiles.push(new ExplosiveProjectile(this.game, enemyExplosiveProjectileSprite, this.x - this.projectileWidth - 0.1, this.y + this.height / 2 - this.projectileHeight/2, 100, 50, this.shotSpeed, this.projectileDamage,250, angle_to_player, false, true))
    }
  }

  destory() {
    this.game.spawnEnemies = true
    this.markedForDeletion = true
    this.game.score += this.score
    if(this.game.player.health < 200) this.game.player.health = 200
    this.game.gameState = "levelup"
    this.game.enemies = []
    this.game.enemyProjectiles = []
    this.game.playerProjectiles = []
  }
}


class Projectile {
  constructor(game, sprite, x, y, width, height, speed, damage, playerProjectile = false) {
    this.game = game
    this.sprite = sprite
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.speedX = speed
    this.damage = damage
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
      ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height)
    }
    else {
      ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height)
    }
  }

  onHit(target) {
    target.takeDamage(this.damage)
    this.game.particles.push(new Explosion(this.game, this.x + this.width, this.y + this.height/2, 70, 70, target.speedX * target.speedMultiplier, target.speedY * target.speedMultiplier, 0, target, false, 200))
    if(this.playerProjectile)this.game.particles.push(new NumberParticle(this.game, this.x + this.width, this.y + this.height/2 - 20, 50, target.speedX * target.speedMultiplier, target.speedY * target.speedMultiplier, "lightblue", 300, this.damage))
    else this.game.particles.push(new NumberParticle(this.game, this.x + this.width, this.y + this.height/2 - 20, 50, target.speedX * target.speedMultiplier, target.speedY * target.speedMultiplier, "red", 300, this.damage))
    this.markedForDeletion = true
  }
}

class BouncingProjectile extends Projectile {
  constructor(game, sprite, x, y, width, height, speed, damage, speedY, playerProjectile = false) {
    super(game, sprite, x, y, width, height, speed, damage, playerProjectile)
    this.speedY = speedY
    this.padding = 50
  }

  update(deltaTime) {
    super.update(deltaTime)
    this.y += this.speedY * deltaTime
    if (this.y + this.height + this.padding > canvas.height || this.y < 0 + this.padding) this.speedY *= -1
  }

}

class ExplosiveProjectile extends BouncingProjectile {
  constructor(game, sprite, x, y, width, height, speed, damage, explosionSize, SpeedY = 0, playerProjectile = false, delayedExplosion = false,) {
    super(game, sprite, x, y, width, height, speed, damage, SpeedY, playerProjectile)
    this.explosionSize = explosionSize
    this.delayedExplosion = delayedExplosion
  }

  update(deltaTime) {
    super.update(deltaTime)
    if(this.x >= 1300 && this.playerProjectile && this.delayedExplosion) this.onHit(null)
    if(this.x >= 1300 && this.playerProjectile && this.delayedExplosion) this.onHit(null)
    if(this.x <= 100 && !this.playerProjectile) this.onHit(null)
  }

  draw(context) {
    if(this.delayedExplosion) {
      ctx.fillStyle = "red"
      ctx.fillRect(this.x - this.detectionRange/2 + this.width/2, this.y - this.detectionRange/2 + this.height/2, this.detectionRange, this.detectionRange)
    }
    super.draw(context)
  }

  onHit(target) {
    if (target != null)target.takeDamage(this.damage)
    console.log("explosion")
    if(this.playerProjectile) {
      this.game.playerExplosions.push(new Explosion(this.game, this.x + this.width, this.y + this.height/2, this.explosionSize, this.explosionSize, 0, 0, this.damage, target, true, 400))
      this.game.particles.unshift(new NumberParticle(this.game, this.x + this.width, this.y + this.height/2 - 20, 50, target.speedX * target.speedMultiplier, target.speedY * target.speedMultiplier, "lightblue", 300, this.damage))
    }
    else {
      this.game.enemyExplosions.push(new Explosion(this.game, this.x + this.width, this.y + this.height/2, this.explosionSize, this.explosionSize, 0, 0, this.damage, target, false, 300))
      if (target != null) this.game.particles.unshift(new NumberParticle(this.game, this.x + this.width, this.y + this.height/2 - 20, 50, target.speedX * target.speedMultiplier, target.speedY * target.speedMultiplier, "red", 300, this.damage))
    }
    this.markedForDeletion = true
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

class Explosion extends Particle {
  constructor(game, x, y, width, height, speedX, speedY, damage, hitTarget, playerExplosion = false, lifeTime=500) {
    super(game, x, y, width, height, speedX, speedY, null, lifeTime)
    this.damage = damage
    this.playerExplosion = playerExplosion
    this.targetsHit = [hitTarget]
    this.frameInterval = lifeTime / 4
    this.x = this.x - this.width/2
    this.y = this.y - this.height/2
  }

  draw(ctx) {
    if(this.game.currentInputs.includes("f")) {
      ctx.fillStyle = "orange"
      ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    if (this.lifeTime >= this.frameInterval*3) ctx.drawImage(explosion1Sprite, this.x, this.y, this.width, this.height)
    else if (this.lifeTime >= this.frameInterval*2) ctx.drawImage(explosion2Sprite, this.x, this.y, this.width, this.height)
    else if (this.lifeTime >= this.frameInterval*1) ctx.drawImage(explosion3Sprite, this.x, this.y, this.width, this.height)
    else ctx.drawImage(explosion4Sprite, this.x, this.y, this.width, this.height)
  }

  onContact(target) {
    if (!this.targetsHit.includes(target)) {
      target.takeDamage(this.damage, false)
      this.targetsHit.push(target)
      console.log("explosion damage")
    }
  }
}

class NumberParticle extends Particle {
  constructor(game, x, y, size, speedX, speedY, color, lifeTime, text) {
    super(game, x, y, null, null, speedX, speedY, color, lifeTime)
    this.text = text
    this.size = size
  }

  update(deltaTime) {
    super.update(deltaTime)
    this.y -= 0.08 * deltaTime
    
  }

  draw(ctx) {
    ctx.font = this.size + "px Dashhorizon"
    ctx.fillStyle = this.color
    ctx.fillText(this.text, this.x, this.y)
    
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

class CloudLayer extends Layer {
  constructor(game, speedMultiplier, width, height, x) {
    super(game, cloudsSprite, speedMultiplier, width, height, false)
    this.x = x
  }

  update(deltaTime) {
    this.x -= this.speed * this.speedMultiplier * deltaTime
    if (this.x + this.width <= 0) this.x = 1699
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
    super(game, null, 0, canvas.width, canvas.height, true, 15, 4, "white")
    this.color = color
    this.x = 0
    this.y = 0
  }

  draw(ctx) {
    ctx.fillStyle = this.color
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  sparkle() {
    this.game.background.backgroundParticles.push(new Particle(this.game, randomInt(canvas.width, 0), randomInt(canvas.height, 0), this.sparkleSize, this.sparkleSize, 0, 0, this.sparkleColor, 500))
  }

}

class Background {
  constructor(game) {
    this.game = game
    this.layers = []
    this.backgroundSpeed = 0.007
    this.backgroundLayers = [new CloudLayer(this.game, this.backgroundSpeed, 1700, 1300, 0), new CloudLayer(this.game, this.backgroundSpeed, 1700, 1300, 1699)]
    this.foregroundLayers = []
    this.backgroundColor = new BackgroundColor(this.game, "#141d27")
    this.backgroundParticles = []
    this.planetTimer = 30000
    this.planetInterval = 35000
    this.starTimer = randomInt(400000, 0)
    this.starInterval = 140000
    this.galaxyTimer = randomInt(900000, 0)
    this.galaxyInterval = 80000
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

    this.planetTimer += deltaTime
    this.starTimer+= deltaTime
    this.galaxyTimer+= deltaTime
    this.asteroidTimer+= deltaTime
    this.blackholeTimer += deltaTime

    
    if(this.blackholeTimer > this.blackholeInterval) {
      let size = randomInt(200, 50)
      let distance = randomInt(50000, 20000)
      console.log("spawn blackhole")
      this.backgroundLayers.unshift(new Layer(this.game, this.blackholeSprites[randomInt(this.blackholeSprites.length - 1, 0)], size/distance + 0.0001, size, size))
      this.blackholeTimer = 0
    }
    if(this.galaxyTimer > this.galaxyInterval) {
      let size = randomInt(350, 200)
      let distance = randomInt(70000, 45000)
      console.log("spawn galaxy")
      this.backgroundLayers.unshift(new Layer(this.game, this.galaxySprites[randomInt(this.galaxySprites.length - 1, 0)], size/distance, size, size))
      this.galaxyTimer = 0
    }
    if(this.starTimer > this.starInterval) {
      let size = randomInt(400, 250)
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
      else {
        distance = randomInt(400, 100)
        size = randomInt(200, 100)
        this.layers.push(new Layer(this.game, this.asteroidSprites[randomInt(this.asteroidSprites.length - 1, 0)], size/distance, size, size))
      }
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
    this.speed = -0.5
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
    if(this.game.currentInputs.includes("2") && this.pickedUp == true && this.activated != true && this.slot == 2) this.startEffect()
    else if(this.game.currentInputs.includes("1") && this.pickedUp == true && this.activated != true && this.slot == 1) this.startEffect()
    if(this.activated == true) {
      this.durationTimer += deltaTime
      if (this.durationTimer >= this.duration){
      this.endEffect()
      }
    }

  }

  draw(ctx) {
    ctx.fillStyle = this.color
    ctx.font = "100px dashhorizon"
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
    this.duration = 4500
    this.name = "Invincibility"
    this.sprite = powerupInvincibleSprite
    this.shield = {
      x : this.game.player.x + this.game.player.width,
      y : this.game.player.y - 25,
      width : this.game.player.width/8*2,
      height : this.game.player.height+50
    }
  }

  update(deltaTime) {
    super.update(deltaTime)
    if(this.activated == true) {
      this.shield = {
        x : this.game.player.x + this.game.player.width,
        y : this.game.player.y - 25,
        width : this.game.player.width/8*2,
        height : this.game.player.height+50
      }
      this.game.enemies.forEach(enemy => {
        if(this.game.checkCollision(this.shield, enemy)) {
          if (enemy.boss == false) enemy.markedForDeletion = true
        }
      })
      this.game.enemyProjectiles.forEach(projectile => {
        if(this.game.checkCollision(this.shield, projectile)) {
          projectile.markedForDeletion = true
        }
      })
    }
  }

  draw(ctx) {
    super.draw(ctx)
    if(this.activated) {
      ctx.drawImage(shieldSprite, this.game.player.x + this.game.player.width, this.game.player.y - 25, this.game.player.width/8*2, this.game.player.height+50)
      if(this.game.currentInputs.includes("f")) {
        ctx.fillStyle = "white"
        ctx.fillRect(this.shield.x, this.shield.y, this.shield.width, this.shield.height)
      }
    }
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
    this.duration = 7500
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
    this.duration = 10000
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
    this.duration = 15000
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
    this.duration = 5500
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

class ExplosivePowerup extends Powerup {
  constructor(game, x, y, width, height) {
    super(game, x, y, width, height, "orange")
    this.duration = 5500
    this.name = "Explosive Bullets"
    this.sprite = powerupExplosiveSprite
    this.oldShotInterval = this.game.player.shotInterval
  }

  startEffect() {
    super.startEffect()
    this.game.player.explosiveBullets = true
    this.game.player.shotInterval = 250
  }

  endEffect() {
    super.endEffect()
    this.game.player.explosiveBullets = false
    this.game.player.shotInterval = this.oldShotInterval
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
    this.blinkInterval = 700
    this.visible = true
  }
  update(deltaTime) {
    this.fps = Math.round(1000/deltaTime)
    if (this.blinking) {
      this.blinkTimer += deltaTime
      if (this.blinkTimer >= this.blinkInterval) {
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
    this.blinking = true
  }
  update(deltaTime) {
    super.update(deltaTime)
  }
  draw(ctx) {
    super.draw(ctx)
    //ctx.drawImage(UISprite,35,10, 70*10,35*10)
    ctx.fillText("Health: " + Math.ceil(this.game.player.health), 50, 100)
    ctx.fillText("Ammo: " + game.player.currentAmmo, 50, 200)
    ctx.fillText("Time: " + Math.round(this.game.gameTime/1000) + "s", 1150, 100)
    ctx.fillText("Score: " + this.game.score, 1150, 200)
    /*for(let i = 0; i < this.game.player.currentAmmo; i++) {
      ctx.fillStyle = "lightblue"
      ctx.fillRect(50 + i*20, 300, 20, 20)
    }
    
    for(let i = 0; i < this.game.player.health; i++) {
      ctx.fillStyle = "red"
      ctx.fillRect(50 + i*5, 250, 5, 20)
    }
    */
    
    if(this.game.bossInterval - this.game.bossTimer <= 5000) {
      if(this.visible){
        ctx.fillStyle = "red"
        ctx.font = "200px " + this.fontFamily
        ctx.fillText("Boss Incoming", 350, 1150)
      }
    }
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

class LevelUpUI extends UI {
  constructor(game) {
    super(game)
    this.fontSize = 100
    this.timer = 0
    this.upgrades = []
    this.leaving = false
    this.blinking = true
    this.blinkInterval = 250
  }

  update(deltaTime) {
    super.update(deltaTime)
    if(this.leaving) {
      this.timer += deltaTime
      if(this.timer >= 1500) {
        this.leave()
      }
    }
    if(this.game.currentInputs.includes("1")){
      this.leaving = true

    }
    else if(this.game.currentInputs.includes("2")){
      this.leaving = true

    }
    else if(this.game.currentInputs.includes("3")){
      this.leaving = true
    }
  }

  draw(ctx) {
    super.draw(ctx)
    if(this.visible && this.leaving)ctx.fillText("Choose your upgrade. Press 1-3", 300, 1100)
    else if(this.leaving == false)ctx.fillText("Choose your upgrade. Press 1-3", 300, 1100)
  }

  leave() {
    this.game.gameState = "ingame"
    this.game.player.unlimitedAmmo = false
    
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
    this.levelUpUI = new LevelUpUI(this)
    this.background = new Background(this)
    this.currentInputs = []
    this.playerProjectiles = []
    this.particles = []
    this.playerExplosions = []
    this.enemyExplosions = []
    this.enemySpawnTimer = 0
    this.enemySpawnInterval = 2000 // startvalue, only in ms if spawnAcceleration is 1
    this.spawnAcceleration = 1
    this.spawnAccelerationTimer = 0
    this.spawnAccelerationInterval = 15000 // in ms
    this.bossTimer = 50000
    this.bossInterval = 60000 // in ms
    this.enemies = []
    this.enemyProjectiles = []
    this.powerups = []
    this.collectedPowerups = []
    this.player.unlimitedAmmo = true
    this.spawnEnemies = true
    this.gameState = "mainmenu"

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
    
    //player explosions
    this.playerExplosions.forEach(explosion => {
      explosion.update(deltaTime)
      this.enemies.forEach(enemy => {
        if (this.checkCollision(explosion, enemy)) {
          explosion.onContact(enemy)
          }
        }
      )
      if (explosion.markedForDeletion) {
        this.playerExplosions.splice(this.playerExplosions.indexOf(explosion), 1)
      }
    })
    
    //enemy explosions
    this.enemyExplosions.forEach(explosion => {
      explosion.update(deltaTime)
        if (this.checkCollision(explosion, this.player)) {
          explosion.onContact(this.player)
          }
      if (explosion.markedForDeletion) {
        this.enemyExplosions.splice(this.enemyExplosions.indexOf(explosion), 1)
      }
    })

    // player projectiles
    this.playerProjectiles.forEach(projectile => {
      projectile.update(deltaTime)
      this.enemies.forEach(enemy => {
        if (this.checkCollision(projectile, enemy)) {
            projectile.onHit(enemy)
          }
        }
      )
      if (projectile.markedForDeletion) {
        this.playerProjectiles.splice(this.playerProjectiles.indexOf(projectile), 1)
      }
    })

    if(this.currentInputs.includes("x"))  this.powerups.push(this.randomPowerup(this, 1700, randomInt(1700,0), 100, 100))//this.enemies.push(this.randomEnemy(this, chance(0.3))) //this.particles.push(new Explosion(this.game, 1700, randomInt(1300, 0), 50, 50, -1, 0, 500)) //this.background.asteroidTimer += 50000


    // menu specific
    if (this.gameState == "mainmenu") {
      this.mainMenuUI.update(deltaTime)
    }

    else if (this.gameState == "ingame") {
      this.ingameUI.update(deltaTime)
      this.spawnAccelerationTimer += deltaTime
      if (this.spawnAccelerationTimer >= this.spawnAccelerationInterval) {
        this.spawnAcceleration *= 1.05
        this.spawnAccelerationTimer = 0
      }
      if(this.bossTimer >= this.bossInterval) {
        this.enemies.push(new Boss(this))
        this.bossTimer = 0
      }
      if(this.spawnEnemies)this.bossTimer += deltaTime
      //enemies
      this.enemySpawnTimer += deltaTime * this.spawnAcceleration
      if (this.enemySpawnTimer >= this.enemySpawnInterval && this.spawnEnemies) {
        this.enemies.push(this.randomEnemy(this, chance(0.3)))
        this.enemySpawnTimer = 0
      }
      this.enemies.forEach(enemy => {
        enemy.update(deltaTime)
        if (this.checkCollision(enemy, this.player)) {
          this.player.takeDamage(enemy.collisionDamage, false)
          if(enemy.boss == false)enemy.markedForDeletion = true
        }
        if (enemy.markedForDeletion) {
          this.enemies.splice(this.enemies.indexOf(enemy), 1)
        }
      })
  
      //enemy projectiles
      this.enemyProjectiles.forEach(projectile => {
        projectile.update(deltaTime)
        if(this.checkCollision(projectile, this.player)) {
          projectile.onHit(this.player)
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
    else if(this.gameState == "levelup") {
      this.levelUpUI.update(deltaTime)
    }
    else if (this.gameState == "gameover") {
      this.gameOverUI.update(deltaTime)
    }

    //end menu specific
  }
  
  draw(ctx) {
    this.background.draw(ctx)
    
    
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

    this.particles.forEach(particle => {
      particle.draw(ctx)
    })

    this.playerExplosions.forEach(explosion => {
      explosion.draw(ctx)
    })

    this.enemyExplosions.forEach(explosion => {
      explosion.draw(ctx)
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
    else if(this.gameState == "levelup") {
      this.levelUpUI.draw(ctx)
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
    let numberOfPowerups = 7
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
    else if (random <= 7/numberOfPowerups) {
      return new ExplosivePowerup(game, x, y, width, height)
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