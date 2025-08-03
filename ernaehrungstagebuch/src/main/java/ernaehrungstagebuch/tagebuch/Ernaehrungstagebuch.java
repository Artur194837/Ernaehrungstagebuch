package ernaehrungstagebuch.tagebuch;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table
public class Ernaehrungstagebuch {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) //Die ernaehrungstagebuchid wird von der Datenbank generiert
	private long ernaehrungstagebuchid;
	private String name;
	@OneToMany(mappedBy = "ernaehrungstagebuch", cascade = CascadeType.ALL, orphanRemoval = true) //Die Beziehung wird durch die Tabelle Eintrag verwaltet, Aktualisierung aller Beziehungsobjekte bei Veränderung, neu Anlegung etc. 
	List<Eintrag> eintraege = new ArrayList<>();
	@ManyToOne
	@JoinColumn(name = "nutzerid") //Fremdschlüssel
	@JsonIgnore
	Nutzer nutzer;

	public Ernaehrungstagebuch(long ernaehrungstagebuchid, String name) {
		super();
		this.ernaehrungstagebuchid = ernaehrungstagebuchid;
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Ernaehrungstagebuch(String name) {
		super();
		this.name = name;
	}

	public Ernaehrungstagebuch() {
		
	}
	
	public long getErnaehrungstagebuchid() {
		return ernaehrungstagebuchid;
	}

	public void setErnaehrungstagebuchid(long ernaehrungstagebuchid) {
		this.ernaehrungstagebuchid = ernaehrungstagebuchid;
	}

	public List<Eintrag> getEintraege() {
		return eintraege;
	}

	public void setEintraege(List<Eintrag> eintraege) {
		this.eintraege = eintraege;
	}

	@Override
	public String toString() {
		return "Ernaehrungstagebuch [ernaehrungstagebuchid=" + ernaehrungstagebuchid + ", name=" + name + ", eintraege="
				+ eintraege + "]";
	}

	public Nutzer getNutzer() {
		return nutzer;
	}

	public void setNutzer(Nutzer nutzer) {
		this.nutzer = nutzer;
	}

}
