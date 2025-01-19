const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

// initing player object
const player = new Player({
    vel : {x : 0, y : 0},
    pos : {x : canvas.width / 2, y : canvas.height / 2}
})


function animate() {
    const animationId = window.requestAnimationFrame(animate)
    ctx.fillStyle = 'black'
    ctx.fillRect(0,0,canvas.width,canvas.height)

    player.update();

    // Projectile management
    for (let i = projectiles.length - 1; i >= 0; i--) {
        const projectile = projectiles[i]
        projectile.update()

        if (projectile.pos.x + projectile.r < 0 || projectile.pos.x > canvas.width || projectile.pos.y + projectile.r < 0 || projectile.pos.y > canvas.height) {
            projectiles.splice(i,1)
        }
    }
    // Ast management
    for (let i = asteroids.length - 1; i >= 0; i--) {
        const asteroid = asteroids[i]
        asteroid.update()

        // out of screen
       if (asteroid.pos.x + asteroid.r < 0 || asteroid.pos.x > canvas.width || asteroid.pos.y + asteroid.r < 0 || asteroid.pos.y > canvas.height) {
            asteroids.splice(i,1)
        }

        if (circleTriangleCollision(asteroid, player.getVertices())) {
            console.log('GAME OVER')
            console.log(`Score ${player.score}`)
            window.cancelAnimationFrame(animationId)
            clearInterval(intervalId)
            window.alert(`GAME OVER \n Score : ${player.score}`)
          }

        // Collition
        for (let j = projectiles.length - 1; j >= 0; j--) {
            const projectile = projectiles[j]
            if (circleCollition(asteroid, projectile)) {
                projectiles.splice(j,1)

                // Points
                player.score += 10

                // Sizing asteroid
                if (asteroid.r <= 20) asteroids.splice(i,1)
                    else if (asteroid.r >= 20) { asteroid.r = asteroid.r / 2 }
            }
        }
    }
    // Player movement
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