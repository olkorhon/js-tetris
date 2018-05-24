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

    drawBlock(x, y, width, height, fillColor, outlineColor="#FFFFFF") {
        this.context.fillStyle = fillColor;
        this.context.strokeStyle = outlineColor;
        this.context.rect(x, y, width, height);
    }

    drawImageBlock(x, y, width, height, blockImages, id) {
        this.context.drawImage(
            blockImages,
            64 * (id % 4),
            64 * Math.floor(id / 4),
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