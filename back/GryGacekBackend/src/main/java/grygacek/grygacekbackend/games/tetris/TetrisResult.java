package grygacek.grygacekbackend.games.tetris;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name="tetris_result")
public class TetrisResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long ID;
    @Column(nullable = false)
    private String nickname;
    @Column(nullable = false)
    private int result;
    @Column(nullable = false)
    private LocalDate date;




}
