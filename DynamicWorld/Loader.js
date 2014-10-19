

loadAssets = function(asset_list_url, callback)
{

	loadImage = function(name, onload)
	{
		ASSETS.images[name] = document.createElement('img');
		ASSETS.images[name].addEventListener('load', onload);
		ASSETS.images[name].src = "images/" + name + ".png";
	};

	loadAudio = function(name, onload)
	{
		ASSETS.audio[name] = document.createElement('audio');
		ASSETS.audio[name].volume = 0.5;
		ASSETS.audio[name].loop = false;
		ASSETS.audio[name].addEventListener('canplay', onload);
		ASSETS.audio[name].src = "audio/" + name + ".mp3";
	};

	loadJson = function(name, onload)
	{
		var request = new XMLHttpRequest();
		request.onreadystatechange = function() {
			if ((request.readyState == 4) && (request.status == 200))
			{
				ASSETS.json[name] = JSON.parse(request.responseText);
				onload();
			}
		}
		request.open("GET", "json/" + name + ".json", true);
		request.send(null);
	};

	loadJsonSync = function(name)
	{
		var request = new XMLHttpRequest();
		request.open("GET", name, false);
		request.send(null);
		if (request.status === 200) {
			return JSON.parse(request.responseText);
		}
	};

	var ASSET_LOCATIONS = loadJsonSync(asset_list_url);


	var ASSETS = {};
	ASSETS.images = {};
	ASSETS.json = {};
	ASSETS.audio = {};
	var count = 0;
	onload = function() {
		count++;
		//this happens more than it should, idk if problem
		if (count == ASSET_LOCATIONS.length)
		{
			callback();
		}
	};



	for(var n = 0 ; n < ASSET_LOCATIONS.length ; n++) {
		var name = ASSET_LOCATIONS[n].name;
		if(ASSET_LOCATIONS[n].type === 'image')
		{
			loadImage(name, onload);
		}
		else if(ASSET_LOCATIONS[n].type === 'audio')
		{
			loadAudio(name, onload);
		}
		else if(ASSET_LOCATIONS[n].type === 'json')
		{
			loadJson(name, onload);
		}
	}

	return ASSETS;
};

