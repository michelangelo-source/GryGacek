package grygacek.grygacekbackend.games.minesweeper;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;
import java.util.Date;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "minesweeper_result")
public class MinesweeperResult {
    @Id
    private double id;
    private String game_mode;
    private String nickname;
    private LocalTime result;
    private Date Date;
}
