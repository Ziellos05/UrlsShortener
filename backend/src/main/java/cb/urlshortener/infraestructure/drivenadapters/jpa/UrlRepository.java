package cb.urlshortener.infraestructure.drivenadapters.jpa;

import cb.urlshortener.domain.models.Url;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

// Interface that uses JPA methods to send requests to the database
public interface UrlRepository extends JpaRepository<Url, Long> {

    // Find one URL if shortened exists
    Url findOneByShortened(String shortened) throws Exception;

    // Find one URL if shortened exists and belong to authenticated user
    Url findOneByOriginalAndUsername(String original, String user) throws Exception;

    // Find a set of URL that belong to authenticated user
    List<Url> findByUsername(String username) throws Exception;
}
