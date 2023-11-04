package cb.urlshortener;

import cb.urlshortener.domain.models.Url;
import cb.urlshortener.domain.models.User;
import cb.urlshortener.domain.usecases.UrlUseCase;
import cb.urlshortener.domain.usecases.UserUseCase;
import cb.urlshortener.infraestructure.entrypoints.api.UrlController;
import cb.urlshortener.infraestructure.entrypoints.api.UserController;
import org.apache.commons.lang3.RandomStringUtils;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.Authentication;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@SpringBootTest
class UrlShortenerApplicationTests {

	@Autowired
	private UserUseCase userUseCase;

	@Autowired
	private UrlUseCase urlUseCase;

	@Autowired
	private UrlController urlController;

	@Autowired
	private UserController userController;

	@Test
	void getRegisterUser() throws Exception {
		User testUser = new User(1L, "TEST", "testapikey");
		assertThat(userController.login(testUser).getBody()).isNotNull();
	}

	@Test
	void getNotRegisterUser() throws Exception {
		User testUser = new User(1L, "NOREGISTERUSER@NOVALIDEMAIL.COM", "anypassword");
		assertThat(userController.login(testUser).getBody()).isNull();
	}


	@Test
	void redirectExistingUrl() throws Exception {
		String shortenedUrl = "test";
		assertThat(urlController.redirect(shortenedUrl).getUrl()).isEqualTo("https://www.redireccionvalida.com");
	}

	@Test
	void redirectNotExistingUrl() throws Exception {
		String shortenedUrl = "NotExistingUrl";
		assertThat(urlController.redirect(shortenedUrl).getUrl()).isEqualTo("https://www.google.com/");
	}

	@Test
	void getUrlsByExistingUser() throws Exception {
		Principal mockPrincipal = Mockito.mock(Principal.class);
		Mockito.when(mockPrincipal.getName()).thenReturn("TEST");
		Url url = new Url(14L, "https://www.redireccionvalida.com", "https://webwhereapiislaunched.com/r/test", "TEST");
		List<Url> urls = new ArrayList<Url>();
		urls.add(url);
		assertThat(urlController.getUrlsByUser(mockPrincipal).getBody()).isEqualTo(urls);
	}

	@Test
	void getUrlsByNotExistingUser() throws Exception {
		Principal mockPrincipal = Mockito.mock(Principal.class);
		Mockito.when(mockPrincipal.getName()).thenReturn("NotExistingUser");
		List<Url> urls = new ArrayList<Url>();
		assertThat(urlController.getUrlsByUser(mockPrincipal).getBody()).isEqualTo(urls);
	}

	@Test
	void createNotHTTPOrHTTPSPath() throws Exception {
		Principal mockPrincipal = Mockito.mock(Principal.class);
		Mockito.when(mockPrincipal.getName()).thenReturn("TEST");
		Url url = new Url(null, "htt://www.redireccionvalida.com", "AnyShortened", null);
		assertThat(urlController.createShortened(url, mockPrincipal).getBody()).isNull();
	}
	@Test
	void createExistingOriginal() throws Exception {
		Principal mockPrincipal = Mockito.mock(Principal.class);
		Mockito.when(mockPrincipal.getName()).thenReturn("TEST");
		Url url = new Url(null, "https://www.redireccionvalida.com", "AnyShortened", null);
		assertThat(urlController.createShortened(url, mockPrincipal).getBody().getShortened()).isEqualTo("https://webwhereapiislaunched.com/r/test");
	}

	@Test
	void createExistingUrl() throws Exception {
		Principal mockPrincipal = Mockito.mock(Principal.class);
		Mockito.when(mockPrincipal.getName()).thenReturn("TEST");
		Url url = new Url(null, "https://www.anotheroriginalwithexistingshortened.com", "test", null);
		assertThat(urlController.createShortened(url, mockPrincipal).getBody()).isNull();
	}

	@Test
	void createNotSendingShortened() throws Exception {
		Principal mockPrincipal = Mockito.mock(Principal.class);
		Mockito.when(mockPrincipal.getName()).thenReturn("TEST2");
		String random = RandomStringUtils.randomAlphanumeric(5);
		String original = "https://"+random+".com";
		Url url = new Url(null, original, random, null);
		assertThat(urlController.createShortened(url, mockPrincipal).getBody().getShortened()).isEqualTo("https://webwhereapiislaunched.com/r/"+random);
	}

}
