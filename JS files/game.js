'use strict';

class Game {
  constructor (parent) {
    let self = this;

    self.parentElement = parent;
    self.gameElement = null;
    self.onGameOverCallback = null;
    self.isGameOver = false;
    
    self._init();
    self._startLoop();
  }

  _init() {
    let self = this;
  
    self.gameElement = buildDom(`
      <main class = "game container">
        <header class="game__header">
          <div class="score">
            <span class="label"></span>
          </div>
        </header>
        <div class="game__canvas">
          <canvas class="canvas"></canvas>
        </div>
        <audio src="./images/pwaa-the-steel-samurai-theme.mp3" autoplay></audio>
      </main>
    `)
    self.parentElement.appendChild(self.gameElement);
  
    self.canvasParentElement = document.querySelector('.game__canvas');
    self.canvasElement = document.querySelector('.canvas');
  
    self.scoreElement = self.gameElement.querySelector('.score .label');
    
  
    self.width = self.canvasParentElement.clientWidth;
    self.height = self.canvasParentElement.clientHeight;
  
    self.canvasElement.setAttribute('width', self.width);
    self.canvasElement.setAttribute('height', self.height);
  
    self.ctx = self.canvasElement.getContext('2d');
  
    self.buildScore();
  }

  //Timer
  buildScore (){
    let self = this;

    self.counter = 1;
    let intervalID = setInterval( () => {
      self.counter++; 
    }, 500);
    intervalID;
  }

  //Loop
  _startLoop () {
    let self = this;

    self.obstacles = [];
    self.character = new Character(self.canvasElement);
    self.audio = new Audio("./images/Cartoon Hop-SoundBible.com-553158131.mp3");
    //self.floor = new Floor(self.canvasElement);


    self.handleSpaceBarUpDown = (e) => {
      if(e.keyCode === 32){
        e.preventDefault();
        self.character.setImpulse(-10); 
        self.audio.play(); 

      } 
    }
    
    self.handleSpaceBarUp = (evt) => {
      if(e.keyCode===32){
        
        self.audio.pause();
        self.audio.currentTime = 0;
      } 
    }


    document.addEventListener('keydown', self.handleSpaceBarUpDown)
    document.addEventListener('keyup', self.handleSpaceBarUp)

    loop = () =>{
      self._clearAll();
      self._updateAll();
      self._renderAll();
      self._checkAllCollision();
      self._checkLimits();

      if (!self.isGameOver){
        requestAnimationFrame(loop)
      } else {
        self.onGameOverCallback();
      }
    }

    requestAnimationFrame(loop);
  }

  _spawnObstacle()  {
    let self = this;

    if (Math.random() > 0.99) {
      let randomY = Math.random() * self.height * 0.5;
      self.obstacles.push(new Obstacles(self.canvasElement, randomY));
    }
  }

  _updateAll () {
    let self = this;

    self._spawnObstacle();
    self.obstacles.forEach(function(item) {
      item.update();
    });  
    
    self.character.update();

    self._updateUI();
  }

  _updateUI () {

    let self = this;
    self.scoreElement.innerText = self.counter;
  
  }
  
  _clearAll ()  {
    let self = this;
  
    self.ctx.clearRect(0, 0, self.width, self.height);
  }
  
  _renderAll ()  {
    let self = this;
  
    self.character.render();
    self.obstacles.forEach(function(item){
      item.render();
    })
    
   // self.floor.render();
  }
  _checkAllCollision () {
    let self = this;
  
    self.obstacles.forEach(function(item, idx) {
      if(self.character.checkCollision(item)) {
        self.isGameOver = true;
      }
    });
  }
  
  _checkLimits (){
    let self = this;
  
    if (self.character.y > 630){
      self.isGameOver = true;
    }
  }
  
  onOver (callback) {
    let self = this;
  
    self.onGameOverCallback = callback;
  }
  
  destroy () {
    let self = this;
  
    self.gameElement.remove();
  
  
  }

}

