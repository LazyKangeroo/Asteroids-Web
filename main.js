const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// function eventHandler() {
//     document.addEventListener('keydown', (e) => {
//         switch(e.key) {
//             case 'ArrowUp':
//                 player.updatePosition(0, -player.speed);
//                 break;
//             case 'ArrowDown':
//                 player.updatePosition(0, player.speed);
//                 break;
//             case 'ArrowLeft':
//                 player.updatePosition(-player.speed, 0);
//                 break;
//             case 'ArrowRight':
//                 player.updatePosition(player.speed, 0);
//                 break;
//         }
//     });
// }


// Event listener for window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});