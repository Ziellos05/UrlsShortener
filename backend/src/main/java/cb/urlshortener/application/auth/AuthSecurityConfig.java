package cb.urlshortener.application.auth;

import cb.urlshortener.domain.usecases.UrlUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// Web Security configuration
@EnableWebSecurity
@Configuration
public class AuthSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UrlUseCase urlUseCase;

    // Method that configure http requests permissions
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable().cors().disable()
                .addFilterAfter(new ApiKeyFilter(), UsernamePasswordAuthenticationFilter.class)
                .authorizeRequests()
                .antMatchers(HttpMethod.POST, "/user").permitAll()
                .antMatchers(HttpMethod.GET, "/r/**").permitAll()
                .anyRequest().authenticated();
    }

    // Method that ignores swagger paths to prevent blocking it when the app is running in development
    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/swagger-ui/**", "/v3/api-docs/**");
    }

}
