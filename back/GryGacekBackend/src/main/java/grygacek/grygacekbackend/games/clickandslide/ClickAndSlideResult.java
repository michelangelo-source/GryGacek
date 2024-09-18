package grygacek.grygacekbackend.games.clickandslide;

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
@Table(name = "click_and_slide_results")
public class ClickAndSlideResult {
    @Id
    private long id;
    @ManyToOne
    @JoinColumn(name = "game_mode_id")
    private ClickAndSlideGameModes gameMode;
    private String nickname;
    private Timestamp result;
    private LocalDate date;

}
