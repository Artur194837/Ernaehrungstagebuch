package ernaehrungstagebuch.tagebuch;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ErnährungstagebuchRepository extends JpaRepository<Ernaehrungstagebuch, Long> {

}
