const tetrominoes = [];

// ....
// ####
// ....
// ....
tetrominoes[0] = {
    name: "I",
    size: 4,
    template: [
        0, 0, 0, 0,
        1, 1, 1, 1,
        0, 0, 0, 0,
        0, 0, 0, 0
    ]
};

// #..
// ###
// ...
tetrominoes[1] = {
    name: "J",
    size: 3,
    template: [
        1, 0, 0,
        1, 1, 1,
        0, 0, 0
    ]
};

// ..#
// ###
// ...
tetrominoes[2] = {
    name: "L",
    size: 3,
    template: [
        0, 0, 1,
        1, 1, 1,
        0, 0, 0
    ]
};

// ##
// ##
tetrominoes[3] = {
    name: "O",
    size: 2,
    template: [
        1, 1,
        1, 1
    ]
};

// .##
// ##.
// ...
tetrominoes[4] = {
    name: "S",
    size: 3,
    template: [
        0, 1, 1,
        1, 1, 0,
        0, 0, 0
    ]
};

// .#.
// ###
// ...
tetrominoes[5] = {
    name: "T",
    size: 3,
    template: [
        0, 1, 0,
        1, 1, 1,
        0, 0, 0
    ]
};

// ##.
// .##
// ...
tetrominoes[6] = {
    name: "Z",
    size: 3,
    template: [
        1, 1, 0,
        0, 1, 1,
        0, 0, 0
    ]
};

function getRandomTetrominoe() {
    return tetrominoes[Math.floor(Math.random() * tetrominoes.length)];
}