class LivingCreature {
    constructor(x, y, index){
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.index = index;
    }
    chooseCell(ch) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }   
        }
        return found;
    }
}

class Grass extends LivingCreature {
    
    newDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    
    chooseCell(ch) {
        this.newDirections();
        return super.chooseCell(ch);
                }


    mul() {
        this.multiply++;
        if (this.multiply == 4) {
            var fundCords = this.chooseCell(0);
            var cord = random(fundCords);
            if (cord) {
                var x = cord[0];
                var y = cord[1];
                var newGrass = new Grass(x, y, this.index);
                grassArr.push(newGrass);
                matrix[y][x] = 1;
                this.multiply = 0;
            }
        }
    }
}
class Eatgrass extends LivingCreature{
    constructor(x, y) {
        super(x, y);
        this.energy = 15;
    }
    newDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(ch) {
        this.newDirections();
        return super.chooseCell(ch);
        }
            



    move() {
        var fundCords = this.chooseCell(0);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;

        }
    }
    eat() {
        var fundCords = this.chooseCell(1);
        var cord = random(fundCords);
        if (cord) {
            var x = cord[0];
            var y = cord[1];
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            this.multiply++;
            this.energy++;

            for (var i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                }
            }
            if (this.multiply == 7) {
                this.mul()
                this.multiply = 0;
            }


        } else {
            this.move();
            this.energy--;
            if (this.energy <= 0) {
                this.die();
            }
        }
    }
    mul() {
        var fundCords = this.chooseCell(0);
        var cord = random(fundCords);
        if (cord) {
            var x = cord[0];
            var y = cord[1];
            this.multiply++;
            var newGrassEater = new Eatgrass(x, y);
            grassEater.push(newGrassEater);
            matrix[y][x] = 2;
            this.multiply = 0;
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in grassEater) {
            if (this.x == grassEater[i].x && this.y == grassEater[i].y) {
                grassEater.splice(i, 1);
            }
        }
    }
}


class Predator extends LivingCreature {
    constructor(x, y) {
        super(x,y);
        this.energy = 14;
    }
    newDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(ch) {
        this.newDirections();
        return super.chooseCell(ch);
    }



    move() {
        var fundCords = this.chooseCell(0);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;

        }
    }
    eat() {
        var fundCords = this.chooseCell(2);
        var cord = random(fundCords);
        if (cord) {
            var x = cord[0];
            var y = cord[1];
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            this.multiply++;
            this.energy++;

            for (var i in grassEater) {
                if (x == grassEater[i].x && y == grassEater[i].y) {
                    grassEater.splice(i, 1);
                }
            }
            if (this.multiply == 15) {
                this.mul()
                this.multiply = 0;
            }


        } else {
            this.move();
            this.energy--;
            if (this.energy <= 0) {
                this.die();
            }
        }
    }
    mul() {
        var fundCords = this.chooseCell(0);
        var cord = random(fundCords);
        if (cord) {
            var x = cord[0];
            var y = cord[1];
            this.multiply++;
            var newPredator = new Predator(x, y, this.index);
            predatorArr.push(newPredator);
            matrix[y][x] = 4;
            this.multiply = 0;
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
            }
        }
    }
}
class Omnivorous extends LivingCreature{
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

    chooseCell(ch) {
        this.newDirections();
        return super.chooseCell(ch);
    }



    move() {
        var fundCords = this.chooseCell(0);
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
        var fundCords = this.chooseCell(2);
        var fundCords1 = this.chooseCell(3);
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
        var fundCords = this.chooseCell(0);
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

class Alien extends LivingCreature{
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

    chooseCell(ch) {
        this.newDirections();
        return super.chooseCell(ch);
    }



    move() {
        var fundCords = this.chooseCell(0);
        var cord = random(fundCords);

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
        var fundCords = this.chooseCell(4);
        var cord = random(fundCords);
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
        var fundCords = this.chooseCell(0);
        var cord = random(fundCords);
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