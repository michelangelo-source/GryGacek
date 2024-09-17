package grygacek.grygacekbackend.games.minesweeper;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/minesweeper")
public class MinesweeperController {
    private final MinesweeperService mineswepeerService;
    @PostMapping
    @CrossOrigin
    public void saveResult(@RequestBody MinesweeperResultDTO minesweeperResultDTO){

        mineswepeerService.saveResult(minesweeperResultDTO);
    }
    @GetMapping("/{nickname}/{mode}")
    @CrossOrigin
    public List<MinesweeperResultDTO> getResultsByNickname(@PathVariable String nickname,@PathVariable String mode) {
        return mineswepeerService.getResultsByNickname(nickname,mode);
    }

    @GetMapping("/date/{date}/{mode}")
    @CrossOrigin
    public List<MinesweeperResultDTO> getResultsByTime(@PathVariable LocalDate date,  @PathVariable String mode) {
        return mineswepeerService.getBestByDates(date,mode);
    }

    @GetMapping("/results/bests/{mode}")
    @CrossOrigin
    public List<MinesweeperResultDTO> getResultsTop100(@PathVariable String mode) {
        return mineswepeerService.getTheBestResults(mode);
    }
}
