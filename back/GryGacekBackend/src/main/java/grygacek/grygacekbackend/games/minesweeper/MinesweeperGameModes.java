package grygacek.grygacekbackend.games.minesweeper;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name="minesweeper_game_modes")
public class MinesweeperGameModes {
    @Id
    private long id;
    private String gameMode;

    public MinesweeperGameModes(String gameMode) {
        this.gameMode = gameMode;
    }
}
