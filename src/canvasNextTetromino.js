window.addEventListener("load", nextTetrominoOnload);

let nextCanvasWidth;
let nextCanvasHeight;

function nextTetrominoOnload() {
    window.removeEventListener("load", nextTetrominoOnload);
    const canvas = new Canvas(document.getElementById("nextCanvas"));
    const blockImages = document.getElementById("blocks");

    console.log("Event triggered: load");
    registerListener("tetrominoChange", ([tetromino]) => {
        console.log("Event triggered: tetrominoChange", tetromino);
        refreshTD(canvas, blockImages, tetromino);
    });

    refreshTD(canvas, blockImages, undefined);
    console.log("Status window loaded");
}

function refreshTD(canvas, blockImages, tetromino) {
    canvas.clear();

    if (tetromino) {
        const bufferWidth = 6;
        const bufferHeight = 4;

        const blockWidth  = canvas.width  / bufferWidth;
        const blockHeight = canvas.height / bufferHeight;

        canvas.beginPath();
        tetromino.forEachElem((block) => {
            canvas.drawImageBlock(
                blockWidth  * (1 + block.x),
                -blockHeight * (-2 + block.y),
                blockWidth,
                blockHeight,
                blockImages,
                tetromino.colorVariant,
                block.id);
        });

        canvas.fillShape();
    }
}