
planet = function(p, v, mass, index, type)
{
	this.scored = false;
	this.alive = true;
	this.pos = p;
	if(type === "SUN")
	{
		this.image = ASSETS.images["sun"];
		this.planetATTR = ASSETS.json["sunATTR"];
		this.scored = true;
	}
	else if( type === "PLANET1")
	{
		this.image = ASSETS.images["Planet1"];
		this.planetATTR = ASSETS.json["planet1ATTR"];
	}
	else if( type === "PLANET2")
	{
		this.image = ASSETS.images["Planet2"];
		this.planetATTR = ASSETS.json["planet2ATTR"];
	}
	else if( type === "PLANET3")
	{
		this.image = ASSETS.images["Planet3"];
		this.planetATTR = ASSETS.json["planet3ATTR"];
	}
	this.vel = v;
	this.mass = mass;
	this.connections = [];
	this.index = index;
}

planet.prototype.update = function()
{
	if(this.alive)
	{
		this.pos[0] += this.vel[0];
		this.pos[1] += this.vel[1];

		//Bounds killin
		if(this.pos[0] > 1000)
		{
			this.kill();
		}
		if(this.pos[1] > 1000)
		{
			this.kill();
		}
		if(this.pos[0] < -400)
		{
			this.kill();
		}
		if(this.pos[0] < -400)
		{
			this.kill();
		}
	}
}

planet.prototype.render = function()
{
	if(this.alive)
	{
		context.save();
		context.translate(this.pos[0], this.pos[1]);
		// context.rotate(2);
		context.translate(0 - this.planetATTR.center[0], 0 - this.planetATTR.center[1]);
		context.drawImage(this.image, 0, 0);
		context.restore();
	}
}

planet.prototype.checkClick = function(mousePos)
{
	if(this.alive)
	{
		if(distance(mousePos, this.pos) < this.planetATTR.planet_size)
		{
			console.log("click true")
			return true;
		}
		else
			return false;
	}
	return false;
}


planet.prototype.force = function(f)
{
	// console.log("Accelerate");
	this.vel[0] += f[0] / this.mass;
	this.vel[1] += f[1] / this.mass;
}

planet.prototype.kill = function()
{
	this.alive = false;
	// console.log("Killt that vitch")
}

planet.prototype.checkCollide = function(otherPlanet)
{
	//other planet is an index
}

planet.prototype.collide = function(otherPlanet)
{
	//these two planets have collided

}

planet.prototype.scoreConnect = function()
{
	this.scored = true;
}

planet.prototype.scoreCheck = function()
{
	return this.alive && this.scored;
}
