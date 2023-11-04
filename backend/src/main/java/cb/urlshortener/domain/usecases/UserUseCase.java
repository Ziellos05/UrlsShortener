package cb.urlshortener.domain.usecases;

import java.util.List;

import cb.urlshortener.domain.models.Url;
import cb.urlshortener.domain.models.User;
import cb.urlshortener.domain.models.gateways.UrlService;
import cb.urlshortener.domain.models.gateways.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Component
public class UserUseCase {

    @Autowired
    private UserService userService;

    public User getValue(User user) throws Exception {
        return userService.getValue(user);
    }

}
