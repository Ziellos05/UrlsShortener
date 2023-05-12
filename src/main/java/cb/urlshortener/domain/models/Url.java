package cb.urlshortener.domain.models;

// Modelo para los estratos, relacionado con la tabla STRATUMS en la base de datos
import javax.persistence.*;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "urls", schema = "urlshortener")
public class Url {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@Column(name = "original")
	@NotNull
	private String original;

	@Column(name = "shortened")
	@NotNull
	private String shortened;

	@Column(name = "username")
	private String username;

}
