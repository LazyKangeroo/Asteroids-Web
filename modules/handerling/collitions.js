/* Player with Asteroids*/
function circleTriangleCollision(circle, triangle) {
  // Check if the circle is colliding with any of the triangle's edges
  for (let i = 0; i < 3; i++) {
    let start = triangle[i];
    let end = triangle[(i + 1) % 3];

    let dx = end.x - start.x;
    let dy = end.y - start.y;
    let length = Math.sqrt(dx * dx + dy * dy);

    let dot =
      ((circle.pos.x - start.x) * dx + (circle.pos.y - start.y) * dy) /
      Math.pow(length, 2);

    let closestX = start.x + dot * dx;
    let closestY = start.y + dot * dy;

    if (!isPointOnLineSegment(closestX, closestY, start, end)) {
      closestX = closestX < start.x ? start.x : end.x;
      closestY = closestY < start.y ? start.y : end.y;
    }

    dx = closestX - circle.pos.x;
    dy = closestY - circle.pos.y;

    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance <= circle.r) {
      return true;
    }
  }
  // No collision
  return false;
}

function isPointOnLineSegment(x, y, start, end) {
  return (
    x >= Math.min(start.x, end.x) &&
    x <= Math.max(start.x, end.x) &&
    y >= Math.min(start.y, end.y) &&
    y <= Math.max(start.y, end.y)
  );
}

/* Asteroid with Asteroids */
function circleCollition(circle1, circle2) {
  const xDistance = circle1.pos.x - circle2.pos.x;
  const yDistance = circle1.pos.y - circle2.pos.y;

  const Distance = Math.sqrt(xDistance ** 2 + yDistance ** 2);
  if (Distance < circle1.r + circle2.r) {
    return true;
  }
  return false;
}

function circleRectCollition(circle, rect) {
  // const rect_center = {
  //   x: rect.pos.x + rect.width / 2,
  //   y: rect.pos.y + rect.height / 2,
  // };
  // const xDistance = circle.pos.x - rect_center.x;
  // const yDistance = circle.pos.y - rect_center.y;

  // if (
  //   xDistance > rect.width / 2 + circle.r &&
  //   yDistance > rect.height / 2 + circle.r
  // ) {
  //   return false;
  // }
  // if (xDistance == rect.width / 2 || yDistance == rect.height / 2) {
  //   return true;
  // } else if (
  //   xDistance * xDistance + yDistance * yDistance <=
  //   circle.r * circle.r
  // ) {
  //   return true;
  // }
  // Find the closest point on the rectangle to the circle's center
  const closestX = Math.max(
    rect.pos.x,
    Math.min(circle.pos.x, rect.pos.x + rect.width)
  );
  const closestY = Math.max(
    rect.pos.y,
    Math.min(circle.pos.y, rect.pos.y + rect.height)
  );

  // Calculate the distance between the circle's center and the closest point on the rectangle
  const dx = circle.pos.x - closestX;
  const dy = circle.pos.y - closestY;

  // If the distance is less than or equal to the radius, a collision occurred
  const distance = Math.sqrt(dx * dx + dy * dy);
  if (distance <= circle.r) return true;
}

function projectileCollition_handle(asteroid, num) {
  // Points
  player.score += 10;

  // Sizing asteroid
  if (asteroid.r <= 20) {
    asteroids.splice(num, 1);
  } else {
    asteroid.r = asteroid.r / 2;
  }
}
