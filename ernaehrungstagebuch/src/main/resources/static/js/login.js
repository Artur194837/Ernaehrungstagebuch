registerViewFunction = function(event){ /*Registrierungsansicht*/
    const button = event.currentTarget; // oder event.target
    button.style.color = "white";
    
    loginAnsichtButton = document.getElementById("loginAnsichtButton");

    loginAnsichtButton.style.color = "gray";

    let form = document.createElement("form");

    emailLabel = document.createElement("label");
    emailLabel.id = "emailLabel";
    emailLabel.for = "email";
    emailLabel.innerHTML = "Email";

    emailInput = document.createElement("input");
    emailInput.id = "email";
    emailInput.type = "email";
    emailInput.required = true;

    benutzernameLabel = document.createElement("label");
    benutzernameLabel.id = "benutzernameLabel";
    benutzernameLabel.for = "benutzername";
    benutzernameLabel.innerHTML = "Benutzername";

    benutzernameInput = document.createElement("input");
    benutzernameInput.id = "benutzername";
    benutzernameInput.type = "benutzername";
    benutzernameInput.required = true;

    passwortLabel = document.createElement("label");
    passwortLabel.id = "passwortLabel";
    passwortLabel.for = "passwort";
    passwortLabel.innerHTML = "Passwort";

    passwortInput = document.createElement("input");
    passwortInput.id = "passwort";
    passwortInput.type = "password";
    passwortInput.required = true;

    form.appendChild(emailLabel);
    form.appendChild(emailInput);
    form.appendChild(benutzernameLabel);
    form.appendChild(benutzernameInput);
    form.appendChild(passwortLabel);
    form.appendChild(passwortInput);

    let oldForm = document.getElementsByTagName("form")[0];

    oldForm.replaceWith(form);

    document.getElementById("email").addEventListener("focus", emailFocusFunction);
    document.getElementById("email").addEventListener("blur", emailBlurFunction);
    document.getElementById("passwort").addEventListener("focus", passwortFocusFunction);
    document.getElementById("passwort").addEventListener("blur", passwortBlurFunction);
    document.getElementById("benutzername").addEventListener("focus", benutzernameFocusFunction);
    document.getElementById("benutzername").addEventListener("blur", benutzernameBlurFunction);

    let registerButton = document.createElement("button");
    registerButton.id = "login";
    registerButton.innerHTML = "Registrieren";
    document.getElementById("login").replaceWith(registerButton);
	registerButton.addEventListener("click", loginFunction);
};

loginViewFunction = function(event){ /*Login Ansicht*/
    const button = event.currentTarget; // oder event.target
    button.style.color = "white";
    
    registrierenAnsichtButton = document.getElementById("registrierenAnsichtButton");

    registrierenAnsichtButton.style.color = "gray";    

    let form = document.createElement("form");

    emailLabel = document.createElement("label");
    emailLabel.id = "emailLabel";
    emailLabel.for = "email";
    emailLabel.innerHTML = "Email";

    emailInput = document.createElement("input");
    emailInput.id = "email";
    emailInput.type = "email";
    emailInput.required = true;

    passwortLabel = document.createElement("label");
    passwortLabel.id = "passwortLabel";
    passwortLabel.for = "passwort";
    passwortLabel.innerHTML = "Passwort";

    passwortInput = document.createElement("input");
    passwortInput.id = "passwort";
    passwortInput.type = "password";
    passwortInput.required = true;

    form.appendChild(emailLabel);
    form.appendChild(emailInput);
    form.appendChild(passwortLabel);
    form.appendChild(passwortInput);

    let oldForm = document.getElementsByTagName("form")[0];

    oldForm.replaceWith(form);

    document.getElementById("email").addEventListener("focus", emailFocusFunction);
    document.getElementById("email").addEventListener("blur", emailBlurFunction);
    document.getElementById("passwort").addEventListener("focus", passwortFocusFunction);
    document.getElementById("passwort").addEventListener("blur", passwortBlurFunction);

    let loginButton = document.createElement("button");
    loginButton.id = "login";
    loginButton.innerHTML = "Login";
    document.getElementById("login").replaceWith(loginButton);
	loginButton.addEventListener("click", loginFunction);
};

emailFocusFunction = function(event){
    emailLabel = document.getElementById("emailLabel")
    emailLabel.style.color = "black";
};

emailBlurFunction = function(event){
    emailLabel = document.getElementById("emailLabel")
    emailLabel.style.color = "gray";   
};

passwortFocusFunction = function(event){
    passwortLabel = document.getElementById("passwortLabel")
    passwortLabel.style.color = "black";
};

passwortBlurFunction = function(event){
    passwortLabel = document.getElementById("passwortLabel")
    passwortLabel.style.color = "gray";   
};

benutzernameFocusFunction = function(event){
    benutzernameLabel = document.getElementById("benutzernameLabel")
    benutzernameLabel.style.color = "black";
};

benutzernameBlurFunction = function(event){
    benutzernameLabel = document.getElementById("benutzernameLabel")
    benutzernameLabel.style.color = "gray";   
};

loginFunction = async function(event){
    if(event.currentTarget.innerHTML == "Login"){ /*Wenn der Text im Button Login ist*/
        const response = await fetch("http://localhost:8080/", { /*Anfrage an die REST API, ob der Nutzer bekannt ist*/
            method: "POST",
            body: JSON.stringify({
                "email": document.getElementById("email").value,
                "passwort": document.getElementById("passwort").value
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        
		const text = await response.text();
		
        if(text == "erfolg")
            window.location.href = "http://localhost:8080/home";
        else
            document.getElementById("fehler").innerHTML = "Die Email oder das Passwort ist falsch";
    }
    else{ /*Registrierung*/
        const response = await fetch("http://localhost:8080/nutzer", {
            method: "POST",
            body: JSON.stringify({
                email: document.getElementById("email").value,
                benutzername: document.getElementById("benutzername").value,
                passwort: document.getElementById("passwort").value
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
		
		const text = await response.text();
		
        if(text != "erfolg") /*Tritt ein wenn z.B. die Email Adresse schon bekannt ist*/
            document.getElementById("fehler").innerHTML = text;
        else{        
	        window.location.href = "http://localhost:8080/home";
        }
    }
};

document.getElementById("registrierenAnsichtButton").addEventListener("click", registerViewFunction);
document.getElementById("loginAnsichtButton").addEventListener("click", loginViewFunction);
document.getElementById("email").addEventListener("focus", emailFocusFunction);
document.getElementById("email").addEventListener("blur", emailBlurFunction);
document.getElementById("passwort").addEventListener("focus", passwortFocusFunction);
document.getElementById("passwort").addEventListener("blur", passwortBlurFunction);
document.getElementById("login").addEventListener("click", loginFunction);