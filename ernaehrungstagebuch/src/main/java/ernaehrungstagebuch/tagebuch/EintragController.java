package ernaehrungstagebuch.tagebuch;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/einträge")
public class EintragController {
	@Autowired
	private EintragRepository eintragRepository;
	
	@GetMapping
    public List<Eintrag> getAllEinträge() {
        return eintragRepository.findAll();
    }

    // Get a Company by ID
    @GetMapping("/{id}")
    public Eintrag getEintragById(@PathVariable long id) {
        return eintragRepository.findById(id)
        		.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Eintrag nicht gefunden"));
    }

    // Create a Company
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Eintrag createEintrag(@RequestBody Eintrag nutzer) {
        return eintragRepository.save(nutzer);
    }
}
