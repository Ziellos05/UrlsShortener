package cb.urlshortener.infraestructure.entrypoints.api;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import cb.urlshortener.domain.models.Url;
import cb.urlshortener.domain.models.User;
import cb.urlshortener.domain.usecases.UrlUseCase;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@RequestMapping("/")
@Tag(name = "UrlShortener", description = "URL CRUD and user authentication")
@CrossOrigin({ "*" })
public class UrlController {

	@Autowired
	private UrlUseCase urlUseCase;

	@Operation(summary = "Created a shortened URL if the user/API is authenticated (With authentication in header)")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "OK", content = @Content),
			@ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
			@ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content)})
	@PostMapping(path = "/createshortened")
	public ResponseEntity<String> createShortened(@RequestBody Url url, Authentication authentication) {
		url.setUsername(authentication.getName());
		if (url.getOriginal().substring(0, 7).equals("http://") || url.getOriginal().substring(0, 8).equals("https://")) {
			try {
				return ResponseEntity.ok(urlUseCase.createShortened(url));
			} catch (Exception e) {
				throw new RuntimeException(e);
			}
		}
		return ResponseEntity.badRequest().body("Please insert URL path with 'HTTP://' or 'HTTPS://' incorporated");
	}

	@Operation(summary = "Get a list of URLs by authenticated user (With authentication in header)")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "OK", content = @Content),
			@ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content) })
	@GetMapping(path = "/urls")
	public ResponseEntity<List<Url>> getUrlsByUser(Authentication authentication) {
		try {
			return ResponseEntity.ok(urlUseCase.getUrlsByUser(authentication.getName()));
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

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
			System.out.println("Error redirecting URL " + e.getMessage());
			throw new RuntimeException(e);
		}
		return redirectView;
	}

	@Operation(summary = "User/API Authentication")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "OK", content = @Content),
			@ApiResponse(responseCode = "400", description = "Bad request", content = @Content),
			@ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content) })
	@PostMapping("user")
	public ResponseEntity<User> login(@RequestBody User user) throws Exception {
		User verification = urlUseCase.getValue(user.getUsername());
		String token = null;
		if ( verification != null && verification.getPassword().equals(user.getPassword())) {
				try {
					token = getJWTToken(user.getUsername());
					user.setUsername(user.getUsername());
					user.setPassword(token);
					return ResponseEntity.ok(user);
				} catch (Exception e) {
					System.out.println("Error authenticating user: " + e.getMessage());
					throw new RuntimeException(e);
				}
		}
		return ResponseEntity.badRequest().build();
	}

	private String getJWTToken(String username) throws Exception {
		String secretKey = "mySecretKeyasdasdas354235wefwefwe5234rserfsdfsdgdfgdf.sfsdfsdfsdfsdfsdfsdfsdsdf";
		List<GrantedAuthority> grantedAuthorities = AuthorityUtils
				.commaSeparatedStringToAuthorityList("ROLE_USER");

		String token = Jwts
				.builder()
				.setId("softtekJWT")
				.setSubject(username)
				.claim("authorities",
						grantedAuthorities.stream()
								.map(GrantedAuthority::getAuthority)
								.collect(Collectors.toList()))
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + 600000))
				.signWith(SignatureAlgorithm.HS512,
						secretKey.getBytes()).compact();

		return "Bearer " + token;
	}

}
