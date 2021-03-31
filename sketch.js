function setup() {
  createCanvas(windowWidth, windowHeight);
  game = new Game();
}

let iconX; 
let iconY;

function preload() {
  iconX = loadImage('https://img.icons8.com/ios/64/000000/x.png');

  iconY = loadImage('https://img.icons8.com/ios/100/000000/y.png');
}

function mousePressed() {
  game.click(mouseX, mouseY);
}

function draw() {
  background(220);
  game.draw();
}

class Player {
  constructor(n, img) {
    this.playerNumber = n;
    this.img = img;
  }
  
  getPlayerNumber() {
    return this.playerNumber;
  }
 
}

class Tile {
  constructor(x, y) {
    this.size = 100;
    this.x = windowWidth / 2 + x * this.size - this.size * 3 / 2;
    this.y = windowHeight / 2 + y * this.size - this.size * 3 / 2;
    this.position = [y, x];
  }
  
  isClicked(x, y) {
    if (this.x < x && x < this.x + this.size) {
      if (this.y < y && y < this.y + this.size) {
        return true;
      }
    }
    return false;
  }
  
  getPosition() {
    return this.position;
  }
  
  draw(img) {
    //rect(this.x - 50, this.y - 50, 100, 100);
    push();
    imageMode(CENTER);
    image(img, this.x + this.size / 2, this.y + this.size / 2, this.size - 15, this.size - 15);
    
    //rectMode(CENTER);
    //Image()
    //rect();
    pop();
  }
}

class Game {
  constructor() {
    this.board = [[0, 0, 0],
                  [0, 0, 0],
                  [0, 0, 0]];
    
    this.x = windowWidth / 2;
    this.y = windowHeight / 2;
    
    this.p1 = new Player(1);
    this.p2 = new Player(2);
    
    this.activePlayerNumber = this.p1.getPlayerNumber();
    
    this.tiles = [];
    
    this.setup();
  }
  
  setup() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.tiles.push(new Tile(i, j));
      }
    }
    
    
  }
  
  click(x, y) {
    for (let i = 0; i < 9; i++) {
      if (this.tiles[i].isClicked(x, y)) {
        let position = this.tiles[i].getPosition();
        if (this.board[position[0]][position[1]] == 0) {
          this.board[position[0]][position[1]] = this.activePlayerNumber;
          
          if (this.activePlayerNumber == this.p1.getPlayerNumber()) {
            this.activePlayerNumber = this.p2.getPlayerNumber();
          } else {
            this.activePlayerNumber = this.p1.getPlayerNumber();
          }
          
        }
        break;
      }
    }
    print(this.board);
  }
  
  reset() {
    this.board = [[0, 0, 0],
                  [0, 0, 0],
                  [0, 0, 0]];
  }
  
  draw() {
    // drawing the board
    push();
    noStroke();
    fill(0);
    rectMode(CENTER);
    // vertical lines
    rect(this.x - 50, this.y, 12, 300, 15);
    rect(this.x + 50, this.y, 12, 300, 15);
    
    // horizontal lines
    rect(this.x, this.y - 50, 300, 12, 15);
    rect(this.x, this.y + 50, 300, 12, 15);
    pop();
    
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.board[i][j] == this.p1.getPlayerNumber()) {
        this.tiles[i + j * 3].draw(iconX);
      } else if (this.board[i][j] == this.p2.getPlayerNumber()) {
        this.tiles[i + j * 3].draw(iconY);
      }
      }
      
    }

    

  }
}
