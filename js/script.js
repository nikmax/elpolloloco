let canvas,ctx;
let bgScale = 0.5;
let gameSpeed = 1;
let gameLevel = 1;
let GameX = 0;
let wind = 0.2;
let background,clouds, mounts1,mounts2,mounts3, startbg, stopbg, lostbg;
let Pepe, Tito, Pedro, Vito, Diego, Carlos;
let PepesBottles;
let isPause;
let coins,chickens,bottles;
let start_sound,collision_sound;
let ivl;
let lifeBars = new Array();
let coinBars = new Array();
let bottleBars = new Array();
let gameStopped;
let gameOver;
let won;

let lifeBarsState, coinBarsState, bottleBarsState;

start_sound = new Audio('sounds/start.mp3');
start_sound.load();
collision_sound = new Audio('sounds/collision.mp3');
collision_sound.load();


/**
 * general initialize function
 */
function init(){
	gameOver = false;
	gameStopped = true;
	lifeBarsState = 100;
	coinBarsState = 0;
	bottleBarsState = 10;
	won = true;
	isPause = false;
	coins = new Array();
	chickens = new Array();
	bottles = new Array();
	PepesBottles = new Array();
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	initBackgrounds(0.2);
	initIntros();
	initPepe();
	PepesBottles.push();
	initCoins(30);
	initChickens(30);
	initBottles(30);
	initStatusBars(lifeBars,'Life');
	initStatusBars(bottleBars,'Bottles');
	draw();
	listenForKeys();
}
function animate(){
	GameX += gameSpeed;
	mounts1.animate(gameSpeed);
	mounts2.animate(gameSpeed);
	mounts3.animate(gameSpeed);
	clouds.animate(wind);
	Pepe.animate(gameSpeed);
	animateObjects(coins);
	animateObjects(chickens);
	animateObjects(bottles);	
	animateObjects(PepesBottles);
	checkForGameOver();
}
function checkForCollision(obj1,obj2){
	return (obj1.x + obj1.width > obj2.x &&
			obj1.y + obj1.height > obj2.y &&
			obj1.x < obj2.x &&
			obj1.y + obj1.height/2  < obj2.y + obj2.height);
}
function checkForGameOver(){
	if((Pepe.x + Pepe.width) < 0){won = false;gameOver = true;return;}
	if(lifeBarsState <= 0){won = false;gameOver = true;return;}
	if(chickens.length > 0) return;
	//if(coins.length > 0) return;
	//if(bottles.length > 0) return;
	
	gameOver = true;
}
function initIntros(){
	startbg = new Image();
	startbg.src = "img/9.StartStop/StartScreen.png";
	stopbg = new Image();
	stopbg.src = "img/9.StartStop/3.GameOver.png";
	lostbg = new Image();
	lostbg.src = "img/9.StartStop/1.you_lost.png";
}
function initBackgrounds(wind){
	background = new Image();
	background.src = "img/5.BG/Pics/5.Horizont.png";
	mounts1 = new BgImage("img/5.BG/Pics/1.Mounts",canvas,1);
	mounts2 = new BgImage("img/5.BG/Pics/2.Mounts",canvas,0.5);
	mounts3 = new BgImage("img/5.BG/Pics/3.Mounts",canvas,0.2);
	clouds  = new BgImage("img/5.BG/Pics/4.Clouds",canvas,0.3);
	clouds.gameSpeed = wind;
}
function initChicken(x,y,speed){
	let chicken = new Character(x,y,canvas,0.3); // speed 20 is equal to bgImages
	chicken.addState('Walk',"img/3.Chicken/1.Walk/chicken",3);
	chicken.addState('Death',"img/3.Chicken/2.Death/chicken_death",1);
	chicken.setState('Walk');
	chicken.inverse = true;
	chicken.move(-speed);
	return chicken;
}
function initChickens(count){
	let x = 1000;
	let z = Math.floor(Math.random());// * 0.8 )+0.1;
	for (let i = 0; i < count; i++){
		x += Math.floor(Math.random() * (500) )+100;
		chickens.push(initChicken(x,400,Math.random()));
	}
}
function initCoins(count){
	//coins.push(initCoin(1000,250)); // x: 1000 - *, y: 200 - 300,  
	let y = 0;
	let x = 1000; 
	for (let i = 0; i < count; i++){
		x += Math.floor(Math.random() * (300) )+30;
		y = Math.floor(Math.random() * (300) )+100;
		coins.push(initCoin(x,y));
	}
}
function initCoin(x,y){
	let coin = new Character(x,y,canvas,0.3); // speed 20 is equal to bgImages
	coin.addState('coin',"img/8.Coin/coin",2);//addState(type,"img/8.Coin/coin",2);
	return coin;
}
function initBottles(count){
	let x = 1000;
	for (let i = 0; i < count; i++){
		x += Math.floor(Math.random() * (500) )+100;
		bottles.push(initBottle(x));
	}
}
function initBottle(x){
	let bottle = new Character(x,415,canvas,0.15); 
	let angle = Math.floor(Math.random()*2)+1;
	bottle.addState('Idle',"img/6.Bottle/Angle"+angle+"/Angle",1);
	bottle.addState('Jump',"img/6.Bottle/Spin/Spin",12);
	bottle.addState('Injured',"img/6.Bottle/Splash/Splash",6);
	bottle.setState('Idle');
	return bottle;
}
function initStatusBars(bars,state){
	bars[0] = new Image();
    bars[0].src = "img/7.Bars/"+state+"/0_.png";
	bars[20] = new Image();
    bars[20].src = "img/7.Bars/"+state+"/20_.png";
	bars[40] = new Image();
    bars[40].src = "img/7.Bars/"+state+"/40_.png";
	bars[60] = new Image();
    bars[60].src = "img/7.Bars/"+state+"/60_.png";
	bars[80] = new Image();
    bars[80].src = "img/7.Bars/"+state+"/80_.png";
	bars[100] = new Image();
    bars[100].src = "img/7.Bars/"+state+"/100_.png";
}
function initPepe(){
	Pepe = new Character(100,240,canvas,0.2);
	Pepe.addState('Idle',"img/2.Pepe/1.Idle/Idle/I-",10);
	Pepe.addState('Long_Idle',"img/2.Pepe/1.Idle/Long_Idle/I-1",10);
	Pepe.addState('Walk',"img/2.Pepe/2.Walk/W-2",6);
	Pepe.addState('Jump',"img/2.Pepe/3.Jump/J-3",9);
	Pepe.addState('Injured',"img/2.Pepe/4.Injured/H-4",3);
	Pepe.addState('Death',"img/2.Pepe/5.Death/D-5",7);
	Pepe.setState('Idle');
}
function draw(){
	if(gameStopped){
		ctx.drawImage(startbg,0,0,canvas.width,startbg.height*canvas.width/startbg.width);
	}else{
		ctx.drawImage(background,0,0,canvas.width,background.height*canvas.width/background.width);
		//this.ctx.drawImage(bg,x,0,this.width,bg.height * this.width / bg.width);
		drawGround();
		drawObjects(coins);
		drawObjects(chickens);
		drawObjects(bottles);
		drawObjects(PepesBottles);
		Pepe.drawImage();
		showHelp();
		if(gameOver){
			clearInterval(ivl);
			isPause = true;
			if (won){
				ctx.drawImage(stopbg,0,0,canvas.width,stopbg.height*canvas.width/stopbg.width);
			}
			else{
				ctx.drawImage(lostbg,0,0,canvas.width,lostbg.height*canvas.width/lostbg.width);
			}
		}
	}
	requestAnimationFrame(draw);
}
function drawGround(){
	clouds.drawImage();
	mounts3.drawImage();
	//Pedro.drawImage();
	mounts2.drawImage();
	//Tito.drawImage();
	mounts1.drawImage();
}
function drawObjects(objs){
	if (Object.keys(objs).length > 0){
		for(let i = 0; i < Object.keys(objs).length; i++) objs[i].drawImage();
	}	
}
function drawBars(bars,state,y){
	let st = 0;
	if(state > 99) st = 100;
	else if(state > 79) st = 80;
	else if(state > 59) st = 60;
	else if(state > 39) st = 40;
	else if(state > 0) st = 20;
	ctx.drawImage(bars[st],40,y,bars[st].width*0.2,bars[st].height*0.2);
}
function animateObjects(objs){
		if (Object.keys(objs).length > 0){
		for(let i = 0; i < Object.keys(objs).length; i++){
		 objs[i].animate(gameSpeed);
		 if (objs == PepesBottles){
		 	animateBottles(i);
		 }else if (checkForCollision(Pepe,objs[i])) {
		 		if (objs == chickens){
		 			if(!Pepe.isJumping && !objs[i].isDeath){
					 lifeBarsState -= 10;
					 objs.splice(i,1);
					 collision_sound.play();
					 //Pepe.halt();
					 Pepe.injure();
					 //setTimeout(function(){Pepe.setState("Idle");},500);
					}else if (Pepe.isFalling){
						//k.o.
						objs[i].death();
						//objs.splice(i,1);
					}

				 }else if (objs == coins) {
					if (lifeBarsState != 100) lifeBarsState++;
					objs.splice(i,1);
				}else if (objs == bottles) {
					bottleBarsState++;
					objs.splice(i,1);
				}
		 }else if(objs[i].x+objs[i].width < 0){
			objs.splice(i,1);  // destroy what you no more seen
		 }
		}
	}
}
function animateBottles(b){
		if (Object.keys(chickens).length > 0){
			for(let i = 0; i < Object.keys(chickens).length; i++){
			 chickens[i].animate(gameSpeed);
			 if(PepesBottles[b].isJumping == false) {PepesBottles.splice(b,1);return;}
			 else {
			 		PepesBottles[b].ybevorejump = 415;	 
     				 if (checkForCollision(PepesBottles[b],chickens[i])) {
					 		chickens.splice(i,1);
							collision_sound.play();
							PepesBottles[b].splice(b,1);
							return;
					 }
			 }
			}
		}
}
function showHelp(){
	let y = 10
	ctx.font = y + "px Arial";

	//ctx.fillText("Start/Stop: ESC", 10, y + 5);
	//ctx.fillText("Space: jump Pepe", 10, 2*y+5);
	//ctx.fillText("Arrows: move Pepe left / right", 10,  3*y +5);
	
	ctx.fillText(lifeBarsState+"x", 10, 4*y+ 3);
	ctx.fillText(bottleBarsState+"x", 10, 6*y + 3);//ctx.fillText("Game X: " + GameX, 10, 5*y + 5);
	//ctx.fillText(chickens.length+"x", 10, 8*y + 3);//ctx.fillText("Pepe X,Y: " + (GameX + Pepe.x) + "," + Pepe.y, 10, 4*y + 5);
	
	drawBars(lifeBars,lifeBarsState,2*y);
	drawBars(bottleBars,bottleBarsState,4*y);
	//drawBars(coinBars,chickens.length,6*y);
}
function FireBottle(){
	if(bottleBarsState > 0){
		bottleBarsState--;
		let bottle = initBottle(Pepe.x+Pepe.width+1);
		
		bottle.y = 380;
		bottle.isMoving = true;
		bottle.jump(8);
		PepesBottles.push(bottle);
		bottle.stopJumping = true;
	}	
}
function listenForKeys(){
	document.addEventListener('click', e => {
		if(!gameOver){
			if(gameStopped) {ivl  = setInterval(animate,20);gameStopped = false;}
			else if(isPause) {ivl  = setInterval(animate,20);isPause = false;}//start_sound.play();
			else {clearInterval(ivl); isPause = true;start_sound.pause();}
		}else location.reload();
	});
	document.addEventListener("keydown", e => {
		let character = Pepe;
		const k = e.key;
		//console.log(e.code, k);
		/*
		if( e.code == 'Escape'){
			if(isPause) {ivl  = setInterval(animate,20); isPause = false;}//start_sound.play();
			else {clearInterval(ivl); isPause = true;start_sound.pause();}
		}
		*/
		if( k == 'ArrowUp'){
			character.jump();
		}
		if( e.code == 'KeyX'){
			if(character.isMovingLeft) character.isMovingLeft = false;
			else character.isMovingLeft = true;
		}
		if( k == 'ArrowRight'){
			if(!isPause) character.move(1);
		}

		if( k == 'ArrowLeft'){
			if(!isPause) character.move(-1);
		}
		if( e.code == 'Space'){
			FireBottle();
		}
	});
	document.addEventListener("keyup", e => {
		let character = Pepe;
		const k = e.key;
		if( k == 'ArrowRight'){
			character.halt();
		}

		if( k == 'ArrowLeft'){
			character.halt();
		}
		if( k == 'ArrowUp'){
			character.nojump();
		}

	});
	document.addEventListener("mousedown", e => {
		//console.log(e.path);
	});
}