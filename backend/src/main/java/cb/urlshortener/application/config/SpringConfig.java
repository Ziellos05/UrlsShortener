package cb.urlshortener.application.config;

import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;

// Class used to configure the application
@Configuration
// Annotation that allows swagger-ui doc
@OpenAPIDefinition(servers = {
		@Server(url = "https://webwhereapiislaunched.com") }, info = @Info(title = "URL Shortener", version = "1.0.0", contact = @Contact(name = "Roland Andrés Ortega Ayala", email = "rolandandresortega@gmail.com"), description = "This API generates a shortened version of a long URL, get the list of user created URLs and redirect to the original website"))
public class SpringConfig {

}
