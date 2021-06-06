class Character {
    constructor(x,y,canvas,scale, t = 20) {
      this.t = t;  // best performace for character cinema is 20
      this.m = 10;  // 200 is speed game einheit  also 200 / 20 = 10
      this.characterSpeed = 5;
      this.jumpSpeed = 5;
      this.gameSpeed = 0;
      this.longidle = 1000 * 10;
      this.canvas = canvas;
      this.x = x;
      this.y = y;
      this.width;
      this.height;
      this.isMoving = false;
      this.isJumping = false;
      this.isFalling = false;
      this.stopJumping = true;
      this.isInjured = false;
      this.isDeath = false;
      this.jumpheight;
      this.ybevorejump = 0;
      this.xbevorejump = 0;
        this.scale = scale;
        this.animateIndex = 0;
      this.images = new Array();   // array of array of state images
      this.state;
      this.isMovingLeft = false;
      this.inverse = false; 
      this.isMovingTranslate = false;
      this.timestate = new Date().getTime();
      this.interval = 0;
      this.event;
      this.name= "";
      this.showBorder = false;

      this.ctx = canvas.getContext("2d");
    }
    /**
     * add images sequence for a state
     * @param {string} state statename 
     * @param {string} path images pattern + ..1, ..2, usw
     * @param {number} pics number of images for thie state
     */
    addState(state,path,pics) {
        let imgarr = new Array();
        for( let i = 1; i <= pics; i++){
            let img = new Image();
          img.src = path  + i + ".png";
            imgarr.push(img);
        }
        this.images[state] = imgarr;
      this.setState(state);
      // if(this.event == undefined) this.event = setInterval(this.animate.bind(this),this.t);  
    }
    setState(state){
        if(this.checkState(state) ){
        this.state = state;
        this.animateIndex = 0;
        this.timestate = new Date().getTime();
        //console.log(state);
      } else this.setError('No State availabel');
    }
    checkState(state){
        if(this.images[state] === undefined) return false;
        return true;
    }
    move(r = 1){ // '1' - right,  '-1' - left
        if(!this.isJumping && !this.isInjured){  // Jump must be complete
              this.isMoving = true;
              this.characterSpeed = Math.abs(this.characterSpeed) * r;
              if(r > 0) this.isMovingLeft = false;
              else this.isMovingLeft = true;
        }
    }
    halt(){
        this.isMoving = false;
        //this.setState("Idle");
    }
    jump(){
        if(!this.isInjured){
          this.isJumping = true;
          this.stopJumping = false;
        }
    }
    _jump(jumpheight=6){
        if(!this.isInjured){
          this.jumpheight = jumpheight;
          this.isJumping = true;
          this.stopJumping = false;
        }
    }
    nojump(){
        this.stopJumping = true;
    }
    injure(){
      this.isMoving = false;
      this.isInjured = true;
      let self = this;
      setTimeout(function(){self.isInjured = false;},500);
    }
    death(){
      this.isMoving = false;
      this.isDeath = true;
    }
    setError(err){
      if (this.error != err){
            this.error = err;
            console.log(err);
        }
    }
    animate(gameSpeed){
        if(Object.keys(this.images).length == 0) {
            //this.setError('No Character States found'); return;
        } 
        this.interval++;
        if(this.interval > this.m){     
          this.animateIndex++;
          this.interval = 0;
        }
        if(this.animateIndex == this.images[this.state].length){
          this.animateIndex = 0;

        }
        this.checkForNewState();
        this.checkForFalling();
        this.checkForEndFalling();
  
        if(this.isJumping){
          if(this.isFalling) {
            this.y += this.jumpSpeed - gameSpeed;
            this.x += this.xbevorejump - gameSpeed;
          }else{
            this.y -= this.jumpSpeed - gameSpeed;
            this.x += this.xbevorejump - gameSpeed;
          }
        }else if(this.isMoving)  {
          this.x += this.characterSpeed - gameSpeed;
        }else this.x -= gameSpeed;  
    }
    checkForFalling(){
      if(this.isJumping && !this.isFalling && this.animateIndex > (this.images['Jump'].length/2)) {
        this.isFalling = true;
      }
    }
    checkForEndFalling(){
      if(this.isFalling) {
        if(this.ybevorejump > this.y){
          if(this.animateIndex < this.images['Jump'].length) {this.animateIndex = this.images['Jump'].length-1};
        }else{
          this.isFalling = false;
          if(this.stopJumping) this.isJumping = false;
          this.y = this.ybevorejump;
        }
      }
    }
  
    checkForNewState(){
      if(this.isJumping)               this.doJump();
      else if(this.isMoving)           this.doMove();
      else if(this.isInjured)          this.doInjured();
      else if(this.isDeath)            this.doDeath();
      else if(this.state == 'Idle')    this.doIdle();
      else if(this.state != 'Long_Idle'){
        if(this.checkState("Idle")) this.setState("Idle"); // initial Idle
        // initial State
      }
      // the current state is 'Long Idle'
    }
    doJump(){
      // initial Jump
      if(this.state != "Jump"){
        this.ybevorejump = this.y;
        if(this.isMoving) this.xbevorejump = this.characterSpeed;
        else this.xbevorejump = 0;
        this.setState("Jump");
      }
    }
    doMove(){
      if(this.state != "Walk"){
        this.setState("Walk");
      }
    }
    doInjured(){
      if(this.state != "Injured"){
        this.setState("Injured");
      }
    }
    doDeath(){
      if(this.state != "Death"){
        this.setState("Death");
      }
    }
    doIdle(){
      let time = new Date().getTime();
      if ((time - this.timestate) >= this.longidle){
        if(this.checkState("Long_Idle")) this.setState('Long_Idle');
      } 
    }
    drawImage() {
      let x = this.x;
      //let ctx = this.canvas.getContext("2d");
      let img = this.images[this.state][this.animateIndex]
      this.width = img.width * this.scale;
      this.height = img.height *this.scale;
      //checkForJumping();
      if(this.isMovingLeft && !this.inverse) this.ctx.save();
      if(this.isMovingLeft && !this.inverse) this.ctx.scale(-1,1);
      if(this.isMovingLeft && !this.inverse) x = -this.x - img.width*this.scale;
      this.ctx.drawImage(img,x,this.y,img.width*this.scale,img.height*this.scale);//(this.canvas.height-this.height)-
     if (this.showBorder){ 
      this.ctx.beginPath();
      this.ctx.lineWidth = "1";
      this.ctx.strokeStyle = "red";
      this.ctx.rect(x, this.y, img.width*this.scale, img.height*this.scale);
      this.ctx.stroke();
     }

      if(this.isMovingLeft && !this.inverse) this.ctx.restore();
      //if (this.name != "")
      //this.ctx.fillText(this.x + ", "+this.y, this.x, this.y);
    }
  }