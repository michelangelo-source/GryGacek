package grygacek.grygacekbackend.games.tetris;

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
@Table(name="tetris_result")
public class TetrisResult {
    @Id
    private long ID;
    private String nickname;
    private int result;
    private LocalDate date;




}
