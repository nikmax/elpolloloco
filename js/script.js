let canvas,ctx;
let bgScale = 0.5;
let gameSpeed = 1;
let clouds, mounts1,mounts2,mounts3;
let Pepe, Tito, Pedro, Vito, Diego, Carlos;
let isPause = true;


function init(){
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

	mounts1 = new BgImage("img/5.BG/Pics/1.Mounts",canvas,1);
	mounts2 = new BgImage("img/5.BG/Pics/2.Mounts",canvas,0.5);
	mounts3 = new BgImage("img/5.BG/Pics/3.Mounts",canvas,0.2);
	clouds  = new BgImage("img/5.BG/Pics/4.Clouds",canvas,0.3);
	clouds.gameSpeed = 0.2;


	Pepe = new Character(100,240,canvas,0.2);
	Pepe.addState('Idle',"img/2.Pepe/1.Idle/Idle/I-",10);
	Pepe.addState('Long_Idle',"img/2.Pepe/1.Idle/Long_Idle/I-1",10);
	Pepe.addState('Walk',"img/2.Pepe/2.Walk/W-2",6);
	Pepe.addState('Jump',"img/2.Pepe/3.Jump/J-3",9);
	Pepe.addState('Injured',"img/2.Pepe/4.Injured/H-4",3);
	Pepe.addState('Death',"img/2.Pepe/5.Death/D-5",7);
	Pepe.setState('Idle');
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
	draw();
	listenForKeys();
}

function draw(){
	drawBackground();
	Pepe.drawImage();
	requestAnimationFrame(draw);
}

function drawBackground(){
	let bg = new Image();  						// warum nicht einmal definieren und dann nur drawImage...?
	bg.src = "img/5.BG/Pics/5.Horizont.png";
	if(bg.complete) ctx.drawImage(bg,0,0,canvas.width,canvas.height);
	drawGround();
}

function drawGround(){
	clouds.drawImage();
	mounts3.drawImage();
	//Pedro.drawImage();
	mounts2.drawImage();
	//Tito.drawImage();
	mounts1.drawImage();
ctx.font = "30px Arial";
ctx.fillText("Pepe: " + Pepe.x, 10, 50);
}

function Run(speed = 1){
	mounts1.gameSpeed = speed;
	mounts2.gameSpeed = speed;
	mounts3.gameSpeed = speed;
	Pepe.gameSpeed = speed;
}
function Stop(){
	mounts1.gameSpeed = 0;	
	mounts2.gameSpeed = 0;	
	mounts3.gameSpeed = 0;
	Pepe.gameSpeed = 0;
}

/*
function checkForJumping(){
	if(isJumping){
		console.log('jump');
		return;
		if(pepe_jump == 0) pepeIndex = 0;
		pepe_x += SPEED;
		if(isFalling){
			pepe_jump--;
			if(pepe_jump == 0){
				isJumping = false;
				isFalling = false;
			}
		}else{
			pepe_jump++;
			if(pepe_jump > JUMP_MAX) isFalling = true;
		}
	}
}
*/

function listenForKeys(){

	document.addEventListener("keydown", e => {
		let character = Pepe;
		const k = e.key;

		console.log(e);
		if( e.code == 'Space'){
			if(isPause) {Run(gameSpeed); isPause = false;}
			else {Stop(); isPause = true;}
		}
		if( k == 'ArrowRight'){
			if(!isPause) character.move();
		}

		if( k == 'ArrowUp'){
			//character.isJumping = true;
		}
	});
	document.addEventListener("keyup", e => {
		let character = Pepe;
		const k = e.key;
		if( k == 'ArrowRight'){
			character.halt();
		}

		if( k == 'ArrowUp'){
			//character.isJumping = false;
		}
	});
	document.addEventListener("mousedown", e => {
		console.log(e.path);
	});
}