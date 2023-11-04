package cb.urlshortener.domain.models.gateways;

import cb.urlshortener.domain.models.Url;
import cb.urlshortener.domain.models.User;

import java.util.List;

// Gateway that connects UrlUseCase to Models and is implemented in the Driven Adapter layer
public interface UrlService {

    // Create a new shortened URL if the user is authenticated
    Url createShortened (Url url) throws Exception;

    // Redirect a shortened URL to original path
    String redirect (String path) throws Exception;

    // Get the list of URLs created by the authenticated user
    List<Url> getUrlsByUser (String username) throws Exception;

}
