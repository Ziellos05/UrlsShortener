package cb.urlshortener.infraestructure.drivenadapters.jpa;

import java.util.List;

import cb.urlshortener.domain.models.Url;
import cb.urlshortener.domain.models.User;
import cb.urlshortener.domain.models.gateways.UrlService;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UrlServiceImpl implements UrlService {

	@Autowired
	private UrlRepository urlRepository;

	@Autowired
	private UserRepository userRepository;

	@Transactional
	public String createShortened(Url url) throws Exception {

		Url exists = urlRepository.findOneByOriginalAndUsername(url.getOriginal(), url.getUsername());

		if (exists != null) {
			return "http://localhost:8080/r/" + exists.getShortened();
		} else  if (url.getShortened() == null) {
			url.setShortened(RandomStringUtils.randomAlphanumeric(5));
			// Here there is a possibility that the generated path would already exist
		} else if ( urlRepository.findOneByShortened(url.getShortened()) != null) {
			return "No puedes usar este path por estar siendo usado o el programa ha fallado exitosamente, try again.";
		}
		urlRepository.save(url);
		return "http://localhost:8080/r/" +url.getShortened();
	}

	@Transactional(readOnly = true)
	public String redirect(String shortened) throws Exception {
		Url url = urlRepository.findOneByShortened(shortened);
		if (url == null) {
			return "https://www.constructorabolivar.com/";
		}
		return url.getOriginal();
	}

	@Override
	@Transactional(readOnly = true)
	public List<Url> getUrlsByUser(String username) throws Exception {
		return urlRepository.findByUsername(username);
	}

	@Override
	@Transactional(readOnly = true)
	public User getValue(String username) throws Exception {
		return userRepository.findOneByUsername(username);
	}

}
