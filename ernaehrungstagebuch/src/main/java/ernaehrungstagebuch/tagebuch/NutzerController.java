package ernaehrungstagebuch.tagebuch;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/nutzer")
public class NutzerController {
	@Autowired
	private NutzerRepository nutzerRepository;
	
	@GetMapping("/")
    public String welcome() {
        return "<html><body><h1>WELCOME</h1></body></html>";
    }

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
    public Nutzer createNutzer(@RequestBody Nutzer nutzer) {
        return nutzerRepository.save(nutzer);
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
}
