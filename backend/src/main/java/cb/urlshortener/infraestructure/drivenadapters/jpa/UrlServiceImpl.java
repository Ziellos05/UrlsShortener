package cb.urlshortener.infraestructure.drivenadapters.jpa;

import java.util.List;

import cb.urlshortener.domain.models.Url;
import cb.urlshortener.domain.models.User;
import cb.urlshortener.domain.models.gateways.UrlService;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

// This class is the service that is responsible for implementing the URL gateway service
@Service
public class UrlServiceImpl implements UrlService {

	private String redirectWeb = "https://webwhereapiislaunched.com/r/";

	@Autowired
	private UrlRepository urlRepository;

	@Autowired
	private UserRepository userRepository;

	// Create a new shortened URL if the user is authenticated
	@Transactional
	public Url createShortened(Url url) throws Exception {

		Url exists = urlRepository.findOneByOriginalAndUsername(url.getOriginal(), url.getUsername());

		if (exists != null) {
			return exists;
		} else  if (url.getShortened() == null) {
			url.setShortened(RandomStringUtils.randomAlphanumeric(5));
			while (urlRepository.findOneByShortened(url.getShortened()) != null) {
				url.setShortened(RandomStringUtils.randomAlphanumeric(5));
			}
			// Here there is a possibility that the generated path would already exist
		} else if ( urlRepository.findOneByShortened(url.getShortened()) != null) {
			return null;
		}
		urlRepository.save(url);

		return url;
	}

	// Redirect a shortened URL to original path
	@Transactional(readOnly = true)
	public String redirect(String shortened) throws Exception {
		Url url = urlRepository.findOneByShortened(shortened);
		if (url == null) {
			return "https://www.google.com/";
		}
		return url.getOriginal();
	}

	// Get the list of URLs created by the authenticated user
	@Override
	@Transactional(readOnly = true)
	public List<Url> getUrlsByUser(String username) throws Exception {
		List<Url> urls = urlRepository.findByUsername(username);
		for (Url i : urls) {
			i.setShortened(redirectWeb+i.getShortened());
		}
		return urls;
	}

}
