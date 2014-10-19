

mouse = function()
{
	this.isDown = false;
	this.pos = [0, 0];
	this.state = "normal";
	this.current_rope = 0;
}

mouse.prototype.down = function(pos)
{
	this.isDown = true;
	this.pos = pos;

	var planet = -1;
	for(var i = 0; i < Game.Planets.length; i++)
	{
		if(Game.Planets[i].checkClick(this.pos))
		{
			planet = i;
		}
	}
	if(planet !== -1)
	{
		Game.Ropes.push(new rope(planet));
		this.state = "roped";
	}
}

mouse.prototype.up = function(pos)
{
	this.isDown = false;
	this.pos = pos;

	if(this.state === "roped")
	{
		var planet = -1;
		for(var i = 0; i < Game.Planets.length; i++)
		{
			var check = Game.Planets[i].checkClick(this.pos);
			if(check)
			{
				planet = i;
			}
		}
		if(planet !== -1)
		{
			Game.Ropes[this.current_rope].connect(planet);
			this.current_rope++;
		}
		else
		{
			Game.Ropes[this.current_rope].kill();
			this.current_rope++;
		}


		this.state = "normal";
	}
}

mouse.prototype.move = function(pos)
{
	this.pos = pos;
}

mouse.prototype.update = function()
{

}

