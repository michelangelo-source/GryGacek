package grygacek.grygacekbackend.games.kulki;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name="kulki_result")
public class KulkiResult {
    @Id
    private long id;
    private String nickname;
    private int result;
    private LocalDate date;




}
