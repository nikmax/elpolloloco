class Character {
  constructor(x,y,canvas,scale) {
    this.t = 20;  // best performace for character cinema
    this.m = 10;  // 200 is speed game einheit  also 200 / 20 = 10
    this.characterSpeed = 5;
    this.jumpSpeed = 5;
    this.gameSpeed = 0;
    this.longidle = 1000 * 10;
    this.canvas = canvas;
  	this.x = x;
  	this.y = y;
    this.isMoving = false;
    this.isJumping = false;
    this.isFalling = false;
    this.stopJumping = true;
    this.ybevorejump = 0;
    this.xbevorejump = 0;
  	this.scale = scale;
  	this.animateIndex = 1;
    this.images = new Array();   // array of array of state images
    this.state;
//    this.statebevorejump = "";
//    this.ybevorejump;
//    this.newstate = '';
    this.timestate = new Date().getTime();
    this.interval = 0;
    setInterval(this.animate.bind(this),this.t);
  }
  addState(state,path,pics) {
  	this.images[state] = [path,pics];
    this.state = state;
  }
/*
  getState(){
    //
  	return this.state;
  }
*/
  setState(state){
  	if(this.checkState(state) ){
      this.state = state;
      this.animateIndex = 1;
      this.timestate = new Date().getTime();
      console.log(state);
    } else setError('No State availabel');
  }
  checkState(state){
  	if(this.images[state] === undefined) return false;
  	return true;
  }
  move(){
  	//if(!this.isMoving){
      if(!this.isJumping){  // Jump must be complete
  	  	this.isMoving = true;
      }
  	//}
  	//this.speed = speed;
  }
  halt(){
    //if(this.isMoving){
      this.isMoving = false;
    //}
  }
  jump(){
      this.isJumping = true;
      this.stopJumping = false
  }
  nojump(){
      this.stopJumping = true;
  }


  setError (err){
    //
  	this.error = err;
  }
  animate(){
    this.interval++;
		if(this.interval > this.m){     
      this.animateIndex++;
      this.interval = 0;
    }
    if(this.animateIndex > this.images[this.state][1]){
      this.animateIndex = 1;
    }
    this.checkForNewState();

    this.checkForFalling();
    this.checkForEndFalling();

    //if(this.gameSpeed > 0){
     
      if(this.isJumping){
        if(this.isFalling) {
          this.y += this.jumpSpeed - this.gameSpeed;
          this.x += this.xbevorejump - this.gameSpeed;
        }else{
          this.y -= this.jumpSpeed - this.gameSpeed;
          this.x += this.xbevorejump - this.gameSpeed;
        }
      }else if(this.isMoving)  {
        this.x += this.characterSpeed - this.gameSpeed;
      }else this.x -= this.gameSpeed;  

   //}
  }
  checkForFalling(){
    if(this.isJumping && !this.isFalling && this.animateIndex > (this.images['Jump'][1]/2)) {
      //this.isJumping = false;
      this.isFalling = true;
    }
  }
  checkForEndFalling(){
    if(this.isFalling) {
      if(this.ybevorejump > this.y){
        if(this.animateIndex == 1) {this.animateIndex = this.images['Jump'][1]};
      }else{
       this.isFalling = false;
        if(this.stopJumping) this.isJumping = false;
        this.y = this.ybevorejump;

      }
    }
  }

  checkForNewState(){
    if(this.isJumping){ // initial Jump
      if(this.state != "Jump"){
        this.ybevorejump = this.y;
        if(this.isMoving) this.xbevorejump = this.characterSpeed;
        else this.xbevorejump = 0;
        this.setState("Jump");
      }
    }else if(this.isMoving){
      if(this.state != "Walk"){
        this.setState("Walk");
      }
    }else if(this.state == 'Idle'){
        let time = new Date().getTime();
        if ((time - this.timestate) >= this.longidle) this.setState('Long_Idle');
    }else  if(this.state != 'Long_Idle'){
      this.setState("Idle"); // initial Idle
    }
    // the current state is 'Long Idle'
  }
  drawImage() {
    let ctx = this.canvas.getContext("2d");
    let img = new Image();
    img.src = this.images[this.state][0]  + this.animateIndex + ".png"; 
    //checkForJumping();
    if (img.complete) ctx.drawImage(img,this.x,this.y,img.width*this.scale,img.height*this.scale);
  }
}
/**
 * describe a class of background images
 * initial draw from 0,0 an scale to canvas size
 * @class BgImage - Constructor
 * @param {string} path - The path to the two images (1.png and 2.png) for continue move
 * @param {element} canvas
 * @param {float} initialspeed
 * @method drawImage - draw a backgroud image in a canvas
 * @method animate - private method for move a background with a speed
 * @method setSpeed - Set the new speed from right for backround (negotate from left)
 */
class BgImage {
  constructor(path,canvas,initialspeed) {
    this.x = 0;
    this.path = path;
    this.canvas = canvas;
    this.speed = initialspeed;
    this.gameSpeed = 0;
    setInterval(this.animateBg.bind(this),20);
  }
  drawImage() {
    let bg0 = new Image();
    let bg1 = new Image();
    let bg2 = new Image();
    let ctx = this.canvas.getContext("2d");
    let width = this.canvas.width;  // for short code
    let dx = parseInt( this.x / width);
    let ds = this.x % width;

    if (dx%2 == 0){
      bg0.src = this.path + "/2.png"; bg1.src = this.path + "/1.png"; bg2.src = this.path + "/2.png";
    }else{
      bg0.src = this.path + "/1.png"; bg1.src = this.path + "/2.png"; bg2.src = this.path + "/1.png";
    }
    if(bg0.complete) ctx.drawImage(bg0,ds - width,0,width,bg0.height * width / bg0.width);
    if(bg1.complete) ctx.drawImage(bg1,ds,0        ,width,bg1.height * width / bg1.width);
    if(bg2.complete) ctx.drawImage(bg2,ds + width,0,width,bg2.height * width / bg2.width);
  }
  animateBg(){
    this.x -= this.speed * this.gameSpeed;
  }
  setSpeed(newspeed) {
    this.speed = newspeed;
  }
}