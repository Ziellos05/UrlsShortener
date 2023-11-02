package cb.urlshortener.infraestructure.entrypoints.api;

import cb.urlshortener.domain.models.User;
import cb.urlshortener.domain.usecases.UserUseCase;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

// Entry point that allows access to the API and services related to the User
@RestController
@RequestMapping("/")
@Tag(name = "User Operations", description = "URL CRUD and user authentication")
public class UserController {

    @Value("${spring.datasource.secretkey}")
    private String propertiesKey;

    @Autowired
    private UserUseCase userUseCase;

    // Method that allows the authentication of the user
    @Operation(summary = "User/API Authentication")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK", content = @Content),
            @ApiResponse(responseCode = "400", description = "Bad request", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content) })
    @PostMapping("user")
    public ResponseEntity<User> login(@RequestBody User user) throws Exception {
        User verification = userUseCase.getValue(user);
        String token = null;
        if ( verification != null && verification.getPassword().equals(user.getPassword())) {
            try {
                token = getJWTToken(user.getUsername());
                user.setUsername(user.getUsername());
                user.setPassword(token);
                return ResponseEntity.ok(user);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
        return ResponseEntity.badRequest().build();
    }

    // Method that generates JWT Token
    private String getJWTToken(String username) throws Exception {
        String secretKey = propertiesKey;
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
