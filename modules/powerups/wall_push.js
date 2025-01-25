class Wall_PushDisplay {
    constructor({pos}) {
        this.pos = pos
        this.r = 15
    }

    draw() {
        ctx.beginPath();
        // ctx.lineWidth = "4";
        ctx.rect(this.pos.x, this.pos.y,this.r,this.r)
        ctx.strokeStyle = "yellow";
        ctx.stroke();
        ctx.closePath()
    }

    update() {
        this.draw()
    }
}

class Wall_Push {
    constructor({pos,vel, rotation}) {
        this.width = 20
        this.height = 100

        this.pos = pos
        this.vel = vel
        this.rotation = rotation
    }

    draw() {
        ctx.save()

        ctx.translate(this.pos.x,this.pos.y)
        ctx.rotate(this.rotation)
        ctx.translate(-this.pos.x, -this.pos.y)

        ctx.beginPath();
        ctx.rect(this.pos.x,this.pos.y,this.width,this.height)

        ctx.strokeStyle = "yellow";
        ctx.stroke();
        ctx.closePath()

        ctx.restore()
    }

    update() {
        this.draw()
        this.pos.x += this.vel.x
        this.pos.y += this.vel.y
    }
}

const intervalId_Wall = window.setInterval(() => {
    if (wall_push.length < 1) {
        wall_push_display.push(
            new Wall_PushDisplay({
                pos : {
                    x : Math.random() * (canvas.width - 50) + 50,
                    y : Math.random() * (canvas.height - 50) + 50
                }
            })
        )
    }
}, 1000)