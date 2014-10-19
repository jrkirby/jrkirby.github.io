

var canvas;
var context;
var ASSETS = {};

var left = false;
var up = false;
var right = false;
var down = false;

function start()
{
	ASSETS = loadAssets("assets.json", init);
}

function initGL() {
	try {
		gl = canvas.getContext("experimental-webgl");
		gl.viewportWidth = canvas.width;
		gl.viewportHeight = canvas.height;
	} catch(e) {
	
	}
	if (!gl) {
		alert("Could not initialise WebGL, sorry :-( ");
	}
}



function init()
{
	canvas = document.getElementById("MainCanvas");
	initGL();
	wo = new WorldObject();

	gl.clearColor(0.2, 0.3, 0.6, 1.0);
	gl.enable(gl.DEPTH_TEST);

	window.addEventListener("keydown", keyDown, false);
	window.addEventListener("keyup", keyUp, false);
	requestAnimationFrame(frame);

}

function frame()
{
	// console.log("frame")
	update();
	render();
	requestAnimationFrame(frame);
}

function update()
{
	wo.update();
	if(left)
		wo.turnLeft();
	if(right)
		wo.turnRight();
	if(up)
		wo.moveForward();
	if(down)
		wo.moveBackward();
}

function render()
{
	wo.render();
}

function keyDown(event)
{
	if(event.keyCode === 37)
	{
		left = true;
	}
	if(event.keyCode === 39)
	{
		right = true;
	}
	if(event.keyCode === 38)
	{
		up = true;
	}
	if(event.keyCode === 40)
	{
		down = true;
	}
}
function keyUp(event)
{
	if(event.keyCode === 37)
	{
		left = false;
	}
	if(event.keyCode === 39)
	{
		right = false;
	}
	if(event.keyCode === 38)
	{
		up = false;
	}
	if(event.keyCode === 40)
	{
		down = false;
	}
}


window.onload = start;