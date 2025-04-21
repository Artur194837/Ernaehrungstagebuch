package ernaehrungstagebuch.tagebuch;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table
public class Nahrungsmittel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long nahrungsmittelid;
	private String bezeichnung;
	private int kcal;
	private int fett;
	private int zucker;
	private int kohlenhydrate;
	private String bildPfad;
	
	public Nahrungsmittel(long id, String bezeichnung, int kcal, int fett, int zucker, int kohlenhydrate, String bildPfad) {
		this.nahrungsmittelid = id;
		this.bezeichnung = bezeichnung;
		this.kcal = kcal;
		this.fett = fett;
		this.zucker = zucker;
		this.kohlenhydrate = kohlenhydrate;
		this.bildPfad = bildPfad;
	}

	public Nahrungsmittel(String bezeichnung, int kcal, int fett, int zucker, int kohlenhydrate, String bildPfad) {
		this.bezeichnung = bezeichnung;
		this.kcal = kcal;
		this.fett = fett;
		this.zucker = zucker;
		this.kohlenhydrate = kohlenhydrate;
		this.bildPfad = bildPfad;
	}

	public Nahrungsmittel() {
			
		}
	
	@Override
	public String toString() {
		return "Nahrungsmittel [id=" + nahrungsmittelid + ", bezeichnung=" + bezeichnung + ", kcal=" + kcal + ", fett=" + fett
				+ ", zucker=" + zucker + ", kohlenhydrate=" + kohlenhydrate + "]";
	}

	public long getNahrungsmittelid() {
		return nahrungsmittelid;
	}

	public void setNahrungsmittelid(long nahrungsmittelid) {
		this.nahrungsmittelid = nahrungsmittelid;
	}

	public String getBezeichnung() {
		return bezeichnung;
	}

	public void setBezeichnung(String bezeichnung) {
		this.bezeichnung = bezeichnung;
	}

	public int getKcal() {
		return kcal;
	}

	public void setKcal(int kcal) {
		this.kcal = kcal;
	}

	public int getFett() {
		return fett;
	}

	public void setFett(int fett) {
		this.fett = fett;
	}

	public int getZucker() {
		return zucker;
	}

	public void setZucker(int zucker) {
		this.zucker = zucker;
	}

	public int getKohlenhydrate() {
		return kohlenhydrate;
	}

	public void setKohlenhydrate(int kohlenhydrate) {
		this.kohlenhydrate = kohlenhydrate;
	}
}
