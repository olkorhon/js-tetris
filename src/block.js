const colors = [
    "#FF0000", "#00FF00", "#0000FF",
    "#FFFF00", "#FF00FF", "#00FFFF",
    "#FF7700"
];

function generateBlock() {
    let chosenTemplate = getRandomTetrominoe();

    const name = chosenTemplate.name;
    const size = chosenTemplate.size;
    const data = JSON.parse(JSON.stringify(chosenTemplate.template));
    const color = colors[Math.floor(Math.random() * colors.length)];

    return new Block(name, size, data, color);
}

class Block {
    constructor(name, size, data, color) {
        this.name = name;
        this.size = size;
        this.color = color;

        this.elements = [];
        this.rotatedElements = [];
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (data[i + j * this.size] === 1) {
                    this.elements.push({x: i, y: j});
                    this.rotatedElements.push({x: j, y: this.size - i - 1});
                }
            }
        }
    }

    rotate() {
        this.elements = this.rotatedElements;
        this.rotatedElements = this.elements.map(pos => ({x: pos.y, y: this.size - pos.x - 1}));
    }

    draw(pos) {
        globals.context.fillStyle = this.color;
        globals.context.strokeStyle = "#FFFFFF";

        globals.context.beginPath();
        this.elements.forEach((block) => {
            globals.context.rect(
                 40 * (pos.x + block.x),
                -40 * (pos.y + block.y) + globals.yOffset,
                40, 40);
        });
        globals.context.fill();
        globals.context.stroke();
    }

    forEachElem(func) {
        this.elements.forEach(func);
    }
    forEachRotatedElem(func) {
        this.rotatedElements.forEach(func);
    }

    someElem(func) {
        return this.elements.some(func);
    }
    someRotatedElem(func) {
        return this.rotatedElements.some(func);
    }
};