package ernaehrungstagebuch.tagebuch;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Embeddable;

@Embeddable
public class EintragNahrungsmittelId implements Serializable {
    private Long eintragId;
    private Long nahrungsmittelId;
    
	@Override
	public int hashCode() {
		return Objects.hash(eintragId, nahrungsmittelId);
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		EintragNahrungsmittelId other = (EintragNahrungsmittelId) obj;
		return Objects.equals(eintragId, other.eintragId) && Objects.equals(nahrungsmittelId, other.nahrungsmittelId);
	}
}

