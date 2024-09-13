package grygacek.grygacekbackend.games.minesweeper;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalTime;
import java.util.Date;

public interface MinesweeperRepository extends JpaRepository<MinesweeperResult, Double> {
    @Modifying
    @Transactional
    @Query(value = "insert into minesweeper_results (game_mode_id,nickname,result,date )values((SElECT id From minesweeper_game_modes where game_mode=?1),?2,?3,?4);", nativeQuery = true)
    void saveResult(String game_mode, String nickname, LocalTime result, Date date);
}
