class Wall_PushDisplay {
  constructor({ pos }) {
    this.pos = pos;
    this.r = 18;
  }

  draw() {
    ctx.beginPath();
    // ctx.lineWidth = "4";
    ctx.rect(this.pos.x, this.pos.y, this.r, this.r);
    ctx.strokeStyle = "yellow";
    ctx.stroke();
    ctx.closePath();
  }

  update() {
    this.draw();
  }
}

class Wall_Push {
  constructor({ pos, vel }) {
    this.width = 20;
    this.height = 120;

    this.pos = pos;
    this.vel = vel;
  }

  draw() {
    ctx.beginPath();

    /* Checking orintaion of rect*/
    if (this.vel.x > 0 || this.vel.x < 0)
      // right || left
      ctx.rect(this.pos.x, this.pos.y, this.width, this.height);
    else if (this.vel.y > 0 || this.vel.y)
      // top || bottom
      ctx.rect(this.pos.x, this.pos.y, this.height, this.width);

    ctx.strokeStyle = "yellow";
    ctx.stroke();
    ctx.closePath();
  }

  update() {
    this.draw();
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }
}

// Wall Powerup stacking
// Fires every 4th pick up
function wall_create() {
  const random_direction = Math.floor(Math.random() * 2);
  let pos, direction;

  switch (random_direction) {
    case 0: // Left
      console.log("left");
      direction = { x: 1, y: 0 };
      pos = { x: -20, y: Math.random() * (canvas.height - 200) + 200 };
      break;
    case 1: // Right
      console.log("right");
      direction = { x: -1, y: 0 };
      pos = { x: canvas.width, y: Math.random() * (canvas.height - 200) + 200 };
      break;
/* 
	case 2: // top
      direction = { x: 0, y: 1 };
      pos = { x: Math.random() * (canvas.width - 200) + 200, y: -20 };
      break;
    case 3: // bottom
      direction = { x: 0, y: -1 };
      pos = { x: Math.random() * (canvas.width - 200) + 200, y: canvas.height };
      break;
*/
  }
  wall_push.push(
    new Wall_Push({
      pos: {
        x: pos.x,
        y: pos.y,
      },
      vel: {
        x: direction.x * WALL_SPEED,
        y: direction.y * WALL_SPEED,
      },
    })
  );
  console.log(wall_push);
}

const intervalId_Wall = window.setInterval(() => {
  wall_push_display.push(
    new Wall_PushDisplay({
      pos: {
        x: Math.random() * (canvas.width - 100) + 100,
        y: Math.random() * (canvas.height - 100) + 100,
      },
    })
  );
}, 10000);
