package grygacek.grygacekbackend.games.kulki;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;


@AllArgsConstructor
@RestController
@RequestMapping(path = "/kulki")
public class KulkiController {

    private final KulkiService kulkiService;

    @PostMapping
    @CrossOrigin
    public void save_result(@RequestBody KulkiResult kulkiResult) {
        kulkiService.saveResult(kulkiResult);
    }

    @GetMapping("/{nickname}")
    @CrossOrigin
    public List<KulkiResult> getResultsByNickname(@PathVariable String nickname) {
        return kulkiService.getResultsByNickname(nickname);
    }

    @GetMapping("/date/{date}")

    @CrossOrigin
    public List<KulkiResult> getResultsByTime(@PathVariable LocalDate date) {
        return kulkiService.getBestByDates(date);
    }

    @GetMapping("/results/bests")
    @CrossOrigin
    public List<KulkiResult> getResultsTop100() {
        return kulkiService.getTheBestResults();
    }
}
