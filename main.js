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

        // ctx.arc(this.pos,this.pos,5,0,Math.PI * 2, false)
        // ctx.fillStyle = 'red'
        // ctx.fill()

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

function animate() {
    window.requestAnimationFrame(animate)
    ctx.fillStyle = 'black'
    ctx.fillRect(0,0,canvas.width,canvas.height)
    player.update();

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