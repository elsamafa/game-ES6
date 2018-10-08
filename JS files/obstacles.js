'use strict'

class Obstacles {

  constructor(canvas, y) {
    let self = this;
  
    self.x = 0;
    self.y = y;
    self.height = 48;
    self.width = 125;
    self.vel = 5;
    self.ctx = canvas.getContext('2d');
  
    self.img = document.createElement('img');
    self.img.src = "./images/catbus2.gif";
  
  }

  render() {
    let self = this;
    self.ctx.drawImage(self.img,self.x,self.y, self.width,self.height);    
  }

  update() {
    let self = this;
  
    self.x += self.vel;
   
  }
  
}



/*Obstacles.prototype.isDeath = function () {
  let self = this;

  return (self.x + self.size) < 0;
}*/