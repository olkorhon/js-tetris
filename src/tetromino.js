const colorVariants = [0, 1, 2];
const idRotationTable = [
    1,  5,  3,  7,
    0,  4,  2,  6,
    9, 13, 14, 11,
    8, 12, 10, 15
];

class Tetromino {
    constructor(name, size, data, colorVariant, blockImages) {
        this.name = name;
        this.size = size;
        this.colorVariant = colorVariant;
        this.blockImages = blockImages;

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

    static generate(blockImages) {
        let chosenTemplate = getRandomTetrominoe();

        const name = chosenTemplate.name;
        const size = chosenTemplate.size;
        const data = JSON.parse(JSON.stringify(chosenTemplate.template));
        const colorVariant = colorVariants[Math.floor(Math.random() * colorVariants.length)];
    
        return new Tetromino(name, size, data, colorVariant, blockImages);
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