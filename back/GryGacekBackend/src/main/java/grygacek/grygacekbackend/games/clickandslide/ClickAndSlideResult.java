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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    @JoinColumn(name = "game_mode_id")
    private ClickAndSlideGameModes gameMode;
    @Column(nullable = false)
    private String nickname;
    @Column(nullable = false)
    private Timestamp result;
    @Column(nullable = false)
    private LocalDate date;

}
