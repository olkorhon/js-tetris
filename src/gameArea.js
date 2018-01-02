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

    setTile(x, y, color) {
        this.enforceBounds(x, y);
        this.area[x + y * this.bufferWidth] = color;
    }
    getTile(x, y) {
        this.enforceBounds(x, y);
        return this.area[x + y * this.bufferWidth];
    }

    applyBlock(pos, block) {
        let touchedLines = {};
        block.forEachElem((elemPos) => {
            this.setTile(pos.x + elemPos.x, pos.y + elemPos.y, block.color);
            touchedLines[(pos.y + elemPos.y).toString()] = true;
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

    draw(canvas) {
        const blockWidth = canvas.width   / this.bufferWidth;
        const blockHeight = canvas.height / this.displayedHeight;
        
        for (let i = 0; i < this.bufferWidth; i++) {
            for (let j = 0; j < this.bufferHeight; j++) {
                if (this.area[i + j * this.bufferWidth]) {
                    canvas.beginPath();
                    canvas.drawBlock(
                         blockWidth  * i,
                        -blockHeight * j + blockHeight * this.yOffset,
                         blockWidth,
                         blockHeight,
                        this.area[i + j * this.bufferWidth]);
                    
                    canvas.fillShape();
                    canvas.drawShapeOutline();
                }
            }
        }
    }

    drawSingleBlock(canvas, pos, tetromino) {
        const blockWidth  = canvas.width  / this.bufferWidth;
        const blockHeight = canvas.height / this.displayedHeight;

        canvas.beginPath();
        tetromino.forEachElem((block) => {
            canvas.drawBlock(
                 blockWidth  * (pos.x + block.x),
                -blockHeight * (pos.y + block.y) + blockHeight * this.yOffset,
                 blockWidth,
                 blockHeight,
                tetromino.color);
        });

        canvas.fillShape();
        canvas.drawShapeOutline();
    }
}