
score = function()
{
	this.score = 0;
	context.fillStyle = "rgb(70,160,250)"; 
	context.font = "20px Helvetica";
}

score.prototype.update = function()
{
	var tempscore = 0;
	for(var i = 0; i < Game.Planets.length; i++)
	{
		if(Game.Planets[i].scoreCheck())
		{
			tempscore++;
		}
	}
	this.score = tempscore;
}

score.prototype.render = function()
{
	context.fillText("Score: " + this.score, 460, 30);
}
