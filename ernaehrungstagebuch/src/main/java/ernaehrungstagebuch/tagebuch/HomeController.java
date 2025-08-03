package ernaehrungstagebuch.tagebuch;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import jakarta.servlet.http.HttpSession;

@Controller //Zur Darstellung von .html Seiten
public class HomeController {
	@Autowired //Automatische Erstellung und Verbindung mit der Datenbank
	private NutzerRepository nutzerRepository;
	
	@GetMapping("/home") //URL
	public String home(Model model, HttpSession session) {
		List<Nutzer> nutzer = nutzerRepository.findAll();
        
        Nutzer uebereinstimmenderNutzer = null;
        
        for(Nutzer n : nutzer)
        	if(n.getEmail().equals(session.getAttribute("email")) && n.getPasswort().equals(session.getAttribute("passwort"))) //Diese Attribute werden beim Login gespeichert
        		uebereinstimmenderNutzer = n;
        
        List<String> namen = new ArrayList<String>(); //Namen der Ernährungstagebücher
        
        if(uebereinstimmenderNutzer != null) {	        
	        List<Ernaehrungstagebuch> tagebuecher = uebereinstimmenderNutzer.getErnaehrungstagebuecher();
	        
	        for(Ernaehrungstagebuch t : tagebuecher)
	        	namen.add(t.getName());
	        
	        model.addAttribute("benutzername", session.getAttribute("benutzername"));
			model.addAttribute("email", session.getAttribute("email"));
			model.addAttribute("buttons", namen);
			
			return "nutzerHome";
        }
        
        return "login"; //Wenn kein übereinstimmender Nutzer gefunden wurde
	}
}
