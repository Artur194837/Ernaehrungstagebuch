package ernaehrungstagebuch.tagebuch;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/nutzer")
public class NutzerController {
	@Autowired
	private NutzerRepository nutzerRepository;
	@Autowired
	private ErnaehrungstagebuchRepository ernaehrungstagebuchRepository;
	@Autowired
	private NahrungsmittelRepository nahrungsmittelRepository;

    // Get All Companies
    @GetMapping("/all")
    public List<Nutzer> getAllNutzer() {
        return nutzerRepository.findAll();
    }

    // Get a Company by ID
    @GetMapping("/{id}")
    public Nutzer getNutzerById(@PathVariable long id) {
        return nutzerRepository.findById(id)
        		.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Nutzer nicht gefunden"));
    }

    // Create a Company
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public String createNutzer(@RequestBody Nutzer nutzer, HttpSession session) {
    	List<Nutzer> nutzerListe = nutzerRepository.findAll();
    	
    	for(Nutzer n : nutzerListe)
    		if(nutzer.getEmail().equals(n.getEmail()) || nutzer.getBenutzername().equals(n.getBenutzername()))
    			return "Die Email Adresse oder der Benutzername existiert bereits";
    	
        nutzerRepository.save(nutzer);
        
        session.setAttribute("benutzername", nutzer.getBenutzername());
        session.setAttribute("email", nutzer.getEmail());
        session.setAttribute("passwort", nutzer.getPasswort());
        
        return "erfolg";
    }

    // Update a Nutzer
    @PutMapping("/{id}")
    public Nutzer updateNutzer(@PathVariable int id, @RequestBody Nutzer nutzerDetails) {
        Nutzer nutzer = nutzerRepository.findById((long) id)
                .orElseThrow(() -> new RuntimeException("Nutzer not found"));
        nutzer.setBenutzername(nutzerDetails.getBenutzername());
        nutzer.setPasswort(nutzerDetails.getPasswort());
        return nutzerRepository.save(nutzer);
    }

    // Delete a Nutzer
    @DeleteMapping("/{id}")
    public void deleteNutzer(@PathVariable int id) {
        nutzerRepository.deleteById((long) id);
    }
    
    @PostMapping("/addErnaehrungstagebuch")
    public String addErnaehrungstagebuch(@RequestBody NutzerMitTagebuchDTO data) {
    	String benutzername = data.benutzername;
    	String email = data.email;
    	
    	List<Nutzer> nutzer = nutzerRepository.findAll();
    	
    	Ernaehrungstagebuch ernaehrungstagebuch = data.ernaehrungstagebuch;
		
    	for (Eintrag eintrag : ernaehrungstagebuch.getEintraege()) {
            eintrag.setErnaehrungstagebuch(ernaehrungstagebuch); // <-- Rückverknüpfung setzen
            for(EintragNahrungsmittel en : eintrag.getEintragNahrungsmittel()) {
            	Nahrungsmittel nahrungsmittel = nahrungsmittelRepository.getById(en.getNahrungsmittel().getNahrungsmittelid());
            	en.setNahrungsmittel(nahrungsmittel);
            	en.setEintrag(eintrag);
            }
        }
    	
    	for(Nutzer n : nutzer)
    		if(n.getBenutzername().equals(benutzername) && n.getEmail().equals(email)) {
    			boolean ernaehrungstagebuchGefunden = false;
    			
    			List<Ernaehrungstagebuch> ernaehrungstagebuecher = n.getErnaehrungstagebuecher();
    			
    			for(int i = 0; i < ernaehrungstagebuecher.size(); i++)
    				if(ernaehrungstagebuecher.get(i).getName().equals(ernaehrungstagebuch.getName())) {
    					ernaehrungstagebuch.setErnaehrungstagebuchid(ernaehrungstagebuecher.get(i).getErnaehrungstagebuchid());
    					ernaehrungstagebuecher.set(i, ernaehrungstagebuch);
    					ernaehrungstagebuchGefunden = true;
    				}
    			
    			if(!ernaehrungstagebuchGefunden)
    				n.addErnaehrungstagebuch(ernaehrungstagebuch);
    			
    			ernaehrungstagebuch.setNutzer(n);
    			
    			nutzerRepository.save(n);
    		}
    	return "erfolg";
    }
    
    @DeleteMapping("/deleteErnaehrungstagebuch")
    public void deleteErnaehrungstagebuch(@RequestBody Map<String, String> data) {
    	String benutzername = data.get("benutzername");
    	String email = data.get("email");
    	String ernaehrungstagebuchName = data.get("name");
    	
    	List<Nutzer> nutzer = nutzerRepository.findAll();
    	
    	long id = -1;
    	
    	for(Nutzer n : nutzer)
    		if(n.getBenutzername().equals(benutzername) && n.getEmail().equals(email)) {
    			for(int i = 0; i < n.getErnaehrungstagebuecher().size(); i++)
    				if(n.getErnaehrungstagebuecher().get(i).getName().equals(ernaehrungstagebuchName)) {
    					id = n.getErnaehrungstagebuecher().get(i).getErnaehrungstagebuchid();
    					n.deleteErnaehrungstagebuch(i);
    					break;
    				}
    		}
    	
    	if(id != -1)
    		ernaehrungstagebuchRepository.deleteById(id);
    }
    
    @GetMapping
    public ResponseEntity<Nutzer> getNutzerByBenutzernameUndEmail(@RequestParam String benutzername, @RequestParam String email) {
    	List<Nutzer> nutzer = nutzerRepository.findAll();
    	
    	for(Nutzer n : nutzer)
    		if(n.getBenutzername().equals(benutzername) && n.getEmail().equals(email))
    			return ResponseEntity.ok(n);
    	
    	return ResponseEntity.notFound().build();
    }
    
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpSession session) {
        session.invalidate(); // <- Session zerstören
        return ResponseEntity.ok().build();
    }
}
