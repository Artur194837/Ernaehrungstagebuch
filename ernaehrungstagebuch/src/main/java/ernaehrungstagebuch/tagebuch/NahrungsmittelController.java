package ernaehrungstagebuch.tagebuch;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/nahrungsmittel")
public class NahrungsmittelController {
	@Autowired
	NahrungsmittelRepository nr;

	@GetMapping("/")
	public List<Nahrungsmittel> getAllNahrungsmittel() {
		return nr.findAll();
	}
	
	@GetMapping("/{bezeichnung}")
    public Optional<Nahrungsmittel> getNahrungsmittelByBezeichnung(@PathVariable String bezeichnung) {
        List<Nahrungsmittel> nahrungsmittel = nr.findAll();
        
        for(Nahrungsmittel n : nahrungsmittel)
        	if(n.getBezeichnung().equals(bezeichnung))
        		return Optional.of(n);
        
        return Optional.empty();
    }
}