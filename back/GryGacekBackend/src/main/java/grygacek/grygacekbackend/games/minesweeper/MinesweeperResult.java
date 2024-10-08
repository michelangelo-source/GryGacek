package grygacek.grygacekbackend.games.minesweeper;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.sql.Timestamp;
import java.time.LocalDate;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "minesweeper_results")
public class MinesweeperResult {
    @Id
    private long id;
    @ManyToOne
    @JoinColumn(name = "game_mode_id")
    private MinesweeperGameModes gameMode;
    private String nickname;
    private Timestamp result;
    private LocalDate date;

}
