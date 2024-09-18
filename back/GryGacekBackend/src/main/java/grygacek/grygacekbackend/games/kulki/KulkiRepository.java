package grygacek.grygacekbackend.games.kulki;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDate;
import java.util.List;

public interface KulkiRepository extends JpaRepository<KulkiResult,Long>{

    @Modifying
    @Transactional
    @Query(value = "insert into Kulki_Result (nickname,result,date )values(?1,?2,?3);", nativeQuery = true)
    void saveResult(String nickname, int result, LocalDate date);

    List<KulkiResult> findByNicknameOrderByResultDesc(String nickname);


    List<KulkiResult> findTop100ByOrderByResultDesc();

    List<KulkiResult> findTop100ByDateBetweenOrderByResultDesc(LocalDate end_date, LocalDate start_date);
}
