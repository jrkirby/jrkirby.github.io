rope = function(target1)
{
	//targets are indexes of planets
	//-1 means the target is the mouse
	this.image = ASSETS.images["Line2"];
	this.target1 = target1;
	this.target2 = -1;
	this.alive = true;
}

rope.prototype.update = function()
{
	if(this.alive)
	{

		if(!Game.Planets[this.target1].alive)
		{
			this.kill();
		}
		if(this.target2 !== -1)
		{
			if(!Game.Planets[this.target2].alive)
			{
				this.kill();
			}
		}
		var from = [];
		var to = [];
		from.push(Game.Planets[this.target1].pos[0] + Game.Planets[this.target1].planetATTR.center[0]);
		from.push(Game.Planets[this.target1].pos[1] + Game.Planets[this.target1].planetATTR.center[1]);
		if(this.target2 === -1)
		{
			to.push(Mouse.pos[0]);
			to.push(Mouse.pos[1]);
		}
		else
		{
			to.push(Game.Planets[this.target2].pos[0] + Game.Planets[this.target1].planetATTR.center[0]);
			to.push(Game.Planets[this.target2].pos[1] + Game.Planets[this.target1].planetATTR.center[1]);
		}
		var force_on_from = [];
		force_on_from.push(to[0] - from[0]);
		force_on_from.push(to[1] - from[1]);

		Game.Planets[this.target1].force(force_on_from);

		if(this.target2 !== -1)
		{
			var force_on_to = [];
			force_on_to.push(from[0] - to[0]);
			force_on_to.push(from[1] - to[1]);
			Game.Planets[this.target2].force(force_on_to);
		}

	}
}

rope.prototype.render = function()
{
	if(this.alive)
	{

		var from = [];
		var to = [];
		from.push(Game.Planets[this.target1].pos[0]);
		from.push(Game.Planets[this.target1].pos[1]);
		if(this.target2 === -1)
		{
			to.push(Mouse.pos[0]);
			to.push(Mouse.pos[1]);
		}
		else
		{
			to.push(Game.Planets[this.target2].pos[0]);
			to.push(Game.Planets[this.target2].pos[1]);
		}
		
		draw_line(from, to, this.image);

	}
}

rope.prototype.connect = function(target2)
{
	//only call this once, during a mouse up event
	if(this.target1 === target2)
	{
		console.log("Cannot connect a Planet to itself");
		this.kill();
		return;
	}
	for(var i = 0; i < Game.Ropes.length; i++)
	{
		if( 
			(Game.Ropes[i].target1 === this.target1 
				|| Game.Ropes[i].target1 === target2)
			&& (Game.Ropes[i].target2 === this.target1
				|| Game.Ropes[i].target2 === target2) )
		{
			console.log("Cannot connect two Planets twice");
			this.kill();
			return;
		}
	}

	this.target2 = target2;
	Game.Planets[this.target1].scoreConnect();
	Game.Planets[this.target2].scoreConnect();
	// this.target2.scoreConnect();
}

rope.prototype.kill = function()
{
	this.alive = false;
}
