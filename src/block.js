const colors = [
    "#FF0000", "#00FF00", "#0000FF",
    "#FFFF00", "#FF00FF", "#00FFFF",
    "#FF7700"
];

function generateBlock(blockSize) {
    let chosenTemplate = getRandomTetrominoe();

    const name = chosenTemplate.name;
    const size = chosenTemplate.size;
    const data = JSON.parse(JSON.stringify(chosenTemplate.template));
    const color = colors[Math.floor(Math.random() * colors.length)];

    return new Block(name, size, data, color, blockSize);
}

class Block {
    constructor(name, size, data, color, blockSize) {
        this.name = name;
        this.size = size;
        this.color = color;
        this.blockSize = blockSize;

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