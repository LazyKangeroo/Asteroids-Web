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
            if (!fast_projectiles_pickedup >= 1) {
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
            else if (fast_projectiles_pickedup >= 1) {
                fast_projectiles.push(new FastProjectile({
                    pos : {
                        x : player.pos.x + Math.cos(player.rotation) * 30 ,
                        y: player.pos.y + Math.sin(player.rotation) * 30
                    }, vel : {
                        x : Math.cos(player.rotation) * FAST_PROTECTILE_SPEED,
                        y : Math.sin(player.rotation) * FAST_PROTECTILE_SPEED
                    }
                }))
                fast_projectiles_pickedup -= 1
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