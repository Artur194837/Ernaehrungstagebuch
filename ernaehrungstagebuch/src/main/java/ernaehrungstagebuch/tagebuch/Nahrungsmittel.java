package ernaehrungstagebuch.tagebuch;

import java.util.Arrays;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table
public class Nahrungsmittel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long nahrungsmittelid;
	private String bezeichnung;
	private double kcal;
	private double fett;
	private double kohlenhydrate;
	private double eiweiss;
	@Lob //Zur Speicherung von Bildern in der Datenbank
	private byte [] bild;

	public Nahrungsmittel(String bezeichnung, double kcal, double fett, double kohlenhydrate, double eiweiss,
			byte[] bild) {
		super();
		this.bezeichnung = bezeichnung;
		this.kcal = kcal;
		this.fett = fett;
		this.kohlenhydrate = kohlenhydrate;
		this.eiweiss = eiweiss;
		this.bild = bild;
	}

	public Nahrungsmittel(long nahrungsmittelid, String bezeichnung, double kcal, double fett, double kohlenhydrate,
			double eiweiss, byte[] bild) {
		super();
		this.nahrungsmittelid = nahrungsmittelid;
		this.bezeichnung = bezeichnung;
		this.kcal = kcal;
		this.fett = fett;
		this.kohlenhydrate = kohlenhydrate;
		this.eiweiss = eiweiss;
		this.bild = bild;
	}

	public Nahrungsmittel() {
			
		}
	
	@Override
	public String toString() {
		return "Nahrungsmittel [nahrungsmittelid=" + nahrungsmittelid + ", bezeichnung=" + bezeichnung + ", kcal="
				+ kcal + ", fett=" + fett + ", kohlenhydrate=" + kohlenhydrate + ", eiweiss=" + eiweiss + ", bild="
				+ Arrays.toString(bild) + "]";
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

	public double getKcal() {
		return kcal;
	}

	public void setKcal(double kcal) {
		this.kcal = kcal;
	}

	public double getFett() {
		return fett;
	}

	public void setFett(double fett) {
		this.fett = fett;
	}

	public double getKohlenhydrate() {
		return kohlenhydrate;
	}

	public void setKohlenhydrate(double kohlenhydrate) {
		this.kohlenhydrate = kohlenhydrate;
	}
	
	public byte[] getBild() {
		return bild;
	}

	public void setBild(byte[] bild) {
		this.bild = bild;
	}
	
	public double getEiweiss() {
		return eiweiss;
	}

	public void setEiweiss(double eiweiss) {
		this.eiweiss = eiweiss;
	}
}
