package cb.urlshortener.application;

import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;

// ARCHIVO USADO PARA CONFIGURAR VARIAS FUNCIONES EN LA APLICACIÓN

@Configuration
// Anotación que permite configurar el doc de swagger-ui generado
@OpenAPIDefinition(servers = {
		@Server(url = "http://localhost:8080") }, info = @Info(title = "Constructora Bolivar URL Shortener", version = "1.0.0", contact = @Contact(name = "Roland Andrés Ortega Ayala", email = "roland.ortega@constructorabolivar.com"), description = "This API generates a shortened version of a long URL, get the list of user created URLs and redirect to the original website"))
public class SpringConfig {

}
