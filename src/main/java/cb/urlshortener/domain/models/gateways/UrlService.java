package cb.urlshortener.domain.models.gateways;

import cb.urlshortener.domain.models.Url;

import java.util.List;

public interface UrlService {

    String createShortened (Url url);

    String redirect (String path);

    List<Url> getUrlsByUser (String username) throws Exception;

}
