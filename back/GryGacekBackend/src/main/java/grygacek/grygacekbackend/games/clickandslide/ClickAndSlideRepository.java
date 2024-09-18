package grygacek.grygacekbackend.games.clickandslide;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;

public interface ClickAndSlideRepository extends JpaRepository<ClickAndSlideResult, Long> {
    @Modifying
    @Transactional
    @Query(value = "insert into click_and_slide_results (game_mode_id,nickname,result,date )values((SElECT id From click_and_slide_game_modes where game_mode=?1),?2,?3,?4);", nativeQuery = true)
    void saveResult(String game_mode, String nickname, Timestamp result, LocalDate date);



    List<ClickAndSlideResult> findByNicknameAndGameMode_GameModeOrderByResult(String nickname, String gameMode_gameMode);


    List<ClickAndSlideResult> findTop100ByGameMode_GameModeAndDateBetweenOrderByResult(String gameMode, LocalDate startDate, LocalDate endDate);


    List<ClickAndSlideResult> findTop100ByGameMode_GameModeOrderByResult(String gameMode);}
