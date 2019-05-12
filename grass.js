module.exports = class Grass extends LivingCreature {
    
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
    
    getDirections(ch) {
        this.newDirections();
        return super.chooseCell(ch);
    }
 

    mul() {
        this.multiply++;
        if (this.multiply == 4) {
            var fundCords = this.getDirections(0);
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