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