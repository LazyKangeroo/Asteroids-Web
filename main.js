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

    // Wall Push
    for (let i = wall_push_display.length - 1; i >= 0; i--) {
        const wall = wall_push_display[i]
            wall.update()
        if (circleTriangleCollision(wall, player.getVertices()) && !bouncy_projectiles_pickup >= 1) {
            wall_push_display.splice(i,1)
            wall_push_pickup += 1
        }
    }
    for (let i = wall_push.length - 1; i >= 0; i--) {
        const wall = wall_push[i]
        wall.update()

        if (wall.pos.x + wall.r < 0 || wall.pos.x > canvas.width || wall.pos.y + wall.r < 0 || wall.pos.y > canvas.height) {
            wall_push.splice(i,1)
        }
    }

    // bouncy projectiles
    for (let i = bouncy_projectiles_display.length - 1; i >= 0; i--) {
        const projectile = bouncy_projectiles_display[i]
            projectile.update()
        if (circleTriangleCollision(projectile, player.getVertices()) && !wall_push_pickup >= 1) {
            bouncy_projectiles_display.splice(i,1)
            bouncy_projectiles_pickup += 1
        }
    }
    for (let i = bouncy_projectiles.length - 1; i >= 0; i--) {
        const projectile = bouncy_projectiles[i]
        projectile.update()
        if (projectile.pos.x + projectile.r < 0 || projectile.pos.x > canvas.width || projectile.pos.y + projectile.r < 0 || projectile.pos.y > canvas.height) {
            bouncy_projectiles.splice(i,1)
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
                // Disable spawning
                window.cancelAnimationFrame(animationId)
                clearInterval(intervalId_Ast)
                clearInterval(intervalId_Shield)
                clearInterval(intervalId_Bouncy)
                clearInterval(intervalId_Wall)

                // Display Scores
                window.alert(`GAME OVER \n Score : ${player.score}`)
                console.log('GAME OVER')
                console.log(`Score ${player.score}`)
            }
        }

        // bouncy projectiles collition{
        for (let j = bouncy_projectiles.length - 1; j >= 0; j--) {
            const projectile = bouncy_projectiles[j]
            if (circleCollition(asteroid, projectile)) {
                bouncy_projectile_directionChange(projectile)
                projectileCollition_handle(asteroid,i)
            }
        }
        // Collition of ast and projectile
        for (let j = projectiles.length - 1; j >= 0; j--) {
            const projectile = projectiles[j]
            if (circleCollition(asteroid, projectile)) {
                projectiles.splice(j,1)
                projectileCollition_handle(asteroid,i)
            }
        }
        // Wall ast colltion
        for (let j = wall_push.length - 1; j >= 0; j--) {
            const wall = wall_push[j]
            if (circleRectCollition(asteroid,wall)) {
                asteroid.vel.y = wall.vel.y
                asteroid.vel.x = wall.vel.x
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