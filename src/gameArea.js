class GameArea {
    constructor(bufferWidth, bufferHeight, displayedHeight) {
        this.area = new Array(bufferWidth * bufferHeight);

        this.bufferWidth = bufferWidth;
        this.bufferHeight = bufferHeight;
        this.displayedHeight = displayedHeight;

        this.yOffset = (bufferHeight - displayedHeight - 1);
    }

    getWidth()  { return this.bufferWidth;  }
    getHeight() { return this.bufferHeight; }

    enforceBounds(x, y) {
        let error;
        if (x >= this.bufferWidth) {
            error = new Error("X value above area width");
            error.specifics = `x(${x}) >= width(${this.bufferWidth})`;
        }
        if (x < 0) {
            error = new Error("X value below 0");
            error.specifics = `x(${x}) < 0`;
        }
        if (y >= this.bufferHeight) {
            error = new Error("Y value above area height");
            error.specifics = `y(${y}) >= height(${this.bufferHeight})`;
        }
        if (y < 0) {
            error = new Error("Y value below 0");
            error.specifics = `y(${y}) < 0`;
        }
        if (error) {
            throw error;
        }
    }

    setTile(x, y, colorVariant, id) {
        this.enforceBounds(x, y);
        this.area[x + y * this.bufferWidth] = {colorVariant: colorVariant, id: id};
    }
    getTile(x, y) {
        this.enforceBounds(x, y);
        return this.area[x + y * this.bufferWidth];
    }

    applyTetromino(pos, tetromino) {
        let touchedLines = {};
        tetromino.forEachElem((block) => {
            this.setTile(pos.x + block.x, pos.y + block.y, tetromino.colorVariant, block.id);
            touchedLines[(pos.y + block.y).toString()] = true;
        });

        let filteredLines = Object.keys(touchedLines).map(number => parseInt(number, 10));
        let completeLines = filteredLines.filter(this.lineComplete.bind(this));

        if (completeLines.length > 0)
            this.removeLines(completeLines);

        return completeLines.length;
    }

    removeLines(lines) {
        let offset = 0;
        for (let j = 0; j < this.bufferHeight; j++) {
            if (lines.includes(j)) {
                offset--;
                continue;
            }

            for (let i = 0; i < this.bufferWidth; i++) {
                this.area[i + (j + offset) * this.bufferWidth] = this.area[i + j * this.bufferWidth];
            }
        }

        for (let j = this.bufferHeight - 1 + offset; j <= this.bufferHeight; j++) {
            for (let i = 0; i < this.bufferWidth; i++) {
                this.area[i + j * this.bufferWidth] = undefined;
            }
        }
    }

    lineComplete(line) {
        for (let i = 0; i < this.bufferWidth; i++) {
            if (this.area[line * this.bufferWidth + i] === undefined)
                return false;
        }
        return true;
    }

    checkCollision(pos, offset={x:0, y:0}) {
        try {
            return this.getTile(pos.x + offset.x, pos.y + offset.y) !== undefined;
        } catch (error) {
            return true;
        }
    }

    draw(canvas, blockImages) {
        const blockWidth = canvas.width   / this.bufferWidth;
        const blockHeight = canvas.height / this.displayedHeight;
        
        for (let i = 0; i < this.bufferWidth; i++) {
            for (let j = 0; j < this.bufferHeight; j++) {
                const tile = this.getTile(i, j);
                if (tile !== -1 && tile !== undefined) {
                    canvas.beginPath();
                    canvas.drawImageBlock(
                        blockWidth * i,
                        -blockHeight * j + blockHeight * this.yOffset,
                        blockWidth,
                        blockHeight,
                        blockImages,
                        tile.colorVariant,
                        tile.id);

                    canvas.fillShape();
                    canvas.drawShapeOutline();
                }
            }
        }
    }

    drawSingleBlock(canvas, blockImages, pos, tetromino) {
        const blockWidth  = canvas.width  / this.bufferWidth;
        const blockHeight = canvas.height / this.displayedHeight;

        canvas.beginPath();
        tetromino.forEachElem((block) => {
            canvas.drawImageBlock(
                blockWidth  * (pos.x + block.x),
                -blockHeight * (pos.y + block.y) + blockHeight * this.yOffset,
                blockWidth,
                blockHeight,
                blockImages,
                tetromino.colorVariant,
                block.id);
        });

        canvas.fillShape();
        canvas.drawShapeOutline();
    }
}