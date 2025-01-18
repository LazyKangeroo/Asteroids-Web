const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

class Player {
    constructor({ pos, vel }) {
        this.pos= pos // (x,y)
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
    vel : {x : 0, y:0},
    pos : {x : canvas.width / 2, y : canvas.height/ 2}
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
            console.log(projectiles)
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
const ROTATION = 0.05

const projectiles = []
const PROJECTILE_SPEED = 8

function animate() {
    window.requestAnimationFrame(animate)
    ctx.fillStyle = 'black'
    ctx.fillRect(0,0,canvas.width,canvas.height)

    player.update();

    for (let i = projectiles.length - 1; i >= 0; i--) {
        const projectile = projectiles[i]
        projectile.update()

        if (projectile.pos.x + projectile.r < 0 || projectile.pos.x > canvas.width || projectile.pos.y + projectile.r < 0 || projectile.pos.y > canvas.height) {
            projectiles.splice(i,1)
        }
    }
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