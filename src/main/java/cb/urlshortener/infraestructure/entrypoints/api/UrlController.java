package cb.urlshortener.infraestructure.entrypoints.api;

import java.security.Principal;
import java.util.List;

import cb.urlshortener.domain.models.Original;
import cb.urlshortener.domain.models.Url;
import cb.urlshortener.domain.usecases.UrlUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.servlet.view.RedirectView;

// CONTROLLER DEL CRUD DE ESTRATOS
@RestController
@RequestMapping("/")
@Tag(name = "Stratum", description = "Stratum CRUD")
@CrossOrigin({ "*" })
public class UrlController {

	@Autowired
	private UrlUseCase urlUseCase;

	@PostMapping(path = "/createshortened")
	public String createShortened(@RequestBody Url url, Principal principal) {
		url.setUsername(user(principal));
		if (url.getOriginal().substring(0, 7).equals("http://") || url.getOriginal().substring(0, 8).equals("https://")) {
			return urlUseCase.createShortened(url);
		}
		return "Por favor inserte la dirección URL con protocolo 'HTTP://' o 'HTTPS://' incluido";
	}

	@GetMapping(path = "/urls")
	public List<Url> getUrlsByUser(Principal principal) throws Exception {
		String username = user(principal);
		return urlUseCase.getUrlsByUser(username);
	}

	@GetMapping(path = "/r/{path}")
	public RedirectView redirect(@PathVariable String path) {
		RedirectView redirectView = new RedirectView();
		redirectView.setUrl(urlUseCase.redirect(path));
		return redirectView;
	}

	public String user(Principal principal) {
		String userData = principal.toString();
		if (userData.substring(0, 5).equals("OAuth")) {
			return userData.substring(userData.indexOf("email=") + 6, userData.indexOf("}], Credentials"));
		}
		return "API";
	}

}
