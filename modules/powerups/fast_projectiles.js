class FastProjectileDisplay {
    constructor({pos}) {
        this.pos = pos
        this.r = 12
    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.pos.x,this.pos.y,this.r,0,Math.PI * 2, false)
        ctx.closePath()
        ctx.strokeStyle = 'blue'
        ctx.stroke()
    }

    update() {
        this.draw()
    }
}

class FastProjectile {
    constructor({ pos,vel }) {
        this.pos = pos
        this.vel = vel
        this.r = 3
    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.pos.x,this.pos.y,this.r,0,Math.PI * 2, false)
        ctx.closePath()
        ctx.fillStyle = 'blue'
        ctx.fill()
    }

    update() {
        this.draw()
        this.pos.x += this.vel.x
        this.pos.y += this.vel.y
    }
}

const intervalId_fast = window.setInterval(() => {
    fast_projectiles_display.push(
        new FastProjectileDisplay({
            pos : {
                x : Math.random() * (canvas.width - 50) + 50,
                y : Math.random() * (canvas.height - 50) + 50
            }
        }
    ))
    console.log(fast_projectiles_display);
}, 6000)