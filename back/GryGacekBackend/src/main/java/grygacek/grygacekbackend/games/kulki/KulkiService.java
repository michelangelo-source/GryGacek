package grygacek.grygacekbackend.games.kulki;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
@AllArgsConstructor
@Service
public class KulkiService {
    private final KulkiRepository kulkiRepository;
    public void saveResult(KulkiResult kulkiResult) {
        LocalDate date=LocalDate.now();
        kulkiResult.setDate(date);
        kulkiRepository.saveResult(kulkiResult.getNickname(),kulkiResult.getResult(),kulkiResult.getDate());
    }

    public List<KulkiResult> getResultsByNickname(String nickname) {
        return kulkiRepository.findByNicknameOrderByResultDesc(nickname);
    }
    public List<KulkiResult> getBestByDates(LocalDate end_date) {
        return kulkiRepository.findTop100ByDateBetweenOrderByResultDesc(end_date,LocalDate.now());
    }
    public List<KulkiResult> getTheBestResults() {
        return kulkiRepository.findTop100ByOrderByResultDesc();
    }
}
