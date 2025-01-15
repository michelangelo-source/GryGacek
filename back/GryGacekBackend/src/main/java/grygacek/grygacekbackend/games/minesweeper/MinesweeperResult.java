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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "game_mode_id", nullable = false)
    private MinesweeperGameModes gameMode;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private Timestamp result;

    @Column(nullable = false)
    private LocalDate date;
}
