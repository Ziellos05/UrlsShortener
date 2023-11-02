package cb.urlshortener.domain.models.gateways;

import cb.urlshortener.domain.models.User;
// Gateway that connects UserUseCase to Models and is implemented in the Driven Adapter layer
public interface UserService {

    // Returns the user
    User getValue (User user) throws Exception;
}
