package ernaehrungstagebuch.tagebuch;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;

@Entity
public class EintragNahrungsmittel { //Darstellung der n zu m Tabelle (MySQL) als Klasse

    @EmbeddedId //Die ID setzt sich aus zwei IDs zusammen
    @JsonIgnore //Zyklusunterbrechung
    private EintragNahrungsmittelId id = new EintragNahrungsmittelId();

    @ManyToOne
    @MapsId("eintragId") //Fremdschlüssel
    @JsonIgnore
    private Eintrag eintrag;

    @ManyToOne
    @MapsId("nahrungsmittelId") //Fremdschlüssel
    private Nahrungsmittel nahrungsmittel;

    private Double menge; //(in Gramm)

	public EintragNahrungsmittelId getId() {
		return id;
	}

	public void setId(EintragNahrungsmittelId id) {
		this.id = id;
	}

	public Eintrag getEintrag() {
		return eintrag;
	}

	public void setEintrag(Eintrag eintrag) {
		this.eintrag = eintrag;
	}

	public Nahrungsmittel getNahrungsmittel() {
		return nahrungsmittel;
	}

	public void setNahrungsmittel(Nahrungsmittel nahrungsmittel) {
		this.nahrungsmittel = nahrungsmittel;
	}

	public Double getMenge() {
		return menge;
	}

	public void setMenge(Double menge) {
		this.menge = menge;
	}
    
}


