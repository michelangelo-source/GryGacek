package grygacek.grygacekbackend.games.minesweeper;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/minesweeper")
public class MinesweeperController {
    private final MineswepeerService mineswepeerService;
    @PostMapping
    @CrossOrigin
    public void saveResult(@RequestBody MinesweeperResult minesweeperResult){

        mineswepeerService.saveResult(minesweeperResult);
    }
}
