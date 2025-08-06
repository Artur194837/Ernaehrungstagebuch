let closeNahrungsmittelPopup = function(event){
	event.target.parentElement.parentElement.parentElement.parentElement.removeChild(event.target.parentElement.parentElement.parentElement);
};

let deleteNahrungsmittelEintrag = function(event){
	event.preventDefault();
	
	let parent = event.target.parentElement.parentElement;
				
	event.target.parentElement.parentElement.removeChild(event.target.parentElement);
	
	let menge = parent.querySelector(".menge");
		
	menge.dispatchEvent(new Event("input")); /*Event für die Nährwerte wird getriggert*/	
};

let nahrungsmittelButtonEventHandler = function(event){ /*EventHandler bei Auswahl eines Nahrungsmittels*/
	event.preventDefault();
	
	let parentElement = event.target.parentElement.parentElement.parentElement.parentElement;
		
	for(let child of parentElement.children)
		if(child.tagName === "BUTTON"){
			child.style.backgroundImage = `url(${event.target.src})`; /*Src wird zur selben wie beim ausgewählten Nahrungsmittel*/
			child.style.backgroundColor = "white";
			child.style.border = "3px solid rgb(98, 221, 235)";
		}
		else
			if(child.tagName === "LABEL")
				child.innerHTML = event.target.parentElement.name; /*Bezeichnung wird gesetzt*/
	
	let deleteButton = document.createElement("button");
	deleteButton.innerHTML = "Löschen";
	deleteButton.style.color = "white";
	deleteButton.style.backgroundColor = "red";
	deleteButton.addEventListener("click", deleteNahrungsmittelEintrag);
	deleteButton.style.position = "absolute";
	deleteButton.style.top = "100%";
	deleteButton.style.cursor = "pointer";
	deleteButton.style.borderRadius = "10px";
	deleteButton.className = "loeschen";
	parentElement.appendChild(deleteButton);	
	
	/* Neuer NahrungsmittelEintrag wird daneben eingefügt*/
	let nahrungsmittel = document.createElement("label");
	nahrungsmittel.className = "bezeichnung";
	
	let plusButton = document.createElement("button");
	plusButton.className = "plus";
	plusButton.style.backgroundImage = "url(/plus.png)";
	plusButton.style.backgroundSize = "cover";
	plusButton.style.borderRadius = "50%";
	plusButton.style.backgroundPosition = "center";
	//plusButton.appendChild(img);
	plusButton.addEventListener("click", showNahrungsmittelPopup);
	plusButton.style.position = "absolute";
	plusButton.style.top = "24%";
	plusButton.style.cursor = "pointer";
	plusButton.addEventListener("click", showNahrungsmittelPopup);
	plusButton.style.border = "3px solid rgb(98, 221, 235)";
	
	let mengeLabel = document.createElement("label");
	mengeLabel.innerHTML = "Menge in Gramm:";
	mengeLabel.className = "mengeLabel";
	let inputMenge = document.createElement("input");
	inputMenge.type = "number";
	inputMenge.className = "menge";
	inputMenge.addEventListener("input", naehrwerteBrechnen);
	inputMenge.style.border = "none";
	inputMenge.style.borderBottom = "3px solid rgb(98, 221, 235)";
	inputMenge.style.backgroundColor = "white";
	
	let mengeDiv = document.createElement("div");
	mengeDiv.appendChild(mengeLabel);
	mengeDiv.appendChild(inputMenge);
	mengeDiv.style.display = "flex";
	mengeDiv.style.marginBottom = "30px";
	mengeDiv.style.position = "absolute";
	mengeDiv.style.top = "80%";
	mengeDiv.style.width = "70%";
	mengeDiv.className = "mengeDiv";
	
	
	let div2 = document.createElement("div");
	div2.style.position = "relative";
	div2.className = "nahrungsmitteleintrag";
	div2.style.marginRight = "10%";
	div2.style.display = "flex";
	div2.style.flexDirection = "column";
	div2.style.alignItems = "center";
	div2.style.backgroundColor = "white";
	div2.style.borderRadius = "10px";
	div2.style.boxShadow = "5px 10px 80px 5px rgb(220, 227, 222)";
	div2.style.marginBottom = "10%";
	
	div2.appendChild(nahrungsmittel);
	div2.appendChild(plusButton);
	div2.appendChild(mengeDiv);	
	
	event.target.parentElement.parentElement.parentElement.parentElement.parentElement.appendChild(div2);
	
 	event.target.parentElement.parentElement.parentElement.parentElement.removeChild(event.target.parentElement.parentElement.parentElement); /*Nahrungsmittel Auswahl Pop-Up wird entfernt*/
};

let getNahrungsmitelJson = async function(){ /*Funktion zum Erhalt von den gespeicherten Nahrungsmitteln*/
	const response = await fetch("http://localhost:8080/nahrungsmittel/", {
					            method: "GET"
					        });
							        
	return await response.json();
}

let nahrungsmittelJson = null;

getNahrungsmitelJson().then(json => {
	nahrungsmittelJson = json;
}); /*Nahrungsmittel ein Mal global speichern*/

let showNahrungsmittelPopup = async function(event){
	event.preventDefault()
	
	let div1 = document.createElement("div");
	div1.style.position = "absolute";
	div1.style.width = "auto";
	div1.style.height = "auto";
	div1.style.left = "30%";
	div1.style.top = "20%";
	div1.style.backgroundColor = "white";
	div1.style.border = "1px solid black";
	
	let button = document.createElement("button");
	button.id = "schliessenButton";
	button.style.backgroundColor = "white";
	button.style.border = "none";
	button.addEventListener("click", closeNahrungsmittelPopup);
	let img = document.createElement("img");
	img.src = "kreuz.png";
	img.style.width = "100%";
	img.style.height = "100%";
	img.style.objectFit = "cover";
	button.appendChild(img);
	let div3 = document.createElement("div");
	div3.appendChild(button);
	div3.style.display = "flex";
	div3.style.justifyContent = "flex-end";
	div1.appendChild(div3);
	
	let div2 = document.createElement("div");
	div2.style.display = "flex";
	div2.style.flexDirection = "row";
	div2.style.flexWrap = "wrap";
	div2.style.width = "auto";
	div2.style.height = "auto";
	
	nahrungsmittelJson.forEach(nahrungsmittel => { /*Für jedes Nahrungsmittel im JSON wird ein Button angelegt*/
		let button = document.createElement("button");
		button.name = nahrungsmittel.bezeichnung;
		button.className = "nahrungsmittelButton";
		button.style.backgroundColor = "white";
		button.style.border = "none";
		button.addEventListener("click", nahrungsmittelButtonEventHandler);
		
		let img = document.createElement("img");
		img.src = `data:image/png;base64,${nahrungsmittel.bild}`;
		img.style.height = "100%"; 
		img.style.width = "100%";
		img.style.objectFit = "cover";
		
		button.appendChild(img);
		div2.appendChild(button); 
	});
	
	div1.appendChild(div2);
	
	event.target.parentElement.appendChild(div1);
};

let naehrwerteBrechnen = function(event){
	let kcal = 0;
	let fett = 0;
	let kohlenhydrate = 0;
	let eiweiss = 0;
	
	let divs = event.target.parentElement.parentElement.parentElement.querySelectorAll(".nahrungsmitteleintrag");
	
	let kcalG = event.target.parentElement.parentElement.parentElement.parentElement.querySelector(".kcal");
	let fettG = event.target.parentElement.parentElement.parentElement.parentElement.querySelector(".fett"); 
	let kohlenhydrateG = event.target.parentElement.parentElement.parentElement.parentElement.querySelector(".kohlenhydrate"); 
	let eiweissG = event.target.parentElement.parentElement.parentElement.parentElement.querySelector(".eiweiss");
	
	for(let div of divs){
		let nahrungsmittelBezeichnung = div.querySelector(".bezeichnung").innerHTML;	
		
		let menge = div.querySelector(".menge").value;
		
		if(menge !== "")
			nahrungsmittelJson.forEach(nahrungsmittel => {
				if(nahrungsmittel.bezeichnung == nahrungsmittelBezeichnung){
					kcal += nahrungsmittel.kcal * menge / 100;
					fett += nahrungsmittel.fett * menge / 100;
					kohlenhydrate += nahrungsmittel.kohlenhydrate * menge / 100;
					eiweiss += nahrungsmittel.eiweiss * menge / 100;
				}
			});	
	}
		
	if(Number(kcal.toFixed(2)) !== kcal) /*Nur runden wenn sich die Menge an Nährwert dadurch ändert, sonst umsonst zwei Nachkommastellen*/
		kcal = kcal.toFixed(2);
	
	if(Number(fett.toFixed(2)) !== fett)
		fett = fett.toFixed(2);
		
	if(Number(kohlenhydrate.toFixed(2)) !== kohlenhydrate)
		kohlenhydrate = kohlenhydrate.toFixed(2);
		
	if(Number(eiweiss.toFixed(2)) !== eiweiss)
		eiweiss = eiweiss.toFixed(2);
	
	for(let element of kcalG.children){
		if(element.tagName === "text")
			element.textContent = kcal + " Kcal";
		else{
			if(element.getAttribute("class") === "echt"){
				let anteilAnGesamtKcal = kcal / 2000; /*Division durch den durchschnittlichen täglichen Bedarf*/
				
				let breiteInProzent = anteilAnGesamtKcal * 17;
				
				if(breiteInProzent > 17)
					breiteInProzent = 17;
				
				let prozentString = breiteInProzent + "%";
				
				element.style.width = prozentString;
			}
		}	
	}
	
	for(let element of fettG.children){
		if(element.tagName === "text")
			element.textContent = fett + "g Fett";
		else{
			if(element.getAttribute("class") === "echt"){
				let anteilAnGesamtFett = fett / 66;
				
				let breiteInProzent = anteilAnGesamtFett * 17;
				
				if(breiteInProzent > 17)
					breiteInProzent = 17;
				
				let prozentString = breiteInProzent + "%";
				
				element.style.width = prozentString;
			}
		}	
	}
	
	for(let element of kohlenhydrateG.children){
		if(element.tagName === "text")
			element.textContent = kohlenhydrate + "g Kohlenhydrate";
		else{
			if(element.getAttribute("class") === "echt"){
				let anteilAnGesamtKohlenhydrate = kohlenhydrate / 264;
				
				let breiteInProzent = anteilAnGesamtKohlenhydrate * 17;
				
				if(breiteInProzent > 17)
					breiteInProzent = 17;
				
				let prozentString = breiteInProzent + "%";
				
				element.style.width = prozentString;
			}
		}	
	}
	
	for(let element of eiweissG.children){
		if(element.tagName === "text")
			element.textContent = eiweiss + "g Eiweiss";
		else{
			if(element.getAttribute("class") === "echt"){
				let anteilAnGesamtEiweiss = eiweiss / 72;
				
				let breiteInProzent = anteilAnGesamtEiweiss * 17;
				
				if(breiteInProzent > 17)
					breiteInProzent = 17;
				
				let prozentString = breiteInProzent + "%";
				
				element.style.width = prozentString;
			}
		}	
	}
		
};

let showAddPopup = async function(event){
	event.preventDefault()
	
	let ernaehrungstagebuch = null;
	
	if(event.target.innerHTML !== ""){
		let benutzername = document.getElementById("benutzername").innerHTML;
		
		let email = document.getElementById("email").innerHTML;
		
		const response = await fetch(`http://localhost:8080/nutzer?benutzername=${benutzername}&email=${email}`, {
				            method: "GET"
				        });
						        
		const nutzer = await response.json();
		
		for(let etb of nutzer["ernaehrungstagebuecher"]) /*Ausgewähltes Ernährungstagebuch speichern*/
			if(etb["name"] === event.target.innerHTML){
				ernaehrungstagebuch = etb;	
				break;
			}
	}
	
	let form = document.querySelector("#addPopup > form").style.visibility = "visible";
	
	let eintraege = document.getElementById("eintraege");
	
	for(let tageMinus = 0; tageMinus >= -200; tageMinus--){
		let aktuellesDatum = new Date();
		
		aktuellesDatum.setTime(aktuellesDatum.getTime() + tageMinus * 24 * 60 * 60 * 1000);
		
		let datumString = "";
		
		if(aktuellesDatum.getDate() < 10)
			datumString += "0";
		
		datumString += aktuellesDatum.getDate() + ".";
		
		if(aktuellesDatum.getMonth() + 1 < 10)
			datumString += "0";
		
		datumString += aktuellesDatum.getMonth() + 1 + ".";
		
		datumString += aktuellesDatum.getFullYear();
		
		let datumEnglisch = aktuellesDatum.getFullYear() + "-"; 
		
		if(aktuellesDatum.getMonth() + 1 < 10)
			datumEnglisch += "0";
		
		datumEnglisch += aktuellesDatum.getMonth() + 1 + "-";
		
		if(aktuellesDatum.getDate() < 10)
					datumEnglisch += "0";
				
		datumEnglisch += aktuellesDatum.getDate();
		
		let datum = document.createElement("label")
		datum.innerHTML = datumString;
		datum.style.display = "block";
		datum.style.textAlign = "center";
		datum.className = "datum";
		
		let div1 = document.createElement("div");
		div1.style.width = "100%";
		div1.style.height = "auto";
		div1.style.display = "flex";
		div1.style.flexDirection = "column";
		div1.style.marginBottom = "10%";
		
		div1.appendChild(datum);
		
		let div3 = document.createElement("div");
		div3.className = "nahrungsmittel";
		div3.style.width = "auto";
		div3.style.height = "100%";
		div3.style.display = "flex";
		div3.style.flexWrap = "wrap";
		div3.style.paddingBottom = "10%";
		div3.style.paddingTop = "6.5%";
		
		
		if(ernaehrungstagebuch != null){
			let aktuellerEintrag = null;
			
			for(let eintrag of ernaehrungstagebuch["eintraege"]) /*Eintrag mit dem selben Datum wird rausgesucht*/
				if(eintrag["datum"] === datumEnglisch){
					aktuellerEintrag = eintrag;
					break;
				}
			
			if(aktuellerEintrag !== null){
				for(let eintragNahrungsmittel of aktuellerEintrag["eintragNahrungsmittel"]){
					let nahrungsmittel = document.createElement("label");
					nahrungsmittel.className = "bezeichnung";
					nahrungsmittel.innerHTML = eintragNahrungsmittel["nahrungsmittel"]["bezeichnung"];
					
					let img = document.createElement("img");
					img.src = `data:image/png;base64,${eintragNahrungsmittel["nahrungsmittel"]["bild"]}`;
					img.style.width = "100%";
					img.style.height = "100%";
					img.style.objectFit = "cover";
					let plusButton = document.createElement("button");
					plusButton.style.backgroundImage = `url(${img.src})`;
					plusButton.style.backgroundSize = "cover";
					plusButton.style.borderRadius = "50%";
					plusButton.style.backgroundPosition = "center";
					//plusButton.appendChild(img);
					plusButton.addEventListener("click", showNahrungsmittelPopup);
					plusButton.style.position = "absolute";
					plusButton.style.top = "24%";
					plusButton.style.cursor = "pointer";
					plusButton.style.border = "3px solid rgb(98, 221, 235)";
					plusButton.className = "plus";
					
					let mengeLabel = document.createElement("label");
					mengeLabel.innerHTML = "Menge in Gramm:";
					mengeLabel.className = "mengeLabel";
					let inputMenge = document.createElement("input");
					inputMenge.type = "number";
					inputMenge.className = "menge";
					inputMenge.value = eintragNahrungsmittel["menge"];
					inputMenge.addEventListener("input", naehrwerteBrechnen);
					inputMenge.style.border = "none";
					inputMenge.style.borderBottom = "3px solid rgb(98, 221, 235)";
					inputMenge.style.backgroundColor = "white";
					
					let mengeDiv = document.createElement("div");
					mengeDiv.appendChild(mengeLabel);
					mengeDiv.appendChild(inputMenge);
					mengeDiv.className = "mengeDiv";
					mengeDiv.style.marginBottom = "30px";
					mengeDiv.style.position = "absolute";
					mengeDiv.style.top = "80%";
					mengeDiv.style.width = "70%";
					mengeDiv.style.alignItems = "center";
					
					let deleteButton = document.createElement("button");
					deleteButton.innerHTML = "Löschen";
					deleteButton.style.color = "white";
					deleteButton.style.backgroundColor = "red";
					deleteButton.addEventListener("click", deleteNahrungsmittelEintrag);
					deleteButton.style.position = "absolute";
					deleteButton.style.top = "100%";
					deleteButton.style.cursor = "pointer";
					deleteButton.style.borderRadius = "10px";
					
					let div2 = document.createElement("div");
					div2.style.position = "relative";
					div2.className = "nahrungsmitteleintrag";
					div2.style.marginRight = "10%";
					div2.style.display = "flex";
					div2.style.flexDirection = "column";
					div2.style.alignItems = "center";
					div2.style.backgroundColor = "white";
					div2.style.borderRadius = "10px";
					div2.style.boxShadow = "5px 10px 80px 5px rgb(220, 227, 222)";
					
					div2.appendChild(nahrungsmittel);
					div2.appendChild(plusButton);
					div2.appendChild(mengeDiv);
					div2.appendChild(deleteButton);
					
					div3.appendChild(div2);
				}
				//Zusätzlichen Nahrungsmitteleintrag, damit ein weiteres Nahrungsmittel ausgewählt werden kann
				let nahrungsmittel = document.createElement("label");
				nahrungsmittel.className = "bezeichnung";
				
				let plusButton = document.createElement("button");
				let img = document.createElement("img");
				img.src = "/plus.png";
				img.style.width = "100%";
				img.style.height = "100%";
				img.style.objectFit = "cover";
				plusButton.style.backgroundImage = `url(${img.src})`;
				plusButton.style.backgroundSize = "cover";
				plusButton.style.borderRadius = "50%";
				plusButton.style.backgroundPosition = "center";
				//plusButton.appendChild(img);
				plusButton.addEventListener("click", showNahrungsmittelPopup);
				plusButton.style.position = "absolute";
				plusButton.style.top = "24%";
				plusButton.style.cursor = "pointer";
				plusButton.style.border = "3px solid rgb(98, 221, 235)";
				plusButton.className = "plus";
				
				let mengeLabel = document.createElement("label");
				mengeLabel.innerHTML = "Menge in Gramm:";
				mengeLabel.className = "mengeLabel";
				let inputMenge = document.createElement("input");
				inputMenge.type = "number";
				inputMenge.className = "menge";
				inputMenge.addEventListener("input", naehrwerteBrechnen);
				inputMenge.style.border = "none";
				inputMenge.style.borderBottom = "3px solid rgb(98, 221, 235)";
				inputMenge.style.backgroundColor = "white";
				inputMenge.fontSize = "0.9vw";
				
				let mengeDiv = document.createElement("div");
				mengeDiv.appendChild(mengeLabel);
				mengeDiv.appendChild(inputMenge);
				mengeDiv.className = "mengeDiv";
				mengeDiv.style.marginBottom = "30px";
				mengeDiv.style.position = "absolute";
				mengeDiv.style.top = "80%";
				mengeDiv.style.width = "70%";
				mengeDiv.style.alignItems = "center";
				
				let div2 = document.createElement("div");
				div2.class = "nahrungsmittel";
				div2.style.position = "relative";
				div2.className = "nahrungsmitteleintrag";
				div2.style.marginRight = "10%";
				div2.style.display = "flex";
				div2.style.flexDirection = "column";
				div2.style.alignItems = "center";
				div2.style.backgroundColor = "white";
				div2.style.borderRadius = "10px";
				div2.style.boxShadow = "5px 10px 80px 5px rgb(220, 227, 222)";
				
				div2.appendChild(nahrungsmittel);
				div2.appendChild(plusButton);
				div2.appendChild(mengeDiv);
				
				div3.appendChild(div2);
			}
			else{ //Es gibt keinen passenden Eintrag
				let nahrungsmittel = document.createElement("label");
				nahrungsmittel.className = "bezeichnung";
				
				let plusButton = document.createElement("button");
				let img = document.createElement("img");
				img.src = "/plus.png";
				img.style.width = "100%";
				img.style.height = "100%";
				img.style.objectFit = "cover";
				plusButton.style.backgroundImage = `url(${img.src})`;
				plusButton.style.backgroundSize = "cover";
				plusButton.style.borderRadius = "50%";
				plusButton.style.backgroundPosition = "center";
				//plusButton.appendChild(img);
				plusButton.addEventListener("click", showNahrungsmittelPopup);
				plusButton.style.position = "absolute";
				plusButton.style.top = "24%";
				plusButton.style.cursor = "pointer";
				plusButton.style.border = "3px solid rgb(98, 221, 235)";
				plusButton.className = "plus";
				
				let mengeLabel = document.createElement("label");
				mengeLabel.innerHTML = "Menge in Gramm:";
				mengeLabel.className = "mengeLabel";
				let inputMenge = document.createElement("input");
				inputMenge.type = "number";
				inputMenge.className = "menge";
				inputMenge.addEventListener("input", naehrwerteBrechnen);
				inputMenge.style.border = "none";
				inputMenge.style.borderBottom = "3px solid rgb(98, 221, 235)";
				inputMenge.style.backgroundColor = "white";
				inputMenge.fontSize = "0.9vw";
				
				let mengeDiv = document.createElement("div");
				mengeDiv.appendChild(mengeLabel);
				mengeDiv.appendChild(inputMenge);
				mengeDiv.className = "mengeDiv";
				mengeDiv.style.marginBottom = "30px";
				mengeDiv.style.position = "absolute";
				mengeDiv.style.top = "80%";
				mengeDiv.style.width = "70%";
				mengeDiv.style.alignItems = "center";
				
				let div2 = document.createElement("div");
				div2.class = "nahrungsmittel";
				div2.style.position = "relative";
				div2.className = "nahrungsmitteleintrag";
				div2.style.marginRight = "10%";
				div2.style.display = "flex";
				div2.style.flexDirection = "column";
				div2.style.alignItems = "center";
				div2.style.backgroundColor = "white";
				div2.style.borderRadius = "10px";
				div2.style.boxShadow = "5px 10px 80px 5px rgb(220, 227, 222)";
				
				div2.appendChild(nahrungsmittel);
				div2.appendChild(plusButton);
				div2.appendChild(mengeDiv);
				
				div3.appendChild(div2);
			}
		}
		else{ //Neues Ernährungstagebuch
			let nahrungsmittel = document.createElement("label");
			nahrungsmittel.className = "bezeichnung";
			
			let plusButton = document.createElement("button");
			let img = document.createElement("img");
			img.src = "/plus.png";
			img.style.width = "100%";
			img.style.height = "100%";
			img.style.objectFit = "cover";
			plusButton.style.backgroundImage = `url(${img.src})`;
			plusButton.style.backgroundSize = "cover";
			plusButton.style.borderRadius = "50%";
			plusButton.style.backgroundPosition = "center";
			//plusButton.appendChild(img);
			plusButton.addEventListener("click", showNahrungsmittelPopup);
			plusButton.style.position = "absolute";
			plusButton.style.top = "24%";
			plusButton.style.cursor = "pointer";
			plusButton.style.border = "3px solid rgb(98, 221, 235)";
			plusButton.className = "plus";
			
			let mengeLabel = document.createElement("label");
			mengeLabel.innerHTML = "Menge in Gramm:";
			mengeLabel.className = "mengeLabel";
			let inputMenge = document.createElement("input");
			inputMenge.type = "number";
			inputMenge.className = "menge";
			inputMenge.addEventListener("input", naehrwerteBrechnen);
			inputMenge.style.border = "none";
			inputMenge.style.borderBottom = "3px solid rgb(98, 221, 235)";
			inputMenge.style.backgroundColor = "white";
			inputMenge.fontSize = "0.9vw";
			
			let mengeDiv = document.createElement("div");
			mengeDiv.appendChild(mengeLabel);
			mengeDiv.appendChild(inputMenge);
			mengeDiv.className = "mengeDiv";
			mengeDiv.style.marginBottom = "30px";
			mengeDiv.style.position = "absolute";
			mengeDiv.style.top = "80%";
			mengeDiv.style.width = "70%";
			mengeDiv.style.alignItems = "center";
			
			let div2 = document.createElement("div");
			div2.class = "nahrungsmittel";
			div2.style.position = "relative";
			div2.className = "nahrungsmitteleintrag";
			div2.style.marginRight = "10%";
			div2.style.display = "flex";
			div2.style.flexDirection = "column";
			div2.style.alignItems = "center";
			div2.style.backgroundColor = "white";
			div2.style.borderRadius = "10px";
			div2.style.boxShadow = "5px 10px 80px 5px rgb(220, 227, 222)";
			
			div2.appendChild(nahrungsmittel);
			div2.appendChild(plusButton);
			div2.appendChild(mengeDiv);
			
			div3.appendChild(div2);
		}
		
		let div4 = document.createElement("div");
		div4.className = "nährwerte";
		div4.style.display = "flex";
		div4.style.justifyContent = "space-between";
		div4.style.backgroundColor = "rgb(234 239 238)";
		
		let balkendiagramm = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		balkendiagramm.setAttribute("class", "nährwerte");
		balkendiagramm.style.width = "100%";
		balkendiagramm.style.height = "auto";
		balkendiagramm.setAttribute('aria-labelledby', "chartinfo");
		balkendiagramm.setAttribute("viewBox", "0 0 500 100");

		let desc = document.createElementNS("http://www.w3.org/2000/svg", "desc");
		desc.textContent = "Täglicher durchschnittlicher Bedarf an Nährwerten";
		balkendiagramm.appendChild(desc);
		
		let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
		text.textContent = "Täglicher durchschnittlicher Bedarf an Nährwerten";
		text.style.fill = "black";
		text.style.fontFamily = "Arial, Helvetica, sans-serif";
		text.setAttribute("x", "250");
		text.setAttribute("y", "15");
		text.setAttribute("class", "naehrwerteText");
		text.setAttribute("text-anchor", "middle")
		balkendiagramm.appendChild(text);
		
		let balkenKcal = document.createElementNS("http://www.w3.org/2000/svg", "g");
		balkenKcal.tabIndex = "0"; 
		balkenKcal.setAttribute('transform', 'translate(0, 50)'); 
		balkenKcal.setAttribute("class", "kcal");
		
		balkendiagramm.appendChild(balkenKcal);
		
		let rectKcalDarkGray = document.createElementNS("http://www.w3.org/2000/svg", "rect"); 
		rectKcalDarkGray.setAttribute('x', '0');
		rectKcalDarkGray.setAttribute('y', '0');

		rectKcalDarkGray.style.width = "17%";
		rectKcalDarkGray.style.height = "10px";
		rectKcalDarkGray.style.fill = "rgb(137, 143, 139)";
		rectKcalDarkGray.setAttribute('rx', '5');
		rectKcalDarkGray.setAttribute('ry', '5');
		
		balkenKcal.appendChild(rectKcalDarkGray);
		
		let rectKcal = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		rectKcal.setAttribute('x', '0');
		rectKcal.setAttribute('y', '0');

		rectKcal.style.width = "40px";
		rectKcal.style.height = "10px";
		rectKcal.style.fill = "rgb(83, 188, 248)";
		rectKcal.setAttribute('rx', '5');
		rectKcal.setAttribute('ry', '5');
		rectKcal.setAttribute("class", "echt");
		
		balkenKcal.appendChild(rectKcal);

		let textKcal = document.createElementNS("http://www.w3.org/2000/svg", "text");
		textKcal.setAttribute('x', '0'); 
		textKcal.setAttribute('y', '25');
		textKcal.textContent = "0 Kcal"; 
		textKcal.style.fill = "black"; 
		textKcal.style.fontFamily = "Arial, Helvetica, sans-serif";
		textKcal.setAttribute("class", "naehrwertMenge");
		balkenKcal.appendChild(textKcal);

		let balkenFett = document.createElementNS("http://www.w3.org/2000/svg", "g");
		balkenFett.tabIndex = "0"; 
		balkenFett.setAttribute('transform', 'translate(138.3, 50)'); 
		balkenFett.setAttribute("class", "fett");
		
		balkendiagramm.appendChild(balkenFett);
		
		let rectFettDarkGray = document.createElementNS("http://www.w3.org/2000/svg", "rect"); 
		rectFettDarkGray.setAttribute('x', '0');
		rectFettDarkGray.setAttribute('y', '0');

		rectFettDarkGray.style.width = "17%";
		rectFettDarkGray.style.height = "10px";
		rectFettDarkGray.style.fill = "rgb(137, 143, 139)";
		rectFettDarkGray.setAttribute('rx', '5');
		rectFettDarkGray.setAttribute('ry', '5');
		
		balkenFett.appendChild(rectFettDarkGray);
		
		let rectFett = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		rectFett.setAttribute('x', '0');
		rectFett.setAttribute('y', '0');

		rectFett.style.width = "40px";
		rectFett.style.height = "10px";
		rectFett.style.fill = "rgb(83, 188, 248)";
		rectFett.setAttribute('rx', '5');
		rectFett.setAttribute('ry', '5');
		rectFett.setAttribute("class", "echt");
		
		balkenFett.appendChild(rectFett);

		let textFett = document.createElementNS("http://www.w3.org/2000/svg", "text");
		textFett.setAttribute('x', '0');
		textFett.setAttribute('y', '25');		                                 
		textFett.textContent = "0 g Fett";
		textFett.style.fill = "black";
		textFett.style.fontFamily = "Arial, Helvetica, sans-serif";
		textFett.setAttribute("class", "naehrwertMenge");
		balkenFett.appendChild(textFett);
		
		let balkenKohlenhydrate = document.createElementNS("http://www.w3.org/2000/svg", "g");
		balkenKohlenhydrate.tabIndex = "0";
		balkenKohlenhydrate.setAttribute('transform', 'translate(276.6, 50)');
		balkenKohlenhydrate.setAttribute("class", "kohlenhydrate");
		
		balkendiagramm.appendChild(balkenKohlenhydrate);
		
		let rectKohlenhydrateDarkGray = document.createElementNS("http://www.w3.org/2000/svg", "rect"); 
		rectKohlenhydrateDarkGray.setAttribute('x', '0');
		rectKohlenhydrateDarkGray.setAttribute('y', '0');

		rectKohlenhydrateDarkGray.style.width = "17%";
		rectKohlenhydrateDarkGray.style.height = "10px";
		rectKohlenhydrateDarkGray.style.fill = "rgb(137, 143, 139)";
		rectKohlenhydrateDarkGray.setAttribute('rx', '5');
		rectKohlenhydrateDarkGray.setAttribute('ry', '5');
		
		balkenKohlenhydrate.appendChild(rectKohlenhydrateDarkGray);
		
		let rectKohlenhydrate = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		rectKohlenhydrate.setAttribute('x', '0');
		rectKohlenhydrate.setAttribute('y', '0');

		rectKohlenhydrate.style.width = "40px";
		rectKohlenhydrate.style.height = "10px";
		rectKohlenhydrate.style.fill = "rgb(83, 188, 248)";
		rectKohlenhydrate.setAttribute('rx', '5');
		rectKohlenhydrate.setAttribute('ry', '5');
		rectKohlenhydrate.setAttribute("class", "echt");
		
		balkenKohlenhydrate.appendChild(rectKohlenhydrate);

		let textKohlenhydrate = document.createElementNS("http://www.w3.org/2000/svg", "text");
		textKohlenhydrate.setAttribute('x', '0');
		textKohlenhydrate.setAttribute('y', '25');		                                 
		textKohlenhydrate.textContent = "0 g Kohlenhydrate";
		textKohlenhydrate.style.fill = "black";
		textKohlenhydrate.style.fontFamily = "Arial, Helvetica, sans-serif";
		textKohlenhydrate.setAttribute("class", "naehrwertMenge");
		balkenKohlenhydrate.appendChild(textKohlenhydrate); 
		
		let balkenEiweiss = document.createElementNS("http://www.w3.org/2000/svg", "g");
		balkenEiweiss.tabIndex = "0";
		balkenEiweiss.setAttribute('transform', 'translate(415, 50)');
		balkenEiweiss.setAttribute("class", "eiweiss");
		
		balkendiagramm.appendChild(balkenEiweiss);
		
		let rectEiweissDarkGray = document.createElementNS("http://www.w3.org/2000/svg", "rect"); 
		rectEiweissDarkGray.setAttribute('x', '0');
		rectEiweissDarkGray.setAttribute('y', '0');

		rectEiweissDarkGray.style.width = "17%";
		rectEiweissDarkGray.style.height = "10px";
		rectEiweissDarkGray.style.fill = "rgb(137, 143, 139)";
		rectEiweissDarkGray.setAttribute('rx', '5');
		rectEiweissDarkGray.setAttribute('ry', '5');
		
		balkenEiweiss.appendChild(rectEiweissDarkGray);
		
		let rectEiweiss = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		rectEiweiss.setAttribute('x', '0');
		rectEiweiss.setAttribute('y', '0');

		rectEiweiss.style.width = "40px";
		rectEiweiss.style.height = "10px";
		rectEiweiss.style.fill = "rgb(83, 188, 248)";
		rectEiweiss.setAttribute('rx', '5');
		rectEiweiss.setAttribute('ry', '5');
		rectEiweiss.setAttribute("class", "echt");
		
		balkenEiweiss.appendChild(rectEiweiss);

		let textEiweiss = document.createElementNS("http://www.w3.org/2000/svg", "text");
		textEiweiss.setAttribute('x', '0');
		textEiweiss.setAttribute('y', '25');		                                 
		textEiweiss.textContent = "0 g Eiweiss";
		textEiweiss.style.fill = "black";
		textEiweiss.style.fontFamily = "Arial, Helvetica, sans-serif";
		textEiweiss.setAttribute("class", "naehrwertMenge");
		balkenEiweiss.appendChild(textEiweiss);
		
		div1.appendChild(div3);
		div1.appendChild(balkendiagramm);
		
		eintraege.appendChild(div1);
		
		document.getElementById("name").value = event.target.innerHTML; //Namen des Ernährungstagebuchs setzen
		
		let mengen = document.getElementsByClassName("menge");
		
		for(let menge of mengen) //Event Handler für die Darstellung der Nährwerte triggern
			menge.dispatchEvent(new Event("input"));
	}
}

document.getElementById("plus").addEventListener("click", showAddPopup);

let speichernEventHandler = async function(event){
	event.preventDefault();
	
	let name = document.getElementById("name").value; //Name des Ernährungstagebuchs
	
	if(name === "")
		document.getElementById("fehler").innerHTML = "Es wurde kein Name eingegeben";
	else{
		let benutzername = document.getElementById("benutzername").innerHTML;
		let email = document.getElementById("email").innerHTML;
		
		let json = {
			"benutzername": benutzername,
			"email": email,
			"ernaehrungstagebuch": {
				"name": name,
				"eintraege": []
			}
		};
		
		let eintraege = document.getElementById("eintraege");
		
		for(let eintrag of eintraege.children){
			let eintragJSON = {};
			let datum = eintrag.querySelector(".datum").innerHTML;
			
			let jahr = datum.substring(6, 10);
			
			let monat = datum.substring(3, 5);
			
			let tag = datum.substring(0, 2);
			
			datum = jahr + "-" + monat + "-" + tag; //Für das Speichern in der DB ist das englische Format notwendig
			
			eintragJSON["datum"] = datum;
			
			let nahrungsmittel = eintrag.querySelector(".nahrungsmittel");
			
			let eintragNahrungsmittel = [];
			
			for(let nahrungsmitteleintrag of nahrungsmittel.children){
				let bezeichnung = nahrungsmitteleintrag.querySelector(".bezeichnung").innerHTML; //Bezeichnung des Nahrungsmittels
				
				if(bezeichnung.length > 0){
					const response = await fetch("http://localhost:8080/nahrungsmittel/" + bezeichnung, { //Die Bezeichnung allein reicht nicht um die Beziehung in der DB richtig zu speichern (ID notwendig)
							            method: "GET"
							        });
									        
					const nahrungsmittelJson = await response.json();
					
					let nahrungsmittelEintragJSON = {
						"nahrungsmittel": nahrungsmittelJson,
						"eintrag": {
							"datum": datum 
						},
						"menge": nahrungsmitteleintrag.querySelector(".menge").value							
					};
					
					eintragNahrungsmittel.push(nahrungsmittelEintragJSON);
				}		
			}
			
			if(eintragNahrungsmittel.length > 0){
				eintragJSON["eintragNahrungsmittel"] = eintragNahrungsmittel;
				
				json["ernaehrungstagebuch"]["eintraege"].push(eintragJSON);
			}
		}
		
		const response = await fetch("http://localhost:8080/nutzer/addErnaehrungstagebuch", {
			            method: "POST",
			            body: JSON.stringify(json),
			            headers: {
			                "Content-type": "application/json; charset=UTF-8"
			            }
			        });			  
		
		window.location.href = "http://localhost:8080/home";
	}
};

let brichAddPopupAb = function(event){
	let eintraege = document.getElementById("eintraege");
	
	for(child of eintraege.children)
		eintraege.removeChild(child);
	
	document.querySelector("#addPopup > form").style.visibility = "invisible";
}

document.getElementById("speichern").addEventListener("click", speichernEventHandler);

document.getElementById("abbrechen").addEventListener("click", brichAddPopupAb);

let tagebuchButtons = document.getElementsByClassName("tagebuch");

for(let tagebuchButton of tagebuchButtons)
	tagebuchButton.addEventListener("click", showAddPopup);

let loescheErnaehrungstagebuch = async function(event){
	const response = await fetch("http://localhost:8080/nutzer/deleteErnaehrungstagebuch", {
				            method: "DELETE",
				            body: JSON.stringify({
								"benutzername": document.getElementById("benutzername").innerHTML,
								"email": document.getElementById("email").innerHTML,
								"name": document.getElementById("name").value
							}),
				            headers: {
				                "Content-type": "application/json; charset=UTF-8"
				            }
				        }).then(() => {window.location.href = "http://localhost:8080/home"});	
}

document.getElementById("loeschen").addEventListener("click", loescheErnaehrungstagebuch);

let ausloggen = async function(event){
	await fetch("http://localhost:8080/nutzer/logout", {
	    method: "POST",
	    credentials: "include"
	});
	
	window.location.href = "http://localhost:8080";
}

document.getElementById("ausloggen").addEventListener("click", ausloggen);

