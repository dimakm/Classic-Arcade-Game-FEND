let level = 0;
// Enemies our player must avoid
var Enemy = function(speed, x, y) { //the parameters are the enemies speed and the x,y coordinat
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
};


Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    //if the enemy x-coordinate is is offscreen to the right then
    //give it a new location starting from the left again
    if (this.x > 505) {
        this.x = Math.random() - 500;
    }
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var allEnemies = [];

//enemyStartYLocation is an array of the Y coordinates where the enimes start to show on canvas
var enemyStartYLocation = [60, 145, 230];
//2  location on x axis , off the screen to the left for the enemy to start coming from so not all the enemies start from the same x and get stacked on top of each other
var enemyXlocation = [-700, -200];
//go through the array enemyStartYLocation and for each Y and each X push a new enemy object in the allEnemies array.
enemyStartYLocation.forEach(function(yCoordinate) {
      enemyXlocation.forEach(function(xCoordinate) {
        var randomSpeed = 50 * Math.floor(Math.random() * 10 + 1); //generate random speeds for the enemy
        enemy = new Enemy(randomSpeed, xCoordinate, yCoordinate);
        allEnemies.push(enemy);
    });
});


//--------------------all about the player

//the player , the parameters are the players x,y coordinates
var Player = function(x , y) {
    this.x = x;
    this.y = y;
};

const player = new Player(200, 400);


Player.prototype.update = function() {
};


Player.prototype.render = function() {
  var image = new Image();
  image.src = 'images/char-pink-girl.png';
    ctx.drawImage(image, 200, 405);
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

//the Player.handleInput function that handles the players movement when an arrow key is pressed (up down left and right)
// the character moves 102 on the x axis and 83 of the y so it jumps from a block to another
//so first we check what the key is and we make sure the player is within the canvas area.
// then we add and subtract depending on the key and the position .
Player.prototype.handleInput = function(key) {

    if (key == 'up' && this.y > 0) {
      console.log('moving up up up'); //this line is for testing
        this.y -= 83;
    };

    if (key == 'down' && this.y < 405) {
      console.log('moving down'); //this line is for testing
        this.y += 83;
    };

    if (key == 'left' && this.x > 0) {
      console.log('moving left'); //this line is for testing
        this.x -= 102;
    };

    if (key == 'right' && this.x < 405) {
      console.log('moving right'); //this line is for testing
        this.x += 102;
    };
//if the player reached the water at top of the canvas,
//we'll return the player back to the start point and we add 1 to the level
    if (this.y <= 0) {
      level += 1;
        setTimeout(function() {
            this.x = 200;
            this.y = 405;
        }, 500);
        window.alert('yaaay you are one level up');


    };
};


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
