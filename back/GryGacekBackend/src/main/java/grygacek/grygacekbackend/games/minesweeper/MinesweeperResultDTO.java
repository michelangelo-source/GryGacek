package grygacek.grygacekbackend.games.minesweeper;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;
import java.time.LocalTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class MinesweeperResultDTO {
    private String gameMode;
    private String nickname;
    private LocalTime result;
    private LocalDate date;

}
