const gameArea = globals.gameArea = new GameArea(10, 40, 20);
let currentBlock;

let blockX = 3;
let blockY = 20;

function start() {
    globals.canvas = document.getElementById("canvas");
    globals.context = canvas.getContext("2d");

    globals.context.moveTo(0,0);
    globals.gameArea.draw();

    currentBlock = generateBlock();
    frame();
}

function checkCollision(x, y) {
    try {
        const tile = gameArea.getTile(x, y);
        debugger;
        return tile !== undefined;
    } catch (error) {
        if (error.underBottom) {
            debugger;
           return true;
        } else {
            debugger;
            throw error;
        }
    }
}

function frame() {
    // Clear the current drawing area
    globals.context.clearRect(0, 0, globals.canvas.width, globals.canvas.height);

    // Check future
    let collisionImminent = currentBlock.someElem(pos => checkCollision(blockX + pos.x, blockY + pos.y - 1));
    if (collisionImminent)
    {
        gameArea.applyBlock(blockX, blockY, currentBlock);
        blockApplied = true;

        currentBlock = generateBlock(); 
        blockX = 3;
        blockY = 20;
    }
    else {
        blockY -= 1;
        currentBlock.draw(blockX, blockY);
    }

    // Draw game area no matter what happens
    gameArea.draw();

    // Call the next frame after 500ms
    setTimeout(frame, 100);
}