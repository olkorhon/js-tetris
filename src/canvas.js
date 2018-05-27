class Canvas {
    constructor(canvasElement) {
        this.canvasElement = canvasElement;
        this.context = this.canvasElement.getContext("2d");

        this.width = this.canvasElement.width;
        this.height = this.canvasElement.height;
    }

    fillBg(color) {
        this.context.beginPath();
        this.context.fillStyle = color;
        this.context.rect(0, 0, this.width, this.height);
        this.context.fill();
    }

    drawText(text, x, y, alignment, font='42px "Comic Sans MS"') {
        this.context.beginPath();
        this.context.fillStyle = "White";
        this.context.font = font;
        this.context.textAlign = alignment;
        this.context.fillText(text, x, y);
    }

    beginPath() {
        this.context.beginPath();
    }

    drawImageBlock(x, y, width, height, blockImages, colorVariant, id) {
        this.context.drawImage(
            blockImages,
            64 * (id % 4),
            64 * Math.floor(id / 4) + 256 * colorVariant,
            64,
            64,
            x, y, width, height);
    }

    drawShapeOutline() {
        this.context.stroke();
    }

    fillShape() {
        this.context.fill();
    }

    clear() {
        this.context.clearRect(0, 0, this.width, this.height);
    }
}

function onKeyboardEvent(e) {
    let key = e.keyCode ? e.keyCode : e.which;
    if (key == 38) this.rotate();
    if (key == 40) this.skipToContact();
    if (key == 37) this.moveLeft();
    if (key == 39) this.moveRight();
    if (key == 32) this.togglePause();
}

window.addEventListener("load", gameOnload);
function gameOnload() {
    console.log("Event triggered: load");

    window.removeEventListener("load", gameOnload);
    const canvasGame = document.getElementById("gameCanvas");
    const gameCanvas = new Canvas(canvasGame);

    //canvas.style.background = "black";
    canvasGame.focus();

    const blockImages = document.getElementById("blocks");
    const gameArea = new GameArea(10, 40, 20);
    const game = new Game(gameCanvas, gameArea, blockImages);

    // Call advance frame on set interval
    setInterval(game.advanceFrame.bind(game), 500);
    window.onkeydown = onKeyboardEvent.bind(game);
};
