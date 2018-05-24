const colors = [
    "#FF0000", "#00FF00", "#0000FF",
    "#FFFF00", "#FF00FF", "#00FFFF",
    "#FF7700"
];

const idRotationTable = [
    1,  5,  3,  7,
    0,  4,  2,  6,
    9, 13, 14, 11,
    8, 12, 10, 15
];

function generateBlock(blockImage) {
    let chosenTemplate = getRandomTetrominoe();

    const name = chosenTemplate.name;
    const size = chosenTemplate.size;
    const data = JSON.parse(JSON.stringify(chosenTemplate.template));
    const color = colors[Math.floor(Math.random() * colors.length)];

    return new Block(name, size, data, color, blockImage);
}

class Block {
    constructor(name, size, data, color, blockImage) {
        this.name = name;
        this.size = size;
        this.color = color;
        this.blockImage = blockImage;

        this.elements = [];
        this.rotatedElements = [];
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                const id = data[i + j * this.size];
                if (id !== -1) {
                    this.elements.push({x: i, y: j, id: id});
                    this.rotatedElements.push({x: j, y: this.size - i - 1, id: idRotationTable[id]});
                }
            }
        }
    }

    rotate() {
        this.elements = this.rotatedElements;
        this.rotatedElements = this.elements.map(pos => ({x: pos.y, y: this.size - pos.x - 1, id: idRotationTable[pos.id]}));
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