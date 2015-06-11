var gFilms;
var gewonnen;

$(document).ready(function(){
	var filmsJson = localStorage.gFilms;

	if(typeof filmsJson != "undefined")
	{
		gFilms = JSON.parse(filmsJson);
	}else{
		gFilms = [{ title: "test" }];
	}

	refreshfilmlist();

	$("#toevoegen").on("click",function(){
		var filmnaam = document.getElementById("filmnaam").value;
		console.log(filmnaam);

		if(filmnaam != "")
		{
			var film = createfilm(filmnaam);
			gFilms.push(film);
			localStorage.gFilms = JSON.stringify(gFilms);
			document.getElementById("filmnaam").value ="";
			refreshfilmlist();
		}
	});

	$("#gooi").on("click",function(){
		console.log("gooien");
		var gegooid = Math.floor((Math.random() * gFilms.length) + 1);
		console.log(gegooid);
		for(var film in gFilms)
		{
			if( film == gegooid)
			{
				gewonnen= film;
				console.log(gewonnen);
				console.log(gFilms[film].title);
				document.getElementById("gekozenfilm").innerHTML=gFilms[film].title ;
			}
		}

	});

	$("#verwijder").on("click",function(){
		console.log("verwijder");

		for(var film in gFilms)
		{
			if(gewonnen == film){
				gFilms.splice(film,1);
				console.log(gFilms);
				localStorage.gFilms = JSON.stringify(gFilms);
				refreshfilmlist();
			}
		}

		
		
	});


	function createfilm(title)
	{
		return{
			title:title
		}
	}

	function refreshfilmlist()
	{
		console.log("refresh films list");
		/*leeg maken listview*/
		$("#movielist li").remove();

		/*opvullen list view met movies*/
		for (var film in gFilms)
		{
			$("#movielist").append("<li>"+gFilms[film].title+"</li>");	
		}
	}

});