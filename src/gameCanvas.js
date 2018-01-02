let game = undefined;

const blockSize = undefined;

function onKeyboardEvent(e) {
    let key = e.keyCode ? e.keyCode : e.which;
    if (key == 38) {
        game.rotate();
    }
    if (key == 40) {
        game.skipToContact();
    }
    if (key == 37) {
        game.moveLeft();
    }
    if (key == 39) {
        game.moveRight();
    }
}

window.addEventListener("load", gameOnload);
function gameOnload() {
    console.log("Event triggered: load");

    window.removeEventListener("load", gameOnload);
    const canvas = document.getElementById("gameCanvas");
    canvas.style.background = "black";
    canvas.focus();

    const gameCanvas = new Canvas(canvas);
    const statusCanvas = new Canvas(canvas);

    gameArea = new GameArea(10, 40, 20);
    game = new Game(gameCanvas, gameArea);

    // Call advance frame on set interval
    setInterval(game.advanceFrame.bind(game), 500);
}
window.onkeydown = onKeyboardEvent;