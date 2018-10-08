'use strict';

class Character {
  constructor (canvas) {
  
  self = this;

  self.ctx = canvas.getContext('2d');

  self.x = 300;
  self.y = 100;
  self.height = 98;
  self.width = 82;
  self.acc = 0.1;
  self.vel = 30;
  self.impulse = 0;

  self.img = document.createElement('img');
  self.img.src = "./images/my_totoro_vector_by_dead_on_demand-d7449mc.png";
  
  }
  render() {
    const self = this;
    /*self.ctx.fillStyle = "black";
    self.ctx.fillRect(self.x, self.y, self.height, self.width);*/
    self.ctx.drawImage(self.img,self.x,self.y, self.width,self.height);
  }

  update() {
    const self = this;
  
    self.y += (self.vel * self.acc + self.impulse);
  
    if(self.y<10){
      self.setImpulse(3);
    }/* else if (self.y > 250){
      self.setImpulse(0);
      self.vel=0
    }*/
  
  }

  setImpulse(imp) {
    const self = this;
  
    self.impulse = imp;
  
  }

  checkCollision(obstacle) {
    let self = this;
    
    let crashRight = self.x + self.width > obstacle.x;
    let crashBottom = self.y + self.height > obstacle.y;
    let crashTop = self.y < obstacle.y + obstacle.height;
    let crashLeft = self.x < obstacle.x + obstacle.width;
  
    if (crashRight && crashBottom && crashLeft & crashTop) {
      return true;
    }else {
      return false;
    }
  }

  checkYLimits (limits) {
    var self = this;

    self.y >270;
  }
 
}
  