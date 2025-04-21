package ernaehrungstagebuch.tagebuch;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class TagebuchApplication {

	public static void main(String[] args) {
		ConfigurableApplicationContext context = SpringApplication.run(TagebuchApplication.class, args);
		
		NutzerController nutzerController = context.getBean(NutzerController.class);
		
		Nahrungsmittel nahrungsmittel1 = new Nahrungsmittel("Banane", 23, 23, 45, 56, "test.jpg");
		Nahrungsmittel nahrungsmittel2 = new Nahrungsmittel("Gurke", 23, 23, 45, 56, "test.jpg");
		Nahrungsmittel nahrungsmittel3 = new Nahrungsmittel("Brot", 23, 23, 45, 56, "test.jpg");
		
		List<Nahrungsmittel> nahrungsmittel = new ArrayList<>();
		nahrungsmittel.add(nahrungsmittel1);
		nahrungsmittel.add(nahrungsmittel2);
		nahrungsmittel.add(nahrungsmittel3);
		
		Eintrag eintrag = new Eintrag(LocalDate.now());
		eintrag.setNahrungsmittel(nahrungsmittel);
		List<Eintrag> eintraege = new ArrayList<>();
		eintraege.add(eintrag);
		
		Ernaehrungstagebuch tagebuch = new Ernaehrungstagebuch();
		tagebuch.setEintraege(eintraege);
		List<Ernaehrungstagebuch> ernaehrungstagebuecher = new ArrayList<>();
		ernaehrungstagebuecher.add(tagebuch);
		
		Nutzer nutzer = new Nutzer("Test", "Test");
		nutzer.setErnaehrungstagebuecher(ernaehrungstagebuecher);
		
		nutzerController.createNutzer(nutzer);
		
	}

}
