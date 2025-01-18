const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

class Player {
    constructor({ pos, vel }) {
        this.pos = pos // (x,y)
        this.vel = vel
        this.rotation = 0
        this.score = 0
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

    getVertices() {
        const cos = Math.cos(this.rotation)
        const sin = Math.sin(this.rotation)
        return [
          {
            x: this.pos.x + cos * 30 - sin * 0,
            y: this.pos.y + sin * 30 + cos * 0,
          },
          {
            x: this.pos.x + cos * -15 - sin * 15,
            y: this.pos.y + sin * -15 + cos * 15,
          },
          {
            x: this.pos.x + cos * -15 - sin * -15,
            y: this.pos.y + sin * -15 + cos * -15,
          },
        ]
      }
}

class Asteroids {
    constructor({pos, vel, r}) {
        this.pos = pos
        this.vel = vel
        this.r = r

        this.points = {
            combos : {
                sniper : 120, // shooting small ones
                rapit : 80, // destroying large ones within 300mm
                close_calls : {
                    dodge : 150,
                    last_minute : 200
                }
            },
            damage : {
                small : 20,
                meduim : 40,
                large : 60
            }
        }
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

    scoreCal(asteroid, projectile) {

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

const intervalId = window.setInterval(() => {
    const index = Math.floor(Math.random() * 4)
    let x, y
    let vx, vy
    const r = 50 * Math.random() + 15
    const speed = Math.random() * (AST_MX_SPEED - AST_MIN_SPEED) + AST_MIN_SPEED

    switch (index) {
      case 0: // left side of the screen
        x = 0 - r
        y = Math.random() * canvas.height
        vx = speed
        vy = 0

        break
      case 1: // bottom side of the screen
        x = Math.random() * canvas.width
        y = canvas.height + r
        vx = 0
        vy = -speed
        break
      case 2: // right side of the screen
        x = canvas.width + r
        y = Math.random() * canvas.height
        vx = -speed
        vy = 0
        break
      case 3: // top side of the screen
        x = Math.random() * canvas.width
        y = 0 - r
        vx = 0
        vy = speed
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
  }, Math.floor(Math.random() * (1500 - 200) + 200 ))


function animate() {
    const animationId = window.requestAnimationFrame(animate)
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

        // out of screen
       if (asteroid.pos.x + asteroid.r < 0 || asteroid.pos.x > canvas.width || asteroid.pos.y + asteroid.r < 0 || asteroid.pos.y > canvas.height) {
            asteroids.splice(i,1)
        }

        if (circleTriangleCollision(asteroid, player.getVertices())) {
            console.log('GAME OVER')
            window.cancelAnimationFrame(animationId)
            clearInterval(intervalId)
          }

        // Collition
        for (let j = projectiles.length - 1; j >= 0; j--) {
            const projectile = projectiles[j]
            if (circleCollition(asteroid, projectile)) {
                console.log('Hit');
                projectiles.splice(j,1)
                // Sizing asteroid
                if (asteroid.r <= 20) asteroids.splice(i,1)
                    else if (asteroid.r >= 20) { asteroid.r = asteroid.r / 2 }
            }
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

function circleCollition(circle1,circle2) {
    const xDistance = circle1.pos.x - circle2.pos.x
    const yDistance = circle1.pos.y - circle2.pos.y

    const Distance = Math.sqrt(xDistance ** 2 + yDistance ** 2)

    if (Distance < circle1.r + circle2.r) {
        return true
    }
    return false
}

function circleTriangleCollision(circle, triangle) {
    // Check if the circle is colliding with any of the triangle's edges
    for (let i = 0; i < 3; i++) {
      let start = triangle[i]
      let end = triangle[(i + 1) % 3]

      let dx = end.x - start.x
      let dy = end.y - start.y
      let length = Math.sqrt(dx * dx + dy * dy)

      let dot = ((circle.pos.x - start.x) * dx +
          (circle.pos.y - start.y) * dy) /
        Math.pow(length, 2)

      let closestX = start.x + dot * dx
      let closestY = start.y + dot * dy

      if (!isPointOnLineSegment(closestX, closestY, start, end)) {
        closestX = closestX < start.x ? start.x : end.x
        closestY = closestY < start.y ? start.y : end.y
      }

      dx = closestX - circle.pos.x
      dy = closestY - circle.pos.y

      let distance = Math.sqrt(dx * dx + dy * dy)

      if (distance <= circle.r) {
        return true
      }
    }
    // No collision
    return false
  }

  function isPointOnLineSegment(x, y, start, end) {
    return (
      x >= Math.min(start.x, end.x) &&
      x <= Math.max(start.x, end.x) &&
      y >= Math.min(start.y, end.y) &&
      y <= Math.max(start.y, end.y)
    )
  }

animate()