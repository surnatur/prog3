module.exports = class Omnivorous extends LivingCreature{
    constructor(x, y) {
        super(x,y);
        this.energy = 13;
    }
    newDirections() {
        this.directions = [
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x, this.y + 1],

            [this.x - 1, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 3, this.y + 3],
            [this.x - 4, this.y + 4],
            [this.x - 5, this.y + 5],
            [this.x - 6, this.y + 6],
            [this.x - 7, this.y + 7],
            [this.x - 8, this.y + 8],
            [this.x - 9, this.y + 9],
            [this.x - 10, this.y + 10],

            [this.x + 1, this.y - 1],
            [this.x + 2, this.y - 2],
            [this.x + 3, this.y - 3],
            [this.x + 4, this.y - 4],
            [this.x + 5, this.y - 5],
            [this.x + 6, this.y - 6],
            [this.x + 7, this.y - 7],
            [this.x + 8, this.y - 8],
            [this.x + 9, this.y - 9],
            [this.x + 10, this.y - 10],
        ];
    }

    getDirections(ch) {
        this.newDirections();
        return super.chooseCell(ch);
    }
 


    move() {
        var fundCords = this.getDirections(0);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;

        }
    }
    eat() {
        var fundCords = this.getDirections(2);
        var fundCords1 = this.getDirections(3);
        var fundCords2 = fundCords.concat(fundCords1);
        var cord = random(fundCords2);
        if (cord) {
            var x = cord[0];
            var y = cord[1];
            let r = matrix[y][x];
            matrix[y][x] = 4;

            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            this.multiply++;
            this.energy++;
            if (r == 2) {
                for (var i in grassEater) {
                    if (x == grassEater[i].x && y == grassEater[i].y) {
                        grassEater.splice(i, 1);
                    }
                }
            }
            if (r == 3) {
                for (var i in predatorArr) {
                    if (x == predatorArr[i].x && y == predatorArr[i].y) {
                        predatorArr.splice(i, 1);
                    }
                }
            }
            if (this.multiply == 10) {
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
        var cord = random(fundCords);
        if (cord) {
            var x = cord[0];
            var y = cord[1];
            this.multiply++;
            var newOmnivorous = new Omnivorous(x, y);
            omnivorousArr.push(newOmnivorous);
            matrix[y][x] = 5;
            this.multiply = 0;
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in omnivorousArr) {
            if (this.x == omnivorousArr[i].x && this.y == omnivorousArr[i].y) {
                omnivorousArr.splice(i, 1);
            }
        }
    }
}