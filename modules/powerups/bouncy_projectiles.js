class BouncyProjectileDisplay {
    constructor({pos}) {
        this.pos = pos
        this.r = 12
    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.pos.x,this.pos.y,this.r,0,Math.PI * 2, false)
        ctx.closePath()
        ctx.strokeStyle = 'green'
        ctx.stroke()
    }

    update() {
        this.draw()
    }
}

class BouncyProjectile {
    constructor({ pos,vel }) {
        this.pos = pos
        this.vel = vel
        this.r = 7
    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.pos.x,this.pos.y,this.r,0,Math.PI * 2, false)
        ctx.closePath()
        ctx.fillStyle = 'green'
        ctx.fill()
    }

    update() {
        this.draw()
        this.pos.x += this.vel.x
        this.pos.y += this.vel.y
    }
}

const intervalId_Bouncy = window.setInterval(() => {
    if (bouncy_projectiles_display.length < 8)
    bouncy_projectiles_display.push(
        new BouncyProjectileDisplay({
            pos : {
                x : Math.random() * (canvas.width - 50) + 50,
                y : Math.random() * (canvas.height - 50) + 50
            }
        }
    ))
}, 8000)