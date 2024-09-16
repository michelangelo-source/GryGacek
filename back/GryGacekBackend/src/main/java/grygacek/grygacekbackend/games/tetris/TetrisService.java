package grygacek.grygacekbackend.games.tetris;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
@AllArgsConstructor
@Service
public class TetrisService {
    private final TetrisRepository tetrisRepository;
    public void saveResult(TetrisResult tetrisResult) {
        Date date=new Date();
        tetrisResult.setDate(date);
       tetrisRepository.saveResult(tetrisResult.getNickname(),tetrisResult.getResult(),tetrisResult.getDate());
    }

    public List<TetrisResult> getResultsByNickname(String nickname) {
        return tetrisRepository.findByNicknameOrderByResultDesc(nickname);
    }
    public List<TetrisResult> getBestByDates(LocalDate end_date) {
        Date start_date=new Date();
        Date end_date2 = Date.from(end_date.atStartOfDay(ZoneId.systemDefault()).toInstant());
        return tetrisRepository.findAllByDateBetweenOrderByResultDesc(end_date2,start_date);
    }
    public List<TetrisResult> getTheBestResults() {
        return tetrisRepository.findTOP100ByOrderByResultDesc();
    }
}
