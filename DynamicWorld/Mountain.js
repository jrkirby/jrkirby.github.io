
Mountain = function(x, y, r, h)
{
	this.x = x;
	this.y = y;
	this.r = r;
	this.h = h;
	// console.log([x, y, r, h]);
}

Mountain.prototype.apply = function(x, y)
{
	var dist = (this.x - x) * (this.x - x) + (this.y - y) * (this.y - y);
	if(this.r < dist)
	{
		return 0;
	}
	var smooth = clamp(this.r - dist, -this.r, this.r) * this.h / this.r;
	// var smooth = smoothstep(-this.h, this.h, this.r - dist);
	// var atten = clamp(this.r - dist, 0, this.r);
	return smooth * noise.simplex2(x/8,y/8.0);
}

function smoothstep(edge0, edge1, x)
{
    // Scale, bias and saturate x to 0..1 range
    x = clamp((x - edge0)/(edge1 - edge0), 0.0, 1.0); 
    // Evaluate polynomial
    return x*x*(3 - 2*x);
}

function clamp(in_, min, max) {
  return Math.min(Math.max(in_, min), max);
}