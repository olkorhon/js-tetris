class Canvas {
    constructor(canvasElement) {
        this.canvasElement = canvasElement;
        this.context = this.canvasElement.getContext("2d");

        this.width = this.canvasElement.width;
        this.height = this.canvasElement.height;
    }

    beginPath() {
        this.context.beginPath();
    }

    drawBlock(x, y, width, height, fillColor, outlineColor="#FFFFFF") {
        this.context.fillStyle = fillColor;
        this.context.strokeStyle = outlineColor;
        this.context.rect(x, y, width, height);
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