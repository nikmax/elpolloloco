class Character {
  constructor(x,y,canvas,scale) {
    this.characterSpeed = 5;
    this.gameSpeed = 0;
    this.longidle = 1000 * 20;
    this.canvas = canvas;
  	this.x = x;
  	this.y = y;
    this.isMoving = false;
  	this.scale = scale;
  	this.animateIndex = 1;
    this.images = new Array();   // array of array of state images
    this.state;
    this.newstate = '';
    this.timestate = new Date().getTime();
    this.interval = 0;
    setInterval(this.animate.bind(this),20);  // 10
  }
  addState(state,path,pics) {
  	this.images[state] = [path,pics];
    this.state = state;
  }
  getState(){
    //
  	return this.state;
  }
  setState(state){
  	if(this.checkState(state) ){
  		this.newstate = state;
  	}
  }
  checkState(state){
  	if(this.images[state] === undefined) return false;
  	return true;
  }
  move(){
  	//if(!this.isMoving){
  		this.setState('Walk');
	  	this.isMoving = true;
  	//}
  	//this.speed = speed;
  }
  halt(){
  	this.isMoving = false;
  	this.setState('Idle');
  }
  setError (err){
    //
  	this.error = err;
  }
  animate(){
    this.interval++;
		if(this.interval > 10){
      this.animateIndex++;
      this.interval = 0;
    }
    if(this.animateIndex > this.images[this.state][1]){
      this.animateIndex = 1;
    }
    this.checkForLongIdle();
    if(this.newstate != this.state){
      this.state = this.newstate;
      this.animateIndex = 1;
      this.timestate = new Date().getTime();
    }
    if(this.gameSpeed > 0){
      if(this.isMoving) this.x += this.characterSpeed - this.gameSpeed;
      else this.x -= this.gameSpeed;
   }
  }
  checkForLongIdle(){
    if(this.checkState('Long_Idle')){
      if(this.state == 'Idle'){
        let time = new Date().getTime();
        if ((time - this.timestate) >= this.longidle) this.setState('Long_Idle');
      }
    }
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