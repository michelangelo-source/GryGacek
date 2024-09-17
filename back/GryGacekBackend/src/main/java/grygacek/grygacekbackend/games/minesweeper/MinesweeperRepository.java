package grygacek.grygacekbackend.games.minesweeper;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;

public interface MinesweeperRepository extends JpaRepository<MinesweeperResult, Long> {
    @Modifying
    @Transactional
    @Query(value = "insert into minesweeper_results (game_mode_id,nickname,result,date )values((SElECT id From minesweeper_game_modes where game_mode=?1),?2,?3,?4);", nativeQuery = true)
    void saveResult(String game_mode, String nickname, Timestamp result, LocalDate date);



    List<MinesweeperResult> findByNicknameAndGameMode_GameModeOrderByResult(String nickname, String gameMode_gameMode);


    List<MinesweeperResult> findTop100ByGameMode_GameModeAndDateBetweenOrderByResult(String gameMode, LocalDate startDate, LocalDate endDate);


    List<MinesweeperResult> findTop100ByGameMode_GameModeOrderByResult(String gameMode);}
