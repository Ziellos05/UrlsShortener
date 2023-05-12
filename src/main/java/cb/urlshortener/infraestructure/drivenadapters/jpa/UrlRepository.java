package cb.urlshortener.infraestructure.drivenadapters.jpa;

import cb.urlshortener.domain.models.Url;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

// Interface que es implementada por el servicio de estratos
public interface UrlRepository extends JpaRepository<Url, Long> {

    Url findOneByShortened(String shortened);

    Url findOneByOriginal(String original);

    List<Url> findByUsername(String username);
}
