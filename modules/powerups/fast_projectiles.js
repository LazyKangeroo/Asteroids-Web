class FastProjectiles {
    constructor({pos, vel}) {
        this.pos = pos
        this.vel = vel
        this.r = 12
        this.r_active = 3

        this.active = false
    }

    inti_draw() {
        ctx.beginPath()
        ctx.arc(this.pos.x,this.pos.y,this.r,0,Math.PI * 2, false)
        ctx.closePath()
        ctx.fillStyle = 'blue'
        ctx.fill()
    }

    active_draw() {
        ctx.beginPath()
        ctx.arc(this.pos.x,this.pos.y,this.r,0,Math.PI * 2, false)
        ctx.closePath()
        ctx.fillStyle = 'blue'
        ctx.fill()
    }

    draw() {
        if (this.active) {
            this.r = this.r_active
            this.active_draw()
        } else {
            this.inti_draw()
        }
    }

    update() {
        this.draw()
        this.pos.x += this.vel.x
        this.pos.y += this.vel.y
    }
}

const intervalId_fast = window.setInterval(() =>{
    fast_projectiles.push(new FastProjectiles({
        pos : {
            x : player.pos.x + Math.cos(player.rotation) * 30 ,
            y: player.pos.y + Math.sin(player.rotation) * 30
        }, vel : {
            x : Math.cos(player.rotation) * PROJECTILE_SPEED * 2,
            y : Math.sin(player.rotation) * PROJECTILE_SPEED * 2
        }
    }))
}, Math.floor(Math.random() * (10000 - 5000) + 5000))