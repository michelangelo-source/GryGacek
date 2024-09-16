package grygacek.grygacekbackend.games.tetris;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import java.util.Date;
import java.util.List;

public interface TetrisRepository extends JpaRepository<TetrisResult,Double>{

    @Modifying
    @Transactional
@Query(value = "insert into Tetris_Result (nickname,result,date )values(?1,?2,?3);", nativeQuery = true)
    void saveResult(String nickname, int result, Date date);

    List<TetrisResult> findByNicknameOrderByResultDesc(String nickname);


    List<TetrisResult> findTOP100ByOrderByResultDesc();

    List<TetrisResult> findAllByDateBetweenOrderByResultDesc(Date startDate, Date endDate);
}
