let canvas,ctx;
let bgScale = 0.5;
let gameSpeed = 1;
let GameX = 0;
let wind = 0.2;
let background,clouds, mounts1,mounts2,mounts3;
let Pepe, Tito, Pedro, Vito, Diego, Carlos;
let isPause = false;
let coins = new Array();
let colission = false;
let collisionobj = 0;

/**
 * general initialize function
 */
function init(){
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	initBackgrounds(0.2);
	initPepe();
	/*
	Tito = new Character(400,330,canvas,0.1);
	Tito.addState('Idle',"img/2.Pepe/1.Idle/Idle",10);
	Tito.addState('Long_Idle',"img/2.Pepe/1.Idle/Long_Idle",10);
	Tito.addState('Walk',"img/2.Pepe/2.Walk",6);
	Tito.addState('Jump',"img/2.Pepe/3.Jump",9);
	Tito.addState('Death',"img/2.Pepe/5.Death",7);
	Tito.addState('Death',"img/2.Pepe/5.Death",7);
	Tito.setState('Idle');

	Pedro = new Character(620,350,canvas,0.07);
	Pedro.addState('Idle',"img/2.Pepe/1.Idle/Idle",10);
	Pedro.addState('Long_Idle',"img/2.Pepe/1.Idle/Long_Idle",10);
	Pedro.addState('Walk',"img/2.Pepe/2.Walk",6);
	Pedro.addState('Jump',"img/2.Pepe/3.Jump",9);
	Pedro.addState('Death',"img/2.Pepe/5.Death",7);
	Pedro.addState('Death',"img/2.Pepe/5.Death",7);
	Pedro.setState('Idle');
		*/
	coins.push(initCoin('coin',1000,250));
	coins.push(initCoin('coin',2000,250));
	coins.push(initCoin('coin',2100,260));
	coins.push(initCoin('coin',2200,270));
	
	draw();
	listenForKeys();
	Run(gameSpeed);
	setInterval(animate,20);

}
function animate(){
	GameX += gameSpeed;
	mounts1.animate(gameSpeed);
	mounts2.animate(gameSpeed);
	mounts3.animate(gameSpeed);
	clouds.animate(wind);
	Pepe.animate(gameSpeed);
	if (Object.keys(coins).length > 0){
		for(let i = 0; i < Object.keys(coins).length; i++){
		 coins[i].animate(gameSpeed);
		 if (checkForCollision(coins[i])) {
		 	//if(!colission){
		 		//Pepe.scale = Pepe.scale + 0.01;
		 		colission = true;
		 		collisionobj = i;
		 	//}
		 }else{
		  //if ( collisionobj == i) colission = false;
		 }
		}
	}
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
function initCoin(type,x,y){
	//let coin = new Character(); 
	let coin = new Character(x,y,canvas,0.3, 20); // speed 20 is equal to bgImages
	coin.addState(type,"img/8.Coin/coin",2);
	return coin;
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
	drawCoins();
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
function drawCoins(){
	if (Object.keys(coins).length > 0){
		for(let i = 0; i < Object.keys(coins).length; i++) coins[i].drawImage();
	}	
}

function Run(speed = 1){
	gameSpeed = speed;
	/*
	mounts1.gameSpeed = speed;
	mounts2.gameSpeed = speed;
	mounts3.gameSpeed = speed;
	Pepe.gameSpeed = speed;
	if (Object.keys(coins).length > 0){
	  for(let i = 0; i < Object.keys(coins).length; i++) coins[i].gameSpeed = speed;
	}
	*/
}
function Stop(){
	gameSpeed = 0;
	/*
	mounts1.gameSpeed = 0;	
	mounts2.gameSpeed = 0;	
	mounts3.gameSpeed = 0;
	Pepe.gameSpeed = 0;
	if (Object.keys(coins).length > 0){
	  for(let i = 0; i < Object.keys(coins).length; i++) coins[i].gameSpeed = 0;
	}
	*/
}
function showHelp(){
	let y = 10
	ctx.font = y + "px Arial";
	ctx.fillText("Start/Stop: ESC", 10, y + 5);
	ctx.fillText("Space: jump Pepe", 10, 2*y+5);
	ctx.fillText("Arrows: move Pepe left / right", 10,  3*y +5);
	ctx.fillText("Pepe X,Y: " + (GameX + Pepe.x) + "," + Pepe.y, 10, 4*y + 5);
	ctx.fillText("Game X: " + GameX, 10, 5*y + 5);
}
function listenForKeys(){
	document.addEventListener("keydown", e => {
		let character = Pepe;
		const k = e.key;

		//console.log(e);
		if( e.code == 'Escape'){
			if(isPause) {Run(1); isPause = false;}
			else {Stop(); isPause = true;}
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