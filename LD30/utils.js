
function distance(p1, p2)
{
	return Math.sqrt(((p1[0] - p2[0]) * (p1[0] - p2[0])) + ((p1[1] - p2[1]) * (p1[1] - p2[1])));
}

function draw_line(from, to, image)
{
	context.save();

	var angle = Math.atan2((to[1] - from[1]), (to[0] - from[0]) );
	context.translate(0, -2);
	context.translate(from[0], from[1]);
	context.rotate(angle);
	context.scale(distance(from, to) / 400, 1.0);
	context.drawImage(image, 0, 0);
	context.restore();
}