const keys = {
    w : {
        pressed : false
    },
    d : {
        pressed : false
    },
    a : {
        pressed : false
    },
    space : {
        pressed : false
    }
}

window.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'KeyW' :
            keys.w.pressed = true;
            break
        case 'KeyA':
            keys.a.pressed = true;
            break
        case 'KeyD':
            keys.d.pressed = true;
            break
        case 'Space':
            if (!bouncy_projectiles_pickup >= 1) {
                projectiles.push(new Projectiles({
                    pos : {
                        x : player.pos.x + Math.cos(player.rotation) * 30 ,
                        y: player.pos.y + Math.sin(player.rotation) * 30
                    }, vel : {
                        x : Math.cos(player.rotation) * PROJECTILE_SPEED,
                        y : Math.sin(player.rotation) * PROJECTILE_SPEED
                    }
                }))
            }
            else if (bouncy_projectiles_pickup >= 1) {
                bouncy_projectiles.push(new BouncyProjectile({
                    pos : {
                        x : player.pos.x + Math.cos(player.rotation) * 30 ,
                        y: player.pos.y + Math.sin(player.rotation) * 30
                    }, vel : {
                        x : Math.cos(player.rotation) * PROJECTILE_SPEED,
                        y : Math.sin(player.rotation) * PROJECTILE_SPEED
                    }
                }))
                bouncy_projectiles_pickup -= 1
            }
            break
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.code) {
        case 'KeyW' :
            keys.w.pressed = false;
            break
        case 'KeyA':
            keys.a.pressed = false;
            break
        case 'KeyD':
            keys.d.pressed = false;
            break
    }
})