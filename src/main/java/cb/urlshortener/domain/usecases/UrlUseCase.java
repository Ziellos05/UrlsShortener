package cb.urlshortener.domain.usecases;

import java.util.List;

import cb.urlshortener.domain.models.Url;
import cb.urlshortener.domain.models.User;
import cb.urlshortener.domain.models.gateways.UrlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UrlUseCase {

    @Autowired
    private UrlService urlService;

    public UrlUseCase(UrlService urlRepository) throws Exception {
        this.urlService = urlRepository;
    }

    // This creates the shortened url randomly or with a path String


    public String redirect(String path) throws Exception {
        return urlService.redirect(path);
    }

    public List<Url> getUrlsByUser(String username) throws Exception {
        return urlService.getUrlsByUser(username);
    }

    public User getValue(String username) throws Exception {
        return urlService.getValue(username);
    }

    public String createShortened(Url url) throws Exception {
        return urlService.createShortened(url);
    }

}
