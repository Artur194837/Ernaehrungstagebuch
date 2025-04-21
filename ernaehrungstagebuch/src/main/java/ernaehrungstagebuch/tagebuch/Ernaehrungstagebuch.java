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
public class Ernaehrungstagebuch {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long ernaehrungstagebuchid;
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "ernaehrungstagebuchid")
	List<Eintrag> eintraege = new ArrayList<>();
	
	public Ernaehrungstagebuch(long ernaehrungstagebuchid) {
		super();
		this.ernaehrungstagebuchid = ernaehrungstagebuchid;
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
		return "Ernährungstagebuch [ernaehrungstagebuchid=" + ernaehrungstagebuchid + ", eintraege=" + eintraege + "]";
	}
}
