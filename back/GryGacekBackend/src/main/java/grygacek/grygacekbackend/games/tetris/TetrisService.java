package grygacek.grygacekbackend.games.tetris;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;

@AllArgsConstructor
@Service
public class TetrisService {
    private final TetrisRepository tetrisRepository;
    public void saveResult(TetrisResult tetrisResult) {
        Date date=new Date();
        tetrisResult.setDate(date);
       tetrisRepository.saveResult(tetrisResult.getNickname(),tetrisResult.getResult(),tetrisResult.getDate());
    }
}
