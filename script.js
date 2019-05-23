var socket = io();
var side = 25;
socket.on('sending matrix', drawMatrix);
socket.on('sending season', takeSeason);
a = 1;
function takeSeason(season) {
    if (season == 'spring') {
        a = 1;
    }
    else if (season == 'summer') {
        a = 2;
    }
    else if (season == 'autumn') {
        a = 3;
    }
    else if (season == 'winter') {
        a = 4;
    }
}
function setup() {
    frameRate(5);
    createCanvas(60 * side, 30 * side);
    background('#acacac');
}

function reload() {
    socket.emit("Reload matrix");
}

function drawMatrix(matrix, season) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (a == 1) {
                if (matrix[y][x] == 1) {
                    fill("#87D37C");
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
                    fill("#4DAF7C");
                }
                rect(x * side, y * side, side, side);
            }
            if (a == 2) {
                if (matrix[y][x] == 1) {
                    fill("#8DB255");
                }
                else if (matrix[y][x] == 2) {
                    fill("#F4D03F");
                }
                else if (matrix[y][x] == 3) {
                    fill("#C3272B");
                }
                else if (matrix[y][x] == 4) {
                    fill("#EC841D");
                }
                else if (matrix[y][x] == 5) {
                    fill("#1EC6D8");
                }
                else {
                    fill("#F7CA18");
                }
                rect(x * side, y * side, side, side);
            }
            if (a == 3) {
                if (matrix[y][x] == 1) {
                    fill("#006442");
                }
                else if (matrix[y][x] == 2) {
                    fill("#FFB61E");
                }
                else if (matrix[y][x] == 3) {
                    fill("#8F1D21");
                }
                else if (matrix[y][x] == 4) {
                    fill("#CC9933");
                }
                else if (matrix[y][x] == 5) {
                    fill("#4B77BE");
                }
                else {
                    fill("brown");
                }
                rect(x * side, y * side, side, side);
            }
            if (a == 4) {
                if (matrix[y][x] == 1) {
                    fill("#87D37C");
                }
                else if (matrix[y][x] == 2) {
                    fill("#F5D76E");
                }
                else if (matrix[y][x] == 3) {
                    fill("F0BA4F");
                }
                else if (matrix[y][x] == 4) {
                    fill("#D24D57");
                }
                else if (matrix[y][x] == 5) {
                    fill("#89C4F4");
                }
                else {
                    fill("white");
                }
                rect(x * side, y * side, side, side);
            }
        }
    }
}
function addAnimal() {

	xy = {
		x: document.getElementById('inputx').value,
		y: document.getElementById('inputy').value,
		type: document.getElementById('animaltype').value
	}
	socket.emit('addanimal', xy);
}