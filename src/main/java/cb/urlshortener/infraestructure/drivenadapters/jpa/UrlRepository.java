package cb.urlshortener.infraestructure.drivenadapters.jpa;

import cb.urlshortener.domain.models.Url;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UrlRepository extends JpaRepository<Url, Long> {

    Url findOneByShortened(String shortened) throws Exception;

    Url findOneByOriginalAndUsername(String original, String user) throws Exception;

    List<Url> findByUsername(String username) throws Exception;
}
