class Shield {
    constructor({pos}) {
        // Not picked up
        this.r = 12
        this.pos = pos

        // says if picked up
        this.active = false
    }

    init_draw() {
        ctx.beginPath()
        ctx.arc(this.pos.x,this.pos.y,this.r,0,Math.PI * 2, false)
        ctx.closePath()
        ctx.strokeStyle= 'yellow'
        ctx.stroke()
    }

    active_draw() {
        ctx.save()

        ctx.translate(player.pos.x,player.pos.y)
        ctx.rotate(player.rotation)
        ctx.translate(-player.pos.x, -player.pos.y)

        ctx.beginPath()
        ctx.moveTo(player.pos.x + 40, player.pos.y)
        ctx.lineTo(player.pos.x - 20, player.pos.y - 20)
        ctx.lineTo(player.pos.x - 20, player.pos.y + 20)
        ctx.closePath()
        ctx.strokeStyle = 'yellow'
        ctx.stroke()

        ctx.restore()
    }

    draw() {
        // Drawing center of ships pos
        if (this.active) {
            this.active_draw() 
        } else if (!this.active) {
            this.init_draw()
        }
    }

    update() {
        this.draw()
    }
}

const intervalId_Shield = window.setInterval(() => {
    if (shields.length < 1) {
        shields.push(
            new Shield({
                pos : {
                    x : Math.random() * (canvas.width - 50) + 50,
                    y : Math.random() * (canvas.height - 50) + 50
                }
            })
        )
    }
}, 3000)