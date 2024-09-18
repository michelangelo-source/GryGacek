package grygacek.grygacekbackend.games.clickandslide;

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
@Table(name="click_and_slide_game_modes")
public class ClickAndSlideGameModes {
    @Id
    private long id;
    private String gameMode;

    public ClickAndSlideGameModes(String gameMode) {
        this.gameMode = gameMode;
    }
}
