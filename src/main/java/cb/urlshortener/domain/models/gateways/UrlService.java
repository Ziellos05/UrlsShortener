package cb.urlshortener.domain.models.gateways;

import cb.urlshortener.domain.models.Url;
import cb.urlshortener.domain.models.User;

import java.util.List;

public interface UrlService {

    String createShortened (Url url) throws Exception;

    String redirect (String path) throws Exception;

    List<Url> getUrlsByUser (String username) throws Exception;

    User getValue (String username) throws Exception;

}
