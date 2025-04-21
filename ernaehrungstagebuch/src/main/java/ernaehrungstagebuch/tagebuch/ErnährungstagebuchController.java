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
@RequestMapping("/ernährungstagebücher")
public class ErnährungstagebuchController {
	@Autowired
	ErnährungstagebuchRepository ernährungstagebuchRepository;
	
	@GetMapping
    public List<Ernaehrungstagebuch> getAllEinträge() {
        return ernährungstagebuchRepository.findAll();
    }

    // Get a Company by ID
    @GetMapping("/{id}")
    public Ernaehrungstagebuch getEintragById(@PathVariable long id) {
        return ernährungstagebuchRepository.findById(id)
        		.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ernährungstagebuch nicht gefunden"));
    }

    // Create a Company
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Ernaehrungstagebuch createEintrag(@RequestBody Ernaehrungstagebuch nutzer) {
        return ernährungstagebuchRepository.save(nutzer);
    }
}
