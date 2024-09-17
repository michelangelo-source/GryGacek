package grygacek.grygacekbackend.games.tetris;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;


@AllArgsConstructor
@RestController
@RequestMapping(path = "/tetris")
public class TetrisController {

    private final TetrisService tetrisService;

    @PostMapping
    @CrossOrigin
    public void save_result(@RequestBody TetrisResult tetrisResult) {
        tetrisService.saveResult(tetrisResult);
    }

    @GetMapping("/{nickname}")
    @CrossOrigin
    public List<TetrisResult> getResultsByNickname(@PathVariable String nickname) {
        return tetrisService.getResultsByNickname(nickname);
    }

    @GetMapping("/date/{date}")

    @CrossOrigin
    public List<TetrisResult> getResultsByTime(@PathVariable LocalDate date) {
        return tetrisService.getBestByDates(date);
    }

    @GetMapping("/results/bests")
    @CrossOrigin
    public List<TetrisResult> getResultsTop100() {
        return tetrisService.getTheBestResults();
    }
}
