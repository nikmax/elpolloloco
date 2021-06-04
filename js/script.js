let canvas,ctx;
let bgScale = 0.5;
let gameSpeed = 1;
let gameLevel = 1;
let GameX = 0;
let wind = 0.2;
let background,clouds, mounts1,mounts2,mounts3;
let Pepe, Tito, Pedro, Vito, Diego, Carlos;
let isPause = true;
let coins = new Array();
let chickens = new Array();
let bottles = new Array();
let colission = false;
let collisionobj = 0;
let start_sound;
let ivl;
let lifeBars = new Array();
let coinBars = new Array();
let bottleBars = new Array();

let lifeBarsState = 100, coinBarsState = 0, bottleBarsState = 0;

start_sound = new Audio('sounds/start.mp3');
start_sound.load();

/**
 * general initialize function
 */
function init(){
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	initBackgrounds(0.2);
	initPepe();
	coins.push(initCoin(1000,250)); // x: 1000 - *, y: 200 - 300,  
	coins.push(initCoin(1100,250));
	coins.push(initCoin(1200,260));
	coins.push(initCoin(1300,270));
	chickens.push(initChicken(800,400,0.5));
	chickens.push(initChicken(1800,400,0.5));
	chickens.push(initChicken(2000,400,0.7));
	chickens.push(initChicken(2400,400,0.5));
	chickens.push(initChicken(2500,400,0.3));
	initBottles(300);
	initStatusBars(lifeBars,'Life');
	initStatusBars(coinBars,'Coins');
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
}
function checkForCollision(coin){
	return (Pepe.x + Pepe.width > coin.x &&
			Pepe.y +Pepe.height > coin.y &&
			Pepe.x < coin.x &&
			Pepe.y + Pepe.height/2  < coin.y + coin.height);
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
function initCoin(x,y){
	let coin = new Character(x,y,canvas,0.3); // speed 20 is equal to bgImages
	coin.addState('coin',"img/8.Coin/coin",2);//addState(type,"img/8.Coin/coin",2);
	return coin;
}
function initBottles(count){
	let min = 1000;
	let x = 1000;
	for (let i = 0; i < count; i++){
		x += Math.floor(Math.random() * (1000) )+100;
		bottles.push(initBottle(x));
	}
}
function initBottle(x){
	let bottle = new Character(x,415,canvas,0.15); 
	let angle = Math.floor(Math.random()*2)+1;
	bottle.addState('bottle',"img/6.Bottle/Angle"+angle+"/Angle",1);
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
	ctx.drawImage(background,0,0,canvas.width,background.height*canvas.width/background.width);
	//this.ctx.drawImage(bg,x,0,this.width,bg.height * this.width / bg.width);
	drawGround();
	drawObjects(coins);
	drawObjects(chickens);
	drawObjects(bottles);
	Pepe.drawImage();
	showHelp();
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
	ctx.drawImage(bars[st],10,y,bars[st].width*0.2,bars[st].height*0.2);
}
function animateObjects(objs){
		if (Object.keys(objs).length > 0){
		for(let i = 0; i < Object.keys(objs).length; i++){
		 objs[i].animate(gameSpeed);
		 if (checkForCollision(objs[i])) {
		 		if (objs == chickens){
					 lifeBarsState--;
					 objs.splice(i,1);
				 }else if (objs == coins) {
					coinBarsState++;
					objs.splice(i,1);
				}else if (objs == bottles) {
					bottleBarsState++;
					objs.splice(i,1);
				}
		 }
		}
	}
}
function showHelp(){
	let y = 10
	ctx.font = y + "px Arial";
	ctx.fillText("Start/Stop: ESC", 10, y + 5);
	ctx.fillText("Space: jump Pepe", 10, 2*y+5);
	ctx.fillText("Arrows: move Pepe left / right", 10,  3*y +5);
	ctx.fillText("Pepe X,Y: " + (GameX + Pepe.x) + "," + Pepe.y, 10, 4*y + 5);
	ctx.fillText("Game X: " + GameX, 10, 5*y + 5);
	ctx.fillText("Colissions: " + collisionobj, 10, 6*y + 5);
	drawBars(lifeBars,lifeBarsState,7*y);
	drawBars(coinBars,coinBarsState,8*y+20);
	drawBars(bottleBars,bottleBarsState,9*y+40);
}
function listenForKeys(){
	document.addEventListener("keydown", e => {
		let character = Pepe;
		const k = e.key;

		//console.log(e);
		if( e.code == 'Escape'){
			if(isPause) {ivl  = setInterval(animate,20); isPause = false;}//start_sound.play();
			else {clearInterval(ivl); isPause = true;start_sound.pause();}
		}
		if( e.code == 'Space'){
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
		if( e.code == 'Space'){
			character.nojump();
		}

	});
	document.addEventListener("mousedown", e => {
		//console.log(e.path);
	});
}