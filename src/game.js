let moveLocked = false;
let moveBuffer;

const kickOffsets = [
    {x: -1, y:  0},
    {x:  1, y:  0},
    {x:  0, y: -1},
    {x:  0, y:  1}
];

const scoreTable = [
    [0, 40, 100, 300, 1200]
];

class Game {
    constructor(canvas, gameArea) {
        this.gameCanvas = canvas;
        this.gameArea = gameArea;
        this.blockPos = {x: 3, y: 20};

        this.currentBlock = generateBlock();
        this.moveBuffer = undefined;
        this.moveLocked = false;

        this.score = 0;
    }

    genCopy(pos, offsetX, offsetY) {
        return {x: pos.x + offsetX, y: pos.y + offsetY};
    }

    rotate() {
        if (moveLocked) {
            moveBuffer = rotate.bind(this);;
            return;
        }

        if (!this.currentBlock.someRotatedElem(pos => this.gameArea.checkCollision(pos, this.blockPos))) {
            //console.log("Good rotate!");
            this.currentBlock.rotate();
        } else {
            // Try to kick from walls
            for (let i = 0; i < kickOffsets.length; i++) {
                let offset = genCopy(this.blockPos, kickOffsets[i].x, kickOffsets[i].y);
                if (!this.currentBlock.someRotatedElem(pos => this.gameArea.checkCollision(pos, offset))) {
                    //console.log("Kicked!");
                    this.blockPos = genCopy(this.blockPos, kickOffsets[i].x, kickOffsets[i].y);
                    this.currentBlock.rotate();
                    break;
                }
            }
        }

        this.drawFrame();
    }

    skipToContact() {
        if (moveLocked) {
            moveBuffer = skipToContact.bind(this);;
            return;
        }

        while (!this.currentBlock.someElem(
            pos => this.gameArea.checkCollision(pos, this.genCopy(this.blockPos, 0, -1)))) {
                this.blockPos.y -= 1;
        }

        this.placeTetromino();
        this.createNewBlock();

        this.drawFrame();
    }

    moveLeft() {
        if (moveLocked) {
            moveBuffer = moveLeft.bind(this);;
            return;
        }

        if (!this.currentBlock.someElem(pos => this.gameArea.checkCollision(pos, this.genCopy(this.blockPos, -1, 0))))
            this.blockPos.x -= 1;

        this.drawFrame();
    }

    moveRight() {
        if (moveLocked) {
            moveBuffer = moveRight.bind(this);
            return;
        }

        if (!this.currentBlock.someElem(pos => this.gameArea.checkCollision(pos, this.genCopy(this.blockPos, 1, 0))))
            this.blockPos.x += 1;

        this.drawFrame();
    }

    createNewBlock() {
        this.currentBlock = generateBlock(); 
        this.blockPos = {x: 3, y: 20};
    }

    advanceFrame() {
        // Disable moving during update
        moveLocked = true;
        
        // Check future
        let collisionImminent = this.currentBlock.someElem(pos => this.gameArea.checkCollision(pos, this.genCopy(this.blockPos, 0, -1)));
        if (collisionImminent)
        {
            this.placeTetromino();
            this.createNewBlock();
        }
        else {
            this.blockPos.y -= 1;
        }

        // Release move lock
        moveLocked = false;
        if (moveBuffer) {
            moveBuffer();
            moveBuffer = undefined;
        }

        this.drawFrame();
    }

    placeTetromino() {
        const deletedLines = this.gameArea.applyBlock(this.blockPos, this.currentBlock);
        if (deletedLines > 0) {
            const pointValue = scoreTable[0][deletedLines];
            this.score += pointValue;
            emit("scoreChange", this.score, pointValue);
        }
    }

    drawFrame() {
        // Clear the current drawing area
        this.gameCanvas.clear();
        this.gameArea.draw(this.gameCanvas);
        this.gameArea.drawSingleBlock(this.gameCanvas, this.blockPos, this.currentBlock);
    }
}