package ernaehrungstagebuch.tagebuch;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;

@RestController //Zur Rückgabe von beliebigen Datentypen
public class LoginHandler {
	@Autowired
	NutzerRepository nutzerRepository;
	
	@PostMapping(path = "/", consumes = "application/json", produces = MediaType.TEXT_PLAIN_VALUE) //Akzeptiert nur POST Requests
    public String handleLogin(@RequestBody Map<String, String> data, HttpSession session) { //data ist eine Map mit Key und Value vom Typ String
		String email = data.get("email");
		String passwort = data.get("passwort");
		
        List<Nutzer> nutzer = nutzerRepository.findAll();
        
        Nutzer uebereinstimmenderNutzer = null;
        
        for(Nutzer n : nutzer)
        	if(n.getEmail().equals(email) && n.getPasswort().equals(passwort))
        		uebereinstimmenderNutzer = n;
        
        if(uebereinstimmenderNutzer != null) {
	        session.setAttribute("benutzername", uebereinstimmenderNutzer.getBenutzername());
	        session.setAttribute("email", uebereinstimmenderNutzer.getEmail());
	        session.setAttribute("passwort", uebereinstimmenderNutzer.getPasswort());
	        
	        return "erfolg";
        }
        else {
        	return "misserfolg";
        }
    }
}
