function bouncy_projectile_directionChange(projectile) {
    const change = Math.floor(Math.random())
    switch (change) {
        case 0:
            projectile.vel.x *= -1
            break;
        case 1:
            projectile.vel.y *= -1
            break;
    }
}