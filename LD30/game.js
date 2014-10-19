

var canvas;
var context;
var ASSETS = {};
var Game = {};
var Mouse;
var Music;

function start()
{
	ASSETS = loadAssets("assets.json", init);
}


function init()
{
	console.log("init");
	canvas = document.getElementById("MainCanvas");
	context = canvas.getContext('2d');

	initGame();

	document.documentElement.addEventListener('mousemove', onmousemove, false);
	document.documentElement.addEventListener('mousedown', onmousedown, false);
	document.documentElement.addEventListener('mouseup', onmouseup, false);

	requestAnimationFrame(frame);
}

function initGame()
{
	Mouse = new mouse();

	Game.Planets = [];
	Game.Ropes = [];
	Game.Planets.push(new planet([300, 300], [0,0], 10000, 0, "SUN"));
	Game.Score = {};
	Game.Score = new score();

	Game.background_image = ASSETS.images["background"];

	Music = ASSETS.audio["music"];
	// Music.addEventListener('timeupdate', function(){
 //                var buffer = .44
 //                if(this.currentTime > this.duration - buffer){
 //                    this.currentTime = 0
 //                    this.play()
 //                }}, false);
	Music.play();
	Music.loop = true;

	console.log("Initializing Game");
	Music.isPlaying = true;
	document.getElementById("Music").onclick = toggleMusic;



}

function getMousePos(canvas, e) {
	var rect = canvas.getBoundingClientRect();
	return [e.clientX - rect.left, e.clientY - rect.top];
}

function onmousemove(e)
{
	Mouse.move(getMousePos(canvas, e));
}

function onmousedown(e)
{
	Mouse.down(getMousePos(canvas, e));
}

function onmouseup(e)
{
	Mouse.up(getMousePos(canvas, e));
}

function toggleMusic()
{
	console.log("toggleMusic")
	if(Music.isPlaying)
	{
		Music.pause();
		Music.currentTime = 0;
		Music.isPlaying = false;
	}
	else
	{
		Music.play();
		Music.isPlaying = true;
	}
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
	for(var i = 0; i < Game.Ropes.length; i++)
	{
		Game.Ropes[i].update();
	}
	for(var i = 0; i < Game.Planets.length; i++)
	{
		Game.Planets[i].update();
	}
	for(var i = 0; i < Game.Planets.length; i++)
	{
		for(var j = i + 1; j < Game.Planets.length; j++)
		{
			if(Game.Planets[i].checkCollide(j))
			{
				Game.Planets[i].collide(j);
			}
		}
	}

	Game.Score.update();
	generate_planet();

}

function generate_planet()
{
	if(Math.random() < 0.005 )
	{
		console.log(Game.Planets.length);

		var x = Math.random() * 600;
		var y = Math.random() * 600;

		var x_;
		var y_;

		var vx;
		var vy;

		if(x > 300)
		{
			x_ = x + 300;
			vx = -1 * (x - 300) / 100;
		}
		if(x < 300)
		{
			x_ = x - 300;
			vx = x / 100;
		}

		if(y > 300)
		{
			y_ = y + 300;
			vy = -1 * (y - 300) / 100;
		}
		if(y < 300)
		{
			y_ = y - 300;
			vy = y / 100;
		}

		var mass = Math.random() * 4000 + 500;

		var type;
		if(mass < 1200)
		{
			type = "PLANET1"
		}
		else if( mass < 2200)
		{
			type = "PLANET2"
		}
		else
		{
			type = "PLANET3"
		}
		
		Game.Planets.push(new planet([x_, y_], [vx,vy], 800, Game.Planets.length, type));
	}
}

function render()
{
	context.clearRect( 0, 0, canvas.width, canvas.height );

	context.drawImage(Game.background_image, 0, 0);

	for(var i = 0; i < Game.Ropes.length; i++)
	{
		Game.Ropes[i].render();
	}
	for(var i = 0; i < Game.Planets.length; i++)
	{
		Game.Planets[i].render();
	}
	Game.Score.render();
}

window.onload = start;