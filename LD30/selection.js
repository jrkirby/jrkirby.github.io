
selection = function(planet_index)
{
	this.planet_from = planet_index;
	this.pos_to = Game.Planets[this.planet_from].pos;
}

selection.prototype.update()
{
	console.log("Selected: " + this.planet_from);
}

selection.prototype.render()
{

}