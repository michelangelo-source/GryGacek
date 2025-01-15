package grygacek.grygacekbackend.games.clickandslide;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name="click_and_slide_game_modes")
public class ClickAndSlideGameModes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, unique = true)
    private String gameMode;
    @OneToMany(mappedBy = "gameMode")
    private List<ClickAndSlideResult> results;
    public ClickAndSlideGameModes(String gameMode) {
        this.gameMode = gameMode;
    }
}
