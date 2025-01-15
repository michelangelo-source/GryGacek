package grygacek.grygacekbackend.games.minesweeper;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "minesweeper_game_modes")
public class MinesweeperGameModes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String gameMode;

    @OneToMany(mappedBy = "gameMode")
    private List<MinesweeperResult> results;

    public MinesweeperGameModes(String gameMode) {
        this.gameMode = gameMode;
    }
}
