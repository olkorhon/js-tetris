class GameArea {
    constructor(bufferWidth, bufferHeight, displayedHeight) {
        this.area = new Array(bufferWidth * bufferHeight);

        this.bufferWidth = bufferWidth;
        this.bufferHeight = bufferHeight;
        this.displayedHeight = displayedHeight;

        globals.yOffset = (bufferHeight - displayedHeight - 1) * 40;
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
            error.underBottom = true;
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

    applyBlock(x, y, block) {
        block.forEachElem((pos) => {
            this.setTile(x + pos.x, y + pos.y, block.color);
        });
    }

    draw() {
        globals.context.rect(0, 0, 400, 800);
        globals.context.stroke();

        for (let i = 0; i < this.bufferWidth; i++) {
            for (let j = 0; j < this.bufferHeight; j++) {
                if (this.area[i + j * this.bufferWidth]) {
                    globals.context.fillStyle = this.area[i + j * this.bufferWidth];
                    globals.context.fillRect(
                        40 * i,
                        -40 * j + globals.yOffset,
                        40, 40);
                }
            }
        }
    }
}