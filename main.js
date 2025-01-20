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

    // powerup management //
        // Shield
    if (shields.length > 0) {
        shields[0].update()
        if (!shields[0].active) {
            if (circleTriangleCollision(shields[0], player.getVertices())) {
                shields[0].active = true
            }
        }
    }
        // Fast projectiles
    if (fast_projectiles.length > 0) {
        fast_projectiles[0].update()
        if (!fast_projectiles[0].active) {
            if (circleTriangleCollision(fast_projectiles[0], player.getVertices())) {
                fast_projectiles[0].active = true
            }
        }
    }

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

        // COllition of ast and player
        if (circleTriangleCollision(asteroid, player.getVertices())) {
            if (shields.length > 0 && shields[0].active) {
                // if shield is equipt then ast is destoryed
                player.score += 10
                shields.splice(0,1)
                asteroids.splice(i,1)
            } else {
                console.log('GAME OVER')
                console.log(`Score ${player.score}`)
                window.cancelAnimationFrame(animationId)
                clearInterval(intervalId_Ast)
                clearInterval(intervalId_Shield)
                window.alert(`GAME OVER \n Score : ${player.score}`)
            }
        }

        // Collition of ast and projectile
        for (let j = projectiles.length - 1; j >= 0; j--) {
            const projectile = projectiles[j]
            if (circleCollition(asteroid, projectile)) {
                ast_proj_handling(asteroid,asteroids,projectiles,i,j)
            }
        }
        if (fast_projectiles.length > 0) {
            if (circleCollition(asteroid, fast_projectiles[0])) {
                ast_proj_handling(asteroid,asteroids,fast_projectiles,i,0)
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