const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

class Player {
    constructor({ pos, vel }) {
        this.pos = pos // (x,y)
        this.vel = vel
        this.rotation = 0
    }

    draw() {
        // Drawing center of ships pos
        ctx.save()

        ctx.translate(this.pos.x,this.pos.y)
        ctx.rotate(this.rotation)
        ctx.translate(-this.pos.x, -this.pos.y)

        ctx.beginPath()
        ctx.moveTo(this.pos.x + 30, this.pos.y)
        ctx.lineTo(this.pos.x - 15, this.pos.y - 15)
        ctx.lineTo(this.pos.x - 15, this.pos.y + 15)
        ctx.closePath()
        ctx.strokeStyle = 'white'
        ctx.stroke()

        ctx.restore()
    }

    update() {
        this.draw()
        this.pos.x += this.vel.x
        this.pos.y += this.vel.y
    }
}

class Asteroids {
    constructor({pos, vel, r}) {
        this.pos = pos
        this.vel = vel
        this.r = r
        // this.rotation = rotation
    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.pos.x,this.pos.y,this.r,0,Math.PI * 2, false)
        ctx.closePath()
        ctx.strokeStyle = 'white'
        ctx.stroke()
    }

    update() {
        this.draw()
        this.pos.x += this.vel.x
        this.pos.y += this.vel.y
    }
}

class Projectiles {
    constructor({ pos,vel }) {
        this.pos = pos
        this.vel = vel
        this.r = 5
    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.pos.x,this.pos.y,this.r,0,Math.PI * 2, false)
        ctx.closePath()
        ctx.fillStyle = 'white'
        ctx.fill()
    }

    update() {
        this.draw()
        this.pos.x += this.vel.x
        this.pos.y += this.vel.y
    }
}

const player = new Player({
    vel : {x : 0, y : 0},
    pos : {x : canvas.width / 2, y : canvas.height / 2}
})

const keys = {
    w : {
        pressed : false
    },
    d : {
        pressed : false
    },
    a : {
        pressed : false
    },
    space : {
        pressed : false
    }
}

window.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'KeyW' :
            keys.w.pressed = true;
            break
        case 'KeyA':
            keys.a.pressed = true;
            break
        case 'KeyD':
            keys.d.pressed = true;
            break
        case 'Space':
            projectiles.push(new Projectiles({
                pos : {
                    x : player.pos.x + Math.cos(player.rotation) * 30 ,
                    y: player.pos.y + Math.sin(player.rotation) * 30
                }, vel : {
                    x : Math.cos(player.rotation) * PROJECTILE_SPEED,
                    y : Math.sin(player.rotation) * PROJECTILE_SPEED
                }
            }))
            break
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.code) {
        case 'KeyW' :
            keys.w.pressed = false;
            break
        case 'KeyA':
            keys.a.pressed = false;
            break
        case 'KeyD':
            keys.d.pressed = false;
            break
    }
})

const FRICTION = 0.97
const SPEED = 3
const ROTATION = 0.04

const projectiles = []
const PROJECTILE_SPEED = 8

const asteroids = []
const AST_MX_SPEED = 5
const AST_MIN_SPEED = 1

window.setInterval(() => {
    const index = Math.floor(Math.random() * 4)
    let x, y
    let vx, vy
    let r = 50 * Math.random() + 10

    switch (index) {
      case 0: // left side of the screen
        x = 0 - r
        y = Math.random() * canvas.height
        vx = 1
        vy = 0
        break
      case 1: // bottom side of the screen
        x = Math.random() * canvas.width
        y = canvas.height + r
        vx = 0
        vy = -1
        break
      case 2: // right side of the screen
        x = canvas.width + r
        y = Math.random() * canvas.height
        vx = -1
        vy = 0
        break
      case 3: // top side of the screen
        x = Math.random() * canvas.width
        y = 0 - r
        vx = 0
        vy = 1
        break
    }
    asteroids.push(
      new Asteroids({
        pos: {
          x: x,
          y: y,
        },
        vel: {
          x: vx,
          y: vy,
        },
        r,
      })
    )
  }, 1000)


function animate() {
    window.requestAnimationFrame(animate)
    ctx.fillStyle = 'black'
    ctx.fillRect(0,0,canvas.width,canvas.height)

    player.update();

    // Projectile management
    for (let i = projectiles.length - 1; i >= 0; i--) {
        const projectile = projectiles[i]
        projectile.update()

        if (projectile.pos.x + projectile.r < 0 || projectile.pos.x > canvas.width || projectile.pos.y + projectile.r < 0 || projectile.pos.y > canvas.height) {
            projectiles.splice(i,1)
        }
    }
    // Ast management
    for (let i = asteroids.length - 1; i >= 0; i--) {
        const asteroid = asteroids[i]
        asteroid.update()

        if (asteroid.pos.x + asteroid.r < 0 || asteroid.pos.x > canvas.width || asteroid.pos.y + asteroid.r < 0 || asteroid.pos.y > canvas.height) {
            asteroids.splice(i,1)
        }
    }

    // Player movement
    if (keys.w.pressed) {
        player.vel.x = Math.cos(player.rotation) * SPEED
        player.vel.y = Math.sin(player.rotation) * SPEED
    } else if (!keys.w.pressed) {
        player.vel.x *= FRICTION
        player.vel.y *= FRICTION
    }
    if (keys.d.pressed) player.rotation += ROTATION
    else if (keys.a.pressed) player.rotation -= ROTATION
}

animate()