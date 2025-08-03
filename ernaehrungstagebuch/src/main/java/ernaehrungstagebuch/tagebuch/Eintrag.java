package ernaehrungstagebuch.tagebuch;

import java.time.LocalDate;
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
public class Eintrag {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long eintragsid;
	private LocalDate datum;
	@OneToMany(mappedBy = "eintrag", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<EintragNahrungsmittel> eintragNahrungsmittel;
	@ManyToOne //Rückverbindung
	@JoinColumn(name = "ernaehrungstagebuchid") // Fremdschlüssel in der Tabelle "eintrag"
	@JsonIgnore //Zur Unterbrechung des Zyklus bei einer Ausgabe
	private Ernaehrungstagebuch ernaehrungstagebuch;

	public Eintrag(long eintragsid, LocalDate datum) {
		super();
		this.eintragsid = eintragsid;
		this.datum = datum;
	}

	public Eintrag() {
	}
	
	public Eintrag(LocalDate datum) {
		this.datum = datum;
	}

	@Override
	public String toString() {
		return "Eintrag [eintragsid=" + eintragsid + ", datum=" + datum + ", eintragNahrungsmittel="
				+ eintragNahrungsmittel + "]";
	}

	public List<EintragNahrungsmittel> getEintragNahrungsmittel() {
		return eintragNahrungsmittel;
	}

	public void setEintragNahrungsmittel(List<EintragNahrungsmittel> eintragNahrungsmittel) {
		this.eintragNahrungsmittel = eintragNahrungsmittel;
	}

	public long getEintragsid() {
		return eintragsid;
	}

	public void setEintragsid(long eintragsid) {
		this.eintragsid = eintragsid;
	}

	public LocalDate getDatum() {
		return datum;
	}

	public void setDatum(LocalDate datum) {
		this.datum = datum;
	}

	public Ernaehrungstagebuch getErnaehrungstagebuch() {
		return ernaehrungstagebuch;
	}

	public void setErnaehrungstagebuch(Ernaehrungstagebuch ernaehrungstagebuch) {
		this.ernaehrungstagebuch = ernaehrungstagebuch;
	}
}
