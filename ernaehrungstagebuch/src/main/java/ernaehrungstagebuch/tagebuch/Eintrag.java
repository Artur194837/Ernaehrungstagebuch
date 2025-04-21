package ernaehrungstagebuch.tagebuch;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table
public class Eintrag {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long eintragsid;
	private LocalDate datum;
	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(
			name = "EintragZuNahrungsmittel",
			joinColumns = @JoinColumn(name = "eintragsid"),
			inverseJoinColumns = @JoinColumn(name = "nahrungsmittelid")
	)
	List<Nahrungsmittel> nahrungsmittel = new ArrayList<>();

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

	public List<Nahrungsmittel> getNahrungsmittel() {
		return nahrungsmittel;
	}

	public void setNahrungsmittel(List<Nahrungsmittel> nahrungsmittel) {
		this.nahrungsmittel = nahrungsmittel;
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
}
