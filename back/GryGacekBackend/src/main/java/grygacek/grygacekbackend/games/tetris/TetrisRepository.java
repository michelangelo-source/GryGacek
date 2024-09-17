package grygacek.grygacekbackend.games.tetris;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDate;
import java.util.List;

public interface TetrisRepository extends JpaRepository<TetrisResult,Long>{

    @Modifying
    @Transactional
@Query(value = "insert into Tetris_Result (nickname,result,date )values(?1,?2,?3);", nativeQuery = true)
    void saveResult(String nickname, int result, LocalDate date);

    List<TetrisResult> findByNicknameOrderByResultDesc(String nickname);


    List<TetrisResult> findTop100ByOrderByResultDesc();

    List<TetrisResult> findTop100ByDateBetweenOrderByResultDesc(LocalDate end_date, LocalDate start_date);
}
