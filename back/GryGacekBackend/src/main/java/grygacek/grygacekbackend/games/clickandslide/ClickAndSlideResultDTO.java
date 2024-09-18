package grygacek.grygacekbackend.games.clickandslide;

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
public class ClickAndSlideResultDTO {
    private String gameMode;
    private String nickname;
    private LocalTime result;
    private LocalDate date;
}
