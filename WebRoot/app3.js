/**
 * 
 */
var canvas,stage,sprite;
var img = new Image();

window.onload = function(){
	canvas = document.getElementById("canvas");
	stage = new createjs.Stage(canvas);
	
	stage.addEventListener("stagemousedown",clickCanvas);
	stage.addEventListener("stagemousemove",moveCanvas);
	
	var data = {
		images:['./raw/4.jpg'],
		frames:{width:20,height:20,regX:1,regY:1}
	}
	
	sprite = new createjs.Sprite(new createjs.SpriteSheet(data));
	createjs.Ticker.setFPS(20);
	createjs.Ticker.addEventListener("tick",tick);
	
}

function clickCanvas(e){
	addStar(Math.random()*200+100,stage.mouseX,stage.mouseY,2);
}

function moveCanvas(e){
	addStar(Math.random()*2+1,stage.mouseX,stage.mouseY,1);
}

function tick(e){
	var t = stage.getNumChildren();
	for(var i=t-1;i>0;i--){
		var s = stage.getChildAt(i);
		
		s.vX = s.vX+1;
		s.vY = s.vY+2;
		s.x = s.x+s.vX;
		s.y = s.y+s.vY;
		
		s.scaleX = s.scaleX+s.vS; 
		s.scaleY = s.scaleY+s.vS;
		s.alpha = s.alpha+s.vA;
		
		if(s.alpha<=0 || s.y>canvas.height){
			stage.removeChildAt(i);
		}
	}
	
	stage.update(e);
}

function addStar(count,x,y,speed){
	for(var i=0;i<count;i++){
		var s = sprite.clone();
		s.x = x;
		s.y = y;
		
		//星星的透明度
		s.alpha = Math.random()*0.5+0.5;
		
		//星星的大小(缩放)
		s.scaleX = Math.random()+0.3;
		s.scaleY = Math.random()+0.3;
		
		//下落的弧度
		var a = Math.PI*2*Math.random();
		//下落的速度
		var v = (Math.random()-0.5)*30*speed;
		s.vX = Math.cos(a)*v;
		s.vY = Math.sin(a)*v;
		s.vS = (Math.random()-0.5)*0.2; //scale
		s.vA = -Math.random()*0.05-0.01; //alpha
		stage.addChild(s);
	}
}