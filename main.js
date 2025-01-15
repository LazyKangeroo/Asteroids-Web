const { request } = require("express");

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



function gameLoop() {
    // Clear canvas
    ctx.clearRect(0,0, canvas.width, canvas.height);

    // draw game objs
    drawPlayer();
    drawAsteroids();

    updateGame();

    // requisting next animation frame
    requestAnimationFrame(gameLoop);
}


function eventHandler() {
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowUp':
                player.updatePosition(0, -player.speed);
                break;
            case 'ArrowDown':
                player.updatePosition(0, player.speed);
                break;
            case 'ArrowLeft':
                player.updatePosition(-player.speed, 0);
                break;
            case 'ArrowRight':
                player.updatePosition(player.speed, 0);
                break;
        }
    });
}

function startGame() {
    gameLoop();
}

// Event listener for window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Start the game when the page loads
startGame();