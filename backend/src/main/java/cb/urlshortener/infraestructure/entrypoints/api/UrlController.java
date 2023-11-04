package cb.urlshortener.infraestructure.entrypoints.api;

import java.security.Principal;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import cb.urlshortener.domain.models.Url;
import cb.urlshortener.domain.usecases.UrlUseCase;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.servlet.view.RedirectView;

// Entry point that allows access to the API and services related to the URL
@RestController
@RequestMapping("/")
@Tag(name = "Url Operations", description = "URL CRUD and user authentication")
public class UrlController {

	@Autowired
	private UrlUseCase urlUseCase;

	@GetMapping(path = "/")
	public String home() {
		return "Home page";
	}

	// Method that get the list of URLs created by the authenticated user
	@Operation(summary = "Get a list of URLs by authenticated user (With authentication in header)")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "OK", content = @Content),
			@ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content) })
	@GetMapping(path = "/urls")
	public ResponseEntity<List<Url>> getUrlsByUser(Principal principal) {
		try {
			return ResponseEntity.ok(urlUseCase.getUrlsByUser(principal.getName()));
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	// Method that redirect a shortened URL to original path
	@Operation(summary = "Redirect a shortened URL to the original path")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "OK", content = @Content),
			@ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content) })
	@GetMapping(path = "/r/{path}")
	public RedirectView redirect(@PathVariable String path) {
		RedirectView redirectView = new RedirectView();
		try {
			redirectView.setUrl(urlUseCase.redirect(path));
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		return redirectView;
	}

	// Method that create a new shortened URL if the user is authenticated
	@Operation(summary = "Created a shortened URL if the user/API is authenticated (With authentication in header)")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "OK", content = @Content),
			@ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
			@ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content)})
	@PostMapping(path = "/createshortened")
	public ResponseEntity<Url> createShortened(@RequestBody Url url, Principal principal) {
		url.setUsername(principal.getName());
		if (url.getOriginal().substring(0, 8).equals("https://")) {
			try {
				HttpHeaders responseHeaders = new HttpHeaders();
				responseHeaders.set("Access-Control-Allow-Origin", "*");
				responseHeaders.set("Access-Control-Allow-Headers", "X-Requested-With");
				Url newShortened = urlUseCase.createShortened(url);
				if (newShortened == null) {
					return ResponseEntity.badRequest().body(null);
				}
				newShortened.setShortened("https://webwhereapiislaunched.com/r/"+newShortened.getShortened());
				return new ResponseEntity<Url>(newShortened, responseHeaders, HttpStatus.OK);
			} catch (Exception e) {
				throw new RuntimeException(e);
			}
		}
		return ResponseEntity.badRequest().body(null);
	}

}
