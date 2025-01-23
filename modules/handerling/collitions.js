/* Player with Asteroids*/
function circleTriangleCollision(circle, triangle) {
    // Check if the circle is colliding with any of the triangle's edges
    for (let i = 0; i < 3; i++) {
      let start = triangle[i]
      let end = triangle[(i + 1) % 3]

      let dx = end.x - start.x
      let dy = end.y - start.y
      let length = Math.sqrt(dx * dx + dy * dy)

      let dot = ((circle.pos.x - start.x) * dx +
          (circle.pos.y - start.y) * dy) /
        Math.pow(length, 2)

      let closestX = start.x + dot * dx
      let closestY = start.y + dot * dy

      if (!isPointOnLineSegment(closestX, closestY, start, end)) {
        closestX = closestX < start.x ? start.x : end.x
        closestY = closestY < start.y ? start.y : end.y
      }

      dx = closestX - circle.pos.x
      dy = closestY - circle.pos.y

      let distance = Math.sqrt(dx * dx + dy * dy)

      if (distance <= circle.r) {
        return true
      }
    }
    // No collision
    return false
  }

  function isPointOnLineSegment(x, y, start, end) {
    return (
      x >= Math.min(start.x, end.x) &&
      x <= Math.max(start.x, end.x) &&
      y >= Math.min(start.y, end.y) &&
      y <= Math.max(start.y, end.y)
    )
  }

/* Asteroid with Asteroids */
function circleCollition(circle1,circle2) {
    const xDistance = circle1.pos.x - circle2.pos.x
    const yDistance = circle1.pos.y - circle2.pos.y

    const Distance = Math.sqrt(xDistance ** 2 + yDistance ** 2)
    if (Distance < circle1.r + circle2.r) {
        return true
    }
    return false
}

function projectileCollition_handle(asteroid,num) {
  // Points
  player.score += 10

  // Sizing asteroid
  if (asteroid.r <= 20) asteroids.splice(num,1)
      else if (asteroid.r >= 20) { asteroid.r = asteroid.r / 2 }
}