package cb.urlshortener.infraestructure.drivenadapters.jpa;

import cb.urlshortener.domain.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

// Interface that uses JPA methods to send requests to the database
public interface UserRepository extends JpaRepository<User, Long> {

    // Returns the user from the database
    User findOneByUsername(String username) throws Exception;

}

