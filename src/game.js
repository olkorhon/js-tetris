const gameArea = globals.gameArea = new GameArea(10, 40, 20);
let currentBlock;

let blockPos = {x: 3, y:20};

let moveLocked = false;
let moveBuffer;

let kickOffsets = [
    {x: -1, y:  0},
    {x:  1, y:  0},
    {x:  0, y: -1},
    {x:  0, y:  1}
];

function start() {
    globals.canvas = document.getElementById("canvas");
    globals.context = canvas.getContext("2d");
    globals.canvas.focus();
    globals.canvas.style.background = "black";

    globals.context.moveTo(0,0);
    globals.gameArea.draw();

    currentBlock = generateBlock();
    frame();
}

function genCopy(pos, offsetX, offsetY) {
    return {x: pos.x + offsetX, y: pos.y + offsetY};
}

function onKeyboardEvent(e) {
    let key = e.keyCode ? e.keyCode : e.which;
    if (key == 38) {
        if (moveLocked) moveBuffer = rotate;
        else            rotate();
    }
    if (key == 40) {
        if (moveLocked) moveBuffer = skipToContact;
        else            skipToContact();
    }
    if (key == 37) {
        if (moveLocked) moveBuffer = moveLeft;
        else            moveLeft();
    }
    if (key == 39) {
        if (moveLocked) moveBuffer = moveRight;
        else            moveRight();
    }

    refreshScreen();
}

function rotate() {
    if (!currentBlock.someRotatedElem(pos => gameArea.checkCollision(pos, blockPos))) {
        //console.log("Good rotate!");
        currentBlock.rotate();
    } else {
        // Try to kick from walls
        for (let i = 0; i < kickOffsets.length; i++) {
            let offset = genCopy(blockPos, kickOffsets[i].x, kickOffsets[i].y);
            if (!currentBlock.someRotatedElem(pos => gameArea.checkCollision(pos, offset))) {
                //console.log("Kicked!");
                blockPos = genCopy(blockPos, kickOffsets[i].x, kickOffsets[i].y);
                currentBlock.rotate();
                break;
            }
        }
    }
}

function skipToContact() {
    while (!currentBlock.someElem(pos => gameArea.checkCollision(pos, genCopy(blockPos, 0, -1)))) {
        blockPos.y -= 1;
    }

    gameArea.applyBlock(blockPos, currentBlock);
    createNewBlock();
}

function moveLeft() {
    if (!currentBlock.someElem(pos => gameArea.checkCollision(pos, genCopy(blockPos, -1, 0))))
        blockPos.x -= 1;
}

function moveRight() {
    if (!currentBlock.someElem(pos => gameArea.checkCollision(pos, genCopy(blockPos, 1, 0))))
        blockPos.x += 1;
}

function createNewBlock() {
    currentBlock = generateBlock(); 
    blockPos = {x: 3, y: 20};
}

function frame() {
    // Move block
    moveLocked = true;
    
    // Check future
    let collisionImminent = currentBlock.someElem(pos => gameArea.checkCollision(pos, genCopy(blockPos, 0, -1)));
    if (collisionImminent)
    {
        //console.log("Collision imminent");
        gameArea.applyBlock(blockPos, currentBlock);
        blockApplied = true;
        createNewBlock();
    }
    else {
        blockPos.y -= 1;
    }

    // Release move lock
    moveLocked = false;
    if (moveBuffer) {
        moveBuffer();
        moveBuffer = undefined;
    }

    refreshScreen();

    // Call the next frame after 500ms
    setTimeout(frame, 500);
}

function refreshScreen() {
    // Clear the current drawing area
    globals.context.clearRect(0, 0, globals.canvas.width, globals.canvas.height);

    gameArea.draw();
    currentBlock.draw(blockPos);
}