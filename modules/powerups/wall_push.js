class Wall_PushDisplay {
    constructor({pos}) {
        this.pos = pos
        this.r = 18
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
    constructor({pos,vel}) {
        this.width = 20
        this.height = 120

        this.pos = pos
        this.vel = vel
    }

    draw() {
        if (!this.vel.x == 0) {
            ctx.beginPath();
            ctx.rect(this.pos.x,this.pos.y,this.width,this.height)

            ctx.strokeStyle = "yellow";
            ctx.stroke();
            ctx.closePath()
        } else {
            ctx.beginPath();
            ctx.rect(this.pos.x,this.pos.y,this.height,this.width)

            ctx.strokeStyle = "yellow";
            ctx.stroke();
            ctx.closePath()
        }
    }

    update() {
        this.draw()
        this.pos.x += this.vel.x
        this.pos.y += this.vel.y
    }
}

// Wall Powerup stacking
// Fires every 4th pick up
function wall_create(num) {
    let direction = 0
    switch (num) {
        case 4:
            direction = {x : -1, y : 0}
            break;
        case 3:
            direction = {x : 1,y : 0}
            break;
        case 2:
            direction = {x : 0,y : -1}
            break;
        case 1:
            direction = {x : 0,y : 1}
            break;
    }
    wall_push.push(new Wall_Push({
        pos : {
            x :  direction.x,
            y:  direction.y
        }, vel : {
            x : direction.x * WALL_SPEED,
            y : direction.y * WALL_SPEED
        }
    }))
    console.log(wall_push);
}

const intervalId_Wall = window.setInterval(() => {
    if (wall_push_display.length < 1) {
        wall_push_display.push(
            new Wall_PushDisplay({
                pos : {
                    x : Math.random() * (canvas.width - 100) + 100,
                    y : Math.random() * (canvas.height - 100) + 100
                }
            })
        )
    }
}, 2000)