package cb.urlshortener.infraestructure.drivenadapters.jpa;

import cb.urlshortener.domain.models.User;
import cb.urlshortener.domain.models.gateways.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

// This class is the service that is responsible for implementing the User gateway service
@Service
public class UserServiceImpl implements UserService {

    @Value("${spring.datasource.secretkey}")
    private String propertiesKey;
    @Autowired
    private UserRepository userRepository;

    // Returns the user
    @Override
    @Transactional
    public User getValue(User user) throws Exception {

        User verification = userRepository.findOneByUsername(user.getUsername());

        if (verification == null &&  user.getUsername().substring(user.getUsername().length() - 24).equals("@gmail.com") && user.getPassword().equals(propertiesKey)) {
            userRepository.save(user);
            return user;
        }
        return verification;
    }
}
