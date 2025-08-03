package ernaehrungstagebuch.tagebuch;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table
public class Nutzer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) //Datenbank zuständig für die ID Erstellung
	private long nutzerid;
	private String benutzername;
	private String passwort;
	private String email;
	@OneToMany(mappedBy = "nutzer", cascade = CascadeType.ALL, orphanRemoval = true) //eins zu n Beziehung (verwaltet durch ernaehrungstagebuch)
	private List<Ernaehrungstagebuch> ernaehrungstagebuecher = new ArrayList<>();
	
	public Nutzer(long id, String benutzername, String passwort, String email) {
		this.nutzerid = id;
		this.benutzername = benutzername;
		this.passwort = passwort;
		this.email = email;
	}

	public Nutzer() {

	}
	
	public Nutzer(String benutzername, String passwort, String email) {
		super();
		this.benutzername = benutzername;
		this.passwort = passwort;
		this.email = email;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public long getNutzerid() {
		return nutzerid;
	}

	public void setNutzerid(long nutzerid) {
		this.nutzerid = nutzerid;
	}

	public List<Ernaehrungstagebuch> getErnaehrungstagebuecher() {
		return ernaehrungstagebuecher;
	}

	public void setErnaehrungstagebuecher(List<Ernaehrungstagebuch> ernaehrungstagebuecher) {
		this.ernaehrungstagebuecher = ernaehrungstagebuecher;
	}

	@Override
	public String toString() {
		return "Nutzer [nutzerid=" + nutzerid + ", benutzername=" + benutzername + ", passwort=" + passwort + ", email="
				+ email + ", ernaehrungstagebuecher=" + ernaehrungstagebuecher + "]";
	}

	public String getBenutzername() {
		return benutzername;
	}

	public void setBenutzername(String benutzername) {
		this.benutzername = benutzername;
	}

	public String getPasswort() {
		return passwort;
	}

	public void setPasswort(String passwort) {
		this.passwort = passwort;
	}
	
	public void addErnaehrungstagebuch(Ernaehrungstagebuch e) {
		ernaehrungstagebuecher.add(e);
		e.setNutzer(this);
	}
	
	public void deleteErnaehrungstagebuch(String name) {
		int i = 0;
		
		while(i < ernaehrungstagebuecher.size() && ! ernaehrungstagebuecher.get(i).getName().equals(name)) { //Es wird erst gestoppt, wenn das Ernaehrungstagebuch mit dem selben Namen gefunden wurde
			i++;
		}
		
		if(i < ernaehrungstagebuecher.size())
			ernaehrungstagebuecher.remove(i);
	}
	
	public void deleteErnaehrungstagebuch(int index) {
		if(index < ernaehrungstagebuecher.size())
			ernaehrungstagebuecher.remove(index);
	}
}
