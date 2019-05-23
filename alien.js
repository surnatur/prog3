var LivingCreature = require('./LivingCreature.js')
module.exports = class Alien extends LivingCreature{
    constructor(x, y) {
        super(x,y);
        this.energy = 15;
    }
    newDirections() {
        this.directions = [
            [this.x - 1, this.y],
            [this.x + 1, this.y],

            [this.x, this.y + 1],
            [this.x, this.y + 2],
            [this.x, this.y + 3],
            [this.x, this.y + 4],
            [this.x, this.y + 5],
            [this.x, this.y + 6],
            [this.x, this.y + 7],
            [this.x, this.y + 8],
            [this.x, this.y + 9],
            [this.x, this.y + 10],

            [this.x, this.y - 1],
            [this.x, this.y - 2],
            [this.x, this.y - 3],
            [this.x, this.y - 4],
            [this.x, this.y - 5],
            [this.x, this.y - 6],
            [this.x, this.y - 7],
            [this.x, this.y - 8],
            [this.x, this.y - 9],
            [this.x, this.y - 10],
        ];
    }

    getDirections(ch) {
        this.newDirections();
        return super.chooseCell(ch);
    }


    move() {
        var fundCords = this.getDirections(0);
        var cord = fundCords[Math.floor(Math.random()*fundCords.length)];


        if (cord) {
            var x = cord[0];
            var y = cord[1];
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;

        }
    }
    eat() {
        var fundCords = this.getDirections(4);
        var cord = fundCords[Math.floor(Math.random()*fundCords.length)];

        if (cord) {
            var x = cord[0];
            var y = cord[1];
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            this.multiply++;
            this.energy++;

            for (var i in omnivorousArr) {
                if (x == omnivorousArr[i].x && y == omnivorousArr[i].y) {
                    omnivorousArr.splice(i, 1);
                }
            }
            if (this.multiply == 8) {
                this.mul()
                this.multiply = 0;
            }


        } else {
            this.move();
            this.energy--;
            if (this.energy == 0) {
                this.die();
            }
        }
    }
    mul() {
        var fundCords = this.getDirections(0);
        var cord = fundCords[Math.floor(Math.random()*fundCords.length)];

        if (cord) {
            var x = cord[0];
            var y = cord[1];
            this.multiply++;
            var newAlien = new Alien(x, y);
            alienArr.push(newAlien);
            matrix[y][x] = 5;
            this.multiply = 0;
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in alienArr) {
            if (this.x == alienArr[i].x && this.y == alienArr[i].y) {
                alienArr.splice(i, 1);
            }
        }
    }
}