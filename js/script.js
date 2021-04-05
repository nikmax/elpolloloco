let canvas,ctx;

let SPEED = 2;


let pepeImage;
let pepeIndex = 0;
pepeStateImages = pepeIdleImages;
pepeImage = pepeStateImages[pepeIndex];


function init(){
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

	//animateCharacter(Pepe);
	setInterval(function(){
		document.getElementById("img").src = Pepe.image.src;
	},50);
	draw();
	listenForKeys();
}

function draw(){
	drawBackground();
	updateCharacter(Pepe);
	requestAnimationFrame(draw);
}

function drawBackground(){
	ctx.fillStyle = "white";
	ctx.fillRect(0,0,canvas.width,canvas.height);
	drawGround();
}

function drawGround(){
	ctx.fillStyle = "yellow";
	ctx.fillRect(0,100,canvas.width,canvas.height);
}

function updateCharacter(character){
	let img = character.image;
	//checkForJumping();
	ctx.drawImage(img,character.x,character.y,img.width*character.scale,img.height*character.scale);
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
	let character = Pepe;
	document.addEventListener("keydown", e => {
		const k = e.key;
		if( k == 'ArrowRight'){
			character.move();
		}

		if( k == 'ArrowUp'){
			character.isJumping = true;
		}
	});
	document.addEventListener("keyup", e => {
		const k = e.key;
		if( k == 'ArrowRight'){
			character.halt();
		}

		if( k == 'ArrowUp'){
			character.isJumping = false;
		}
	});
}