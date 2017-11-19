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
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (data[i + j * this.size] === 1) {
                    this.elements.push({x: i, y: j});
                }
            }
        }
    }

    draw(x, y) {
        globals.context.fillStyle = this.color;
        this.elements.forEach((block) => {
            globals.context.fillRect(
                 40 * (x + block.x),
                -40 * (y + block.y) + globals.yOffset,
                40, 40);
        });
    }

    forEachElem(func) {
        this.elements.forEach(func);
    }

    someElem(func) {
        this.elements.some(func);
    }
};