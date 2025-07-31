class Asteroids {
    constructor({pos, vel, r}) {
        this.pos = pos
        this.vel = vel
        this.r = r
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

/* Asteroid Spawning over random range interval */
const intervalId_Ast = window.setInterval(() => {
    const index = Math.floor(Math.random() * 4)
    let x, y, vx, vy
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
  }, Math.floor(Math.random() * (800) + 200 ))