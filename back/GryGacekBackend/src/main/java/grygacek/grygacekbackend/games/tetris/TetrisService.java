package grygacek.grygacekbackend.games.tetris;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
@AllArgsConstructor
@Service
public class TetrisService {
    private final TetrisRepository tetrisRepository;
    public void saveResult(TetrisResult tetrisResult) {
        LocalDate date=LocalDate.now();
        tetrisResult.setDate(date);
       tetrisRepository.saveResult(tetrisResult.getNickname(),tetrisResult.getResult(),tetrisResult.getDate());
    }

    public List<TetrisResult> getResultsByNickname(String nickname) {
        return tetrisRepository.findByNicknameOrderByResultDesc(nickname);
    }
    public List<TetrisResult> getBestByDates(LocalDate end_date) {
        return tetrisRepository.findTop100ByDateBetweenOrderByResultDesc(end_date,LocalDate.now());
    }
    public List<TetrisResult> getTheBestResults() {
        return tetrisRepository.findTop100ByOrderByResultDesc();
    }
}
