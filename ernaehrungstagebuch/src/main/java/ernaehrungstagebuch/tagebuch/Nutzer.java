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
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long nutzerid;
	private String benutzername;
	private String passwort;
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "nutzerid")
	private List<Ernaehrungstagebuch> ernaehrungstagebuecher = new ArrayList<>();
	
	public Nutzer(long id, String benutzername, String passwort) {
		this.nutzerid = id;
		this.benutzername = benutzername;
		this.passwort = passwort;
	}

	public Nutzer() {

	}
	
	public Nutzer(String benutzername, String passwort) {
		super();
		this.benutzername = benutzername;
		this.passwort = passwort;
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
		return "Nutzer [nutzerid=" + nutzerid + ", benutzername=" + benutzername + ", passwort=" + passwort
				+ ", ernaehrungstagebuecher=" + ernaehrungstagebuecher + "]";
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
	
	
}
