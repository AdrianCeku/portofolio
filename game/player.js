import { playerSprite, playerProjectileSprite, playerExplosiveProjectileSprite } from "./assets"
import { canvas, ctx} from "./game"
import { Projectile, BouncingProjectile, ExplosiveProjectile } from "./projectile"
import { NumberParticle } from "./particle"

export class Player {
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
            if(bullet == false) {
                this.game.particles.push(new NumberParticle(this.game, this.x + this.width/2 - 20, this.y - 10, 75, 0, 0, "red", 300, damage))
            }
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