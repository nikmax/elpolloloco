class Character {
  constructor(srcArr) {
  	this.x = 0;
  	this.y = 0;
  	this.scale = 0.1;
  	this.animateIndex = 0;
	this.isMoving = false;
	this.isJumping = false;
	this.isFalling = false;
	this.speed = 3;

  	this.images = new Array();   // array of array of state images
    this.state = 'Idle';
    this.addState(this.state,srcArr);
    this.image = this.images[this.state][this.animateIndex];
    
	setInterval(this.animateCharacter.bind(this),200);
  }
  addState(state,srcArr) {
  	let new_state = new Array();
	for (let i = 1; i < srcArr.length; i++){
		let character_image = new Image();
		
		character_image.src = srcArr[0] + "/" + srcArr[i];
		new_state.push(character_image);
	}
	this.images[state] = new_state;
  }
  getState(){
  	return this.state;
  }
  setState(state){
  	if(this.checkState){
  		this.state = state;
	    this.image = this.images[this.state][0];
  	}
  }
  checkState(state){
  	if(this.images[state] === undefined) return false;
  	return true;
  }
  move(){
  	if(!this.isMoving){
  		this.setState('Walk');
	  	this.isMoving = true;
  	}
  	this.x += this.speed;
  }
  halt(){
  	this.isMoving = false;
  	this.setState('Idle');
  }
  setError (err){
  	this.error = err;
  }
  animateCharacter(){
		let index = this.animateIndex % this.images[this.state].length;
		this.image = this.images[this.state][index];
		this.animateIndex++;
  }
}


let pepeIdleImagesSrc =["img/2.Pepe/1.Idle/Idle","I-1.png", "I-2.png", "I-3.png", "I-4.png", "I-5.png", "I-6.png", "I-7.png", "I-8.png", "I-9.png", "I-10.png"];
let pepeLongIdleSrc = [];
let pepeWalkImagesSrc = ["img/2.Pepe/2.Walk","W-21.png","W-22.png","W-23.png","W-24.png","W-25.png","W-26.png"];
let pepeJumpImagesSrc = ["img/2.Pepe/3.Jump","J-31.png","J-32.png","J-33.png","J-34.png","J-35.png","J-36.png","J-37.png","J-38.png","J-39.png","J-40.png"];
let pepeStateImages = [];
let pepeIdleImages = [];
let pepeLongIdle = [];
let pepeWalkImages = [];
let pepeJumpImages = [];



let BgImages1 = ["img/5.Fondo/Capas/1.suelo-fondo1/1.png", "img/5.Fondo/Capas/1.suelo-fondo1/2.png"];


let Pepe = new Character(pepeIdleImagesSrc);
Pepe.addState('Walk',pepeWalkImagesSrc);
Pepe.addState('Jump',pepeJumpImagesSrc);

for (let i = 1; i < pepeIdleImagesSrc.length; i++){
	let character_image = new Image();
	character_image.src = pepeIdleImagesSrc[0] + "/" + pepeIdleImagesSrc[i];
	pepeIdleImages.push(character_image);
}
