
function lerp(a, b, t) {
    return (1-t)*a + t*b;
}

WorldObject = function()
{
	noise.seed(42);
	this.size = 200;
	this.mvMatrix = mat4.create();
    this.mvMatrixStack = [];
    this.pMatrix = mat4.create();

    this.xRot = -80;
    this.yRot = 0;
    this.zRot = 0;

    this.x = 0;
    this.y = 0;
    this.z = -1;

    // this.mounts = [];
    // this.GenerateMountains(30);
    this.superGrid = [];
	this.generateSuperGrid();
    this.speed = 0.3;

    this.lastsquare = [0,0];

	this.shaderProgram = {};
	this.initShaders();

	this.vertPos = {};
	this.vertOffsetX = {};
	this.vertOffsetY = {};
	this.OffsetX = 0;
	this.OffsetY = 0;


	this.VertexPositionBuffer = {};
	this.VertexTextureCoordBuffer = {};
	this.VertexIndexBuffer = {};

	this.initBuffers();

	this.initTexture();

}

WorldObject.prototype.update = function()
{
	if(this.x > this.lastsquare[0] + 1)
	{
		this.lastsquare[0]++;
		this.initBuffers();
	}
	else if(this.x < this.lastsquare[0])
	{
		this.lastsquare[0]--;
		this.initBuffers();
	}
	if(this.y > this.lastsquare[1] + 1)
	{
		this.lastsquare[1]++;
		this.initBuffers();
	}
	else if(this.y < this.lastsquare[1])
	{
		this.lastsquare[1]--;
		this.initBuffers();
	}
	// if(Math.random() > 0.85)
	// {
	// 	this.generateOutOfSight();
	// 	this.initBuffers();
	// }
	var dx = this.x - Math.floor(this.x);
	var dy = this.y - Math.floor(this.y);
	var z1 = this.vertPos[(Math.floor(this.size / 2) * this.size + Math.floor(this.size / 2)) * 3 + 2];
	var z2 = this.vertPos[((Math.floor(this.size / 2) + 1) * this.size + Math.floor(this.size / 2)) * 3 + 2];
	var z3 = this.vertPos[(Math.floor(this.size / 2) * this.size + Math.floor(this.size / 2) + 1) * 3 + 2];
	var z4 = this.vertPos[((Math.floor(this.size / 2) + 1) * this.size + Math.floor(this.size / 2) + 1) * 3 + 2];
	var z5 = lerp(lerp(z1, z2, dx), lerp(z3, z4, dx), dy);
	this.z = (-z5 - 2);

	if(Math.random() > 0.95)
	{
		this.subtleChange();
		this.initBuffers();
	}
}

WorldObject.prototype.initShaders = function()
{

	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vertexShader, ASSETS.json["shaders"].vertex);
	gl.compileShader(vertexShader);
	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fragmentShader, ASSETS.json["shaders"].fragment);
	gl.compileShader(fragmentShader);
	// console.log(vertexShader);
	this.shaderProgram = gl.createProgram();
	gl.attachShader(this.shaderProgram, vertexShader);
	gl.attachShader(this.shaderProgram, fragmentShader);
	gl.linkProgram(this.shaderProgram);

	if (!gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS)) {
		alert("Could not initialise shaders");
	}

	gl.useProgram(this.shaderProgram);

	this.shaderProgram.vertexPositionAttribute = gl.getAttribLocation(this.shaderProgram, "aVertexPosition");
	gl.enableVertexAttribArray(this.shaderProgram.vertexPositionAttribute);

	this.shaderProgram.textureCoordAttribute = gl.getAttribLocation(this.shaderProgram, "aTextureCoord");
	gl.enableVertexAttribArray(this.shaderProgram.textureCoordAttribute);

	this.shaderProgram.pMatrixUniform = gl.getUniformLocation(this.shaderProgram, "uPMatrix");
	this.shaderProgram.mvMatrixUniform = gl.getUniformLocation(this.shaderProgram, "uMVMatrix");
	this.shaderProgram.samplerUniform = gl.getUniformLocation(this.shaderProgram, "uSampler");




}

WorldObject.prototype.initBuffers = function()
{
	this.VertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexPositionBuffer);
	var vertices = this.generateVertCoords();
	this.vertPos = vertices;
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
	this.VertexPositionBuffer.itemSize = 3;
	this.VertexPositionBuffer.numItems = 3 * this.size * this.size;

	this.TextureCoordBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.TextureCoordBuffer);
	var texCoords = this.generateTexCoords();
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoords), gl.DYNAMIC_DRAW);
	this.TextureCoordBuffer.itemSize = 2;
	this.TextureCoordBuffer.numItems = 2 * this.size * this.size;

	this.VertexIndexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.VertexIndexBuffer);
	var indices = this.generateVertIndices();
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.DYNAMIC_DRAW);
	this.VertexIndexBuffer.itemSize = 1;
	this.VertexIndexBuffer.numItems = (this.size - 1) * (this.size - 1) * 6;



}

WorldObject.prototype.generateVertCoords = function()
{
	verts = [];
	for(var x = Math.floor(this.x) - (this.size / 2); x < Math.floor(this.x) + (this.size / 2); x++)
	{
		for(var y = Math.floor(this.y) - (this.size / 2); y < Math.floor(this.y) + (this.size / 2); y++)
		{
			verts.push(-x);
			verts.push(-y);
			
			// verts.push(NoiseOctaves(x, y));
			// verts.push(this.SumMountains(x,y) + NoiseOctaves(x, y));
			verts.push(this.noiseLerps(x, y))
		}
	}
	return verts;
}

WorldObject.prototype.generateSuperGrid = function()
{
	var i = 0;
	for(var x = Math.floor(this.x) - (this.size); x < Math.floor(this.x) + (this.size); x += 1)
	{
		for(var y = Math.floor(this.y) - (this.size); y < Math.floor(this.y) + (this.size); y += 1)
		{
			this.superGrid[i] = new perlinLerp();
			i++;
		}
	}
}
perlinLerp = function()
{
	this.freq1 = Math.random() * 42 + 20;
	this.freq2 = Math.random() * 60 + 40;
	this.freq3 = Math.random() * 50 + 100;
	this.amp1 = Math.random() * 5 + 3;
	this.amp2 = Math.random() * 2 + 3;
	this.amp3 = Math.random() * 6 + 5;
};

function NoiseOctaves(x, y)
{
	return noise.simplex2(x/15.0,y/15.0) * 1 + noise.simplex2(x/40.0,y/40.0) * 2 + noise.simplex2(x/100.0,y/100.0) * 3;
}

WorldObject.prototype.noiseLerps = function(x, y)
{
	var superX = Math.floor(x / 20);
	var superY = Math.floor(y / 20);

	var superDX = x / 20 - superX;
	var superDY = y / 20 - superY;

	var pl1Index = (superX + this.size) + (superY + this.size) * 2 * this.size;
	var pl1 = this.superGrid[pl1Index];
	var pl2 = this.superGrid[pl1Index + 1];
	var pl3 = this.superGrid[pl1Index + 2 * this.size];
	var pl4 = this.superGrid[pl1Index + 1 + 2 * this.size];
	var n1 = noise.simplex2(x/pl1.freq1,y/pl1.freq1) * pl1.amp1
		   + noise.simplex2(x/pl1.freq2,y/pl1.freq2) * pl1.amp2
		   + noise.simplex2(x/pl1.freq3,y/pl1.freq3) * pl1.amp3;
	var n2 = noise.simplex2(x/pl2.freq1,y/pl2.freq1) * pl2.amp1
		   + noise.simplex2(x/pl2.freq2,y/pl2.freq2) * pl2.amp2
		   + noise.simplex2(x/pl2.freq3,y/pl2.freq3) * pl2.amp3;
	var n3 = noise.simplex2(x/pl3.freq1,y/pl3.freq1) * pl3.amp1
		   + noise.simplex2(x/pl3.freq2,y/pl3.freq2) * pl3.amp2
		   + noise.simplex2(x/pl3.freq3,y/pl3.freq3) * pl3.amp3;
	var n4 = noise.simplex2(x/pl4.freq1,y/pl4.freq1) * pl4.amp1
		   + noise.simplex2(x/pl4.freq2,y/pl4.freq2) * pl4.amp2
		   + noise.simplex2(x/pl4.freq3,y/pl4.freq3) * pl4.amp3;

	return lerp(lerp(n1, n2, superDX), lerp(n3, n4, superDX), superDY);
}

WorldObject.prototype.subtleChange = function()
{
	var superX = Math.floor(this.x / 20);
	var superY = Math.floor(this.y / 20);
	plIndex = (superX + this.size) + (superY + this.size) * 2 * this.size;
	if(Math.random > 0.5)
	{
		if(Math.sin(degToRad(this.zRot)) > 0)
		{
			plIndex += 2;
		}
		else
		{
			plIndex -= 1;
		}
	}
	else
	{
		if(Math.cos(degToRad(this.zRot)) > 0)
		{
			plIndex += 4 * this.size;
		}
		else
		{
			plIndex -= 2 * this.size;
		}
	}
	this.superGrid[plIndex] = new perlinLerp();
}

// WorldObject.prototype.SumMountains = function(x,y)
// {
// 	var sum = 0;
// 	for(var i = 0; i < this.mounts.length; i++)
// 	{
// 		sum += this.mounts[i].apply(x,y);
// 	}
// 	return sum;
// }

// WorldObject.prototype.GenerateMountains = function(numMountains)
// {

// 	for(var i = 0; i < numMountains; i++)
// 	{
// 		var r = Math.random() * 40 + 20;
// 		var x = Math.random() * 40 - 20;
// 		var y = Math.random() * 40 - 20;
// 		var h = Math.random() * 8 - 4;
// 		this.mounts.push(new Mountain(x, y, r, h));
// 	}
// }

// WorldObject.prototype.generateOutOfSight = function()
// {
// 	var x = Math.sin(degToRad(this.zRot)) * 40 + Math.random() * 40 + this.x + Math.cos(degToRad(this.zRot)) * Math.random() * 40;
// 	var y = Math.cos(degToRad(this.zRot)) * 40 + Math.random() * 40 + this.y + Math.sin(degToRad(this.zRot)) * Math.random() * 40;
// 	var r = Math.random() * 40 + 5;
// 	var h = Math.random() * 10 - 5;
// 	this.mounts.push(new Mountain(x, y, r, h));
// }

WorldObject.prototype.isInSight = function(x,y)
{
	
}


WorldObject.prototype.generateTexCoords = function()
{
	tex = [];
	for(var x = Math.floor(this.x) - (this.size / 2); x < Math.floor(this.x) + (this.size / 2); x++)
	{
		for(var y = Math.floor(this.y) - (this.size / 2); y < Math.floor(this.y) + (this.size / 2); y++)
		{
			tex.push(-x / 70.0);
			tex.push(-y / 70.0);
		}
	}
	return tex;
}

WorldObject.prototype.generateVertIndices = function()
{
	indices = [];
	for(var x = 0; x < this.size - 1; x++)
	{
		for(var y = 0; y < this.size - 1; y++)
		{
			//Counter-Clockwise
			indices.push(x     + ( y      * this.size) );
			indices.push(x     + ((y + 1) * this.size) );
			indices.push(x + 1 + ( y      * this.size) );

			indices.push(x     + ((y + 1) * this.size) );
			indices.push(x + 1 + ((y + 1) * this.size) );
			indices.push(x + 1 + ( y      * this.size) );
		}
	}
	return indices;
}


WorldObject.prototype.initTexture = function()
{
	this.texture = gl.createTexture();
	this.texture.image = ASSETS.images["texture"];
	gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.texture.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.bindTexture(gl.TEXTURE_2D, null);
}


WorldObject.prototype.setMatrixUniforms = function() {
    gl.uniformMatrix4fv(this.shaderProgram.pMatrixUniform, false, this.pMatrix);
    gl.uniformMatrix4fv(this.shaderProgram.mvMatrixUniform, false, this.mvMatrix);
}


WorldObject.prototype.render = function()
{
	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, this.pMatrix);

	mat4.identity(this.mvMatrix);


	mat4.rotate(this.mvMatrix, degToRad(this.xRot), [1, 0, 0]);
	mat4.rotate(this.mvMatrix, degToRad(this.yRot), [0, 1, 0]);
	mat4.rotate(this.mvMatrix, degToRad(this.zRot), [0, 0, 1]);

	mat4.translate(this.mvMatrix, [this.x, this.y, this.z]);

	gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexPositionBuffer);
	gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, this.VertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, this.TextureCoordBuffer);
	gl.vertexAttribPointer(this.shaderProgram.textureCoordAttribute, this.TextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, this.texture);
	gl.uniform1i(this.shaderProgram.samplerUniform, 0);

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.VertexIndexBuffer);
	this.setMatrixUniforms();
	gl.drawElements(gl.TRIANGLES, this.VertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);


}

WorldObject.prototype.moveForward = function()
{
	this.x -= Math.sin(degToRad(this.zRot)) * this.speed;
	this.y -= Math.cos(degToRad(this.zRot)) * this.speed;
}
WorldObject.prototype.moveBackward = function()
{
	this.x += Math.sin(degToRad(this.zRot)) * this.speed;
	this.y += Math.cos(degToRad(this.zRot)) * this.speed;
}
WorldObject.prototype.turnLeft = function()
{
	this.zRot--;
}

WorldObject.prototype.turnRight = function()
{
	this.zRot++;
}

function degToRad(degrees) {
    return degrees * Math.PI / 180;
}

