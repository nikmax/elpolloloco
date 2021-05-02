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
      this.speed = initialspeed;
      this.ground1 = new Image();
      this.ground2 = new Image();
      this.loadImages(path);
      this.width = canvas.width;
      this.ctx = canvas.getContext("2d");
    }
    loadImages(path){
      this.ground1.src = path + "/1.png";
      this.ground2.src = path + "/2.png";
    }
    drawImage() {
      let bg0,bg1,bg2;
      let dx = parseInt( this.x / this.width);
      let ds = this.x % this.width;
  
      if (dx%2 == 0){
        bg0 = this.ground2; bg1 = this.ground1; bg2 = this.ground2;
      }else{
        bg0 = this.ground1; bg1 = this.ground2; bg2 = this.ground1;
      }
      this.drawBgItem(bg0,ds - this.width);//,0,this.width,bg0.height * this.width / bg0.width);
      this.drawBgItem(bg1,ds);//             ,0,this.width,bg1.height * this.width / bg1.width);
      this.drawBgItem(bg2,ds + this.width);//,0,this.width,bg2.height * this.width / bg2.width);
    }
    drawBgItem(bg,x){
    	this.ctx.drawImage(bg,x,0,this.width,bg.height * this.width / bg.width);
    }
    animate(gameSpeed){
      this.x -= this.speed * gameSpeed;
    }
    setSpeed(newspeed) {
      this.speed = newspeed;
    }
  }