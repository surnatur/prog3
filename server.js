
grassArr = [];
grassEater = [];
predatorArr = [];
omnivorousArr = [];
alienArr = [];
matrix = [];

function matrixGenerate() {
    for (y = 0; y <= 30; y++) {
        matrix[y] = [];
        for (x = 0; x <= 60; x++) {
            let randomMatrix = Math.floor(Math.random()*100);
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
}

matrixGenerate();

grass = require('./grass.js');
eatGrass = require('./grassEater.js');
predator = require('./predator.js');
omnivorous = require('./omnivorous.js');
alien = require('./alien.js');

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
   res.redirect('index.html');
});

server.listen(4000);

function createObjects(){
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 2) {
                var eatgrassV = new eatGrass(x, y);
                grassEater.push(eatgrassV);
            }
            if (matrix[y][x] == 4) {
                var omnivorousV = new omnivorous(x, y);
                omnivorousArr.push(omnivorousV);
            }
            if (matrix[y][x] == 5) {
                var alienV = new alien(x, y);
                alienArr.push(alienV);
            }
            if (matrix[y][x] == 3) {
                var predatorV = new predator(x, y);
                predatorArr.push(predatorV);
            }
            if (matrix[y][x] == 1) {
                var gr = new grass(x, y);
                grassArr.push(gr);
            }
        }
    }
}

function reloadMatrix() {
    grassArr = [];
    grassEater = [];
    predatorArr = [];
    omnivorousArr = [];
    alienArr = [];
    matrix = [];
    
    matrixGenerate();
    createObjects();
}



io.on('connection', function (socket) {
    socket.on("Reload matrix",reloadMatrix)
})
createObjects();

let takt = 0;
season = 'spring';
function game(){
    takt++
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
    io.sockets.emit("sending matrix", matrix);

    takt++;
    if (takt < 12 && takt >= 0) {
        season = "winter";


    }
    else if (takt >= 12 && takt < 24) {
        season = "spring";
    }
    else if (takt >= 24 && takt < 36) {
        season = "summer";
    }
    else if (takt >= 36 && takt < 48) {
        season = "autumn";
    }
    else if (takt >= 48) {
        takt = 0;
    }
    io.sockets.emit("sending season", season);
}
function animalAdd(xy) {
    if (xy.type == 'grass' || xy.type == 'Grass') {
        matrix[xy.y][xy.x] = 1;
        grassArr.push(new grass(xy.x, xy.y));
    }
    else if (xy.type == 'grass eater' || xy.type == 'Grass eater' || xy.type == 'Grass Eater' || xy.type == 'grasseater') {
        matrix[xy.y][xy.x] = 2;
        grassEater.push(new eatGrass(xy.x, xy.y));
    }
    else if (xy.type == 'predator' || xy.type == 'Predator') {
        matrix[xy.y][xy.x] = 3;
        predatorArr.push(new predator(xy.x,xy.y));
    }
    else if(xy.type == 'omnivorous' || xy.type == 'Omnivorous'){
        matrix[xy.y][xy.x] = 4;
        omnivorousArr.push(new omnivorous(xy.x,xy.y));
    }
    else if(xy.type == 'alien' || xy.type == 'Alien'){
        matrix[xy.y][xy.x] = 5;
        alienArr.push(new alien(xy.x,xy.y));
    }
    else {
        console.log(xy.type + ' not defined')
    }
    game();
}
io.on('connection', function (socket) {
    socket.on('addanimal', animalAdd);
})

var statistic = {};
setInterval(game,1000);
setInterval(function(){
    statistic.grassCount = grassArr.length;
    statistic.grassEaterCount = grassEater.length;
    statistic.predatorCount = predatorArr.length;
    statistic.omnivorousCount = omnivorousArr.length;
    statistic.alienCount = alienArr.length;
    fs.writeFile('statistic.json',JSON.stringify(statistic),function(){console.log('wrirted')})
},20)
