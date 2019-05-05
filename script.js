// var matrix = [
//     [0,0,0,0,0,0,0,0,0,0,0,0],
//     [1,3,0,0,4,0,0,5,4,0,1,0],
//     [0,0,0,0,1,5,0,0,2,0,4,0],
//     [0,0,0,2,0,0,1,0,0,3,0,0],
//     [0,1,0,0,1,0,0,3,1,0,0,0],
//     [0,0,0,5,0,1,0,1,0,0,1,0],
//     [0,0,1,0,3,0,2,0,1,3,0,0],
//     [0,0,1,0,0,2,0,1,0,0,0,0],
//     [0,0,0,0,1,0,0,0,1,0,3,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0]
//  ];

let matrix = [];




var side = 18;

var grassArr = [];
var grassEater = [];
var predatorArr = [];
var omnivorousArr = [];
var alienArr = [];



function setup() {
    for (y = 0; y <= 30; y++) {
        matrix[y] = [];
        for (x = 0; x <= 60; x++) {
            let randomMatrix = Math.floor(random(0, 100));
            if (randomMatrix <= 15) {
                matrix[y][x] = 5;
            }
            else if (15 < randomMatrix && randomMatrix <= 20) {
                matrix[y][x] = 4;
            }
            else if (20 < randomMatrix && randomMatrix <= 25) {
                matrix[y][x] = 3;
            }
            else if (25 < randomMatrix && randomMatrix <= 45) {
                matrix[y][x] = 2;
            }
            else if (45 < randomMatrix && randomMatrix <= 60) {
                matrix[y][x] = 1;
            }
            else if (60 < randomMatrix && randomMatrix <= 100) {
                matrix[y][x] = 0;
            }

        }
    }
    
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 2) {
                var eatgrass = new Eatgrass(x, y);
                grassEater.push(eatgrass);
            }
            if (matrix[y][x] == 4) {
                var omnivorous = new Omnivorous(x, y);
                omnivorousArr.push(omnivorous);
            }
            if (matrix[y][x] == 5) {
                var alien = new Alien(x, y);
                alienArr.push(alien);
            }
            if (matrix[y][x] == 3) {
                var predator = new Predator(x, y);
                predatorArr.push(predator);
            }
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y);
                grassArr.push(gr);
            }
        }
    }
}

function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");

            }
            else if (matrix[y][x] == 2) {
                fill("yellow");

            }
            else if (matrix[y][x] == 3) {
                fill("red");

            }
            else if (matrix[y][x] == 4) {
                fill("orange");
            }
            else if (matrix[y][x] == 5) {
                fill("cyan");

            }
            else {
                fill("#acacac");

            }
            rect(x * side, y * side, side, side);

        }
    }
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grassEater) {
        grassEater[i].eat();
    }
    for (var i in predatorArr) {
        predatorArr[i].eat();
    }
    for (var i in omnivorousArr) {
        omnivorousArr[i].eat();
    }
    for (var i in alienArr) {
        alienArr[i].eat();
    }
}