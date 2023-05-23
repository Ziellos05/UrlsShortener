package cb.urlshortener.infraestructure.drivenadapters.jpa;

import cb.urlshortener.domain.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findOneByUsername(String username) throws Exception;

}

