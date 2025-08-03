package ernaehrungstagebuch.tagebuch;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@SpringBootApplication
public class TagebuchApplication {

	public static void main(String[] args) {
		ConfigurableApplicationContext context = SpringApplication.run(TagebuchApplication.class, args);
		
		/*NahrungsmittelRepository rep = context.getBean(NahrungsmittelRepository.class);
		
		try {
			Nahrungsmittel nm1 = new Nahrungsmittel("Banane", 93, 0.2, 20, 1, Files.readAllBytes(Path.of("src/main/resources/static/banane.jpg")));
			Nahrungsmittel nm2 = new Nahrungsmittel("Weizenbrot", 250, 2, 50, 8, Files.readAllBytes(Path.of("src/main/resources/static/brot.jpg")));
			Nahrungsmittel nm3 = new Nahrungsmittel("Eier", 156, 11.3, 1.1, 13, Files.readAllBytes(Path.of("src/main/resources/static/eier.jpg"))); 
			Nahrungsmittel nm4 = new Nahrungsmittel("Hähnchen", 89, 5, 5, 6, Files.readAllBytes(Path.of("src/main/resources/static/hähnchen.jpg"))); 
			Nahrungsmittel nm5 = new Nahrungsmittel("Erdbeeren", 33, 0.4, 5.5, 0.9, Files.readAllBytes(Path.of("src/main/resources/static/erdbeere.jpeg"))); 
			
			rep.save(nm1);
			rep.save(nm2);
			rep.save(nm3);
			rep.save(nm4);
			rep.save(nm5);
		}
		catch(IOException e) {
			e.printStackTrace();
		}*/ //Manuelle Erstellung der Nahrungsmittel
	}

}
