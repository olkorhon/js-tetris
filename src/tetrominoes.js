const tetrominoes = [];

// ....
// ####
// ....
// ....
tetrominoes[0] = {
    name: "I",
    size: 4,
    template: [
        -1, -1, -1, -1,
        12, 14, 14,  9,
        -1, -1, -1, -1,
        -1, -1, -1, -1
    ]
};

// #..
// ###
// ...
tetrominoes[1] = {
    name: "J",
    size: 3,
    template: [
        13, -1, -1,
         0, 14,  9,
        -1, -1, -1
    ]
};

// ..#
// ###
// ...
tetrominoes[2] = {
    name: "L",
    size: 3,
    template: [
        -1, -1, 13,
        12, 14,  1,
        -1, -1, -1
    ]
};

// ##
// ##
tetrominoes[3] = {
    name: "O",
    size: 2,
    template: [
        4, 5,
        0, 1
    ]
};

// .##
// ##.
// ...
tetrominoes[4] = {
    name: "S",
    size: 3,
    template: [
        -1,  4,  9,
        12,  1, -1,
        -1, -1, -1
    ]
};

// .#.
// ###
// ...
tetrominoes[5] = {
    name: "T",
    size: 3,
    template: [
        -1, 13, -1,
        12,  2,  9,
        -1, -1, -1
    ]
};

// ##.
// .##
// ...
tetrominoes[6] = {
    name: "Z",
    size: 3,
    template: [
        12,  5, -1,
        -1,  0,  9,
        -1, -1, -1
    ]
};

function getRandomTetrominoe() {
    return tetrominoes[Math.floor(Math.random() * tetrominoes.length)];
}