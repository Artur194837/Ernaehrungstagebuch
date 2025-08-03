package ernaehrungstagebuch.tagebuch;

import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import jakarta.servlet.http.HttpSession;

@Controller
public class LoginController {
	@GetMapping("/")
    public String login(HttpSession session, Model model) {
			Enumeration<String> attributeNames = session.getAttributeNames();
			
			boolean benutzernameVorhanden = false;
			boolean emailVorhanden = false;
			boolean buttonsVorhanden = false;
			
			while(attributeNames.hasMoreElements()) {
				String attributeName = attributeNames.nextElement();
				
				if(attributeName.equals("benutzername"))
					benutzernameVorhanden = true;
				else
					if(attributeName.equals("email"))
						emailVorhanden = true;
					else
						if(attributeName.equals("buttons"))
							buttonsVorhanden = true;
			}
			
			if(benutzernameVorhanden && emailVorhanden) {			
				model.addAttribute("benutzername", session.getAttribute("benutzername"));
				model.addAttribute("email", session.getAttribute("email"));
	
				if(buttonsVorhanden)
					model.addAttribute("buttons", session.getAttribute("buttons"));
	
				
				return "nutzerHome";
			}
			else
				return "login";
	}
}