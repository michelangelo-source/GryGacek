package grygacek.grygacekbackend.games.minesweeper;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
@AllArgsConstructor
@Service
public class MineswepeerService {
    private final MinesweeperRepository minesweeperRepository;
    public void saveResult(MinesweeperResult minesweeperResult) {
        Date date=new Date();
        minesweeperResult.setDate(date);
        minesweeperRepository.saveResult(minesweeperResult.getGame_mode(),minesweeperResult.getNickname(),minesweeperResult.getResult(),minesweeperResult.getDate());
    }
}
