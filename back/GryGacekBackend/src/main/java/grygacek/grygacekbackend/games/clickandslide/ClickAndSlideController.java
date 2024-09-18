package grygacek.grygacekbackend.games.clickandslide;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/clickandslide")
public class ClickAndSlideController {
    private final ClickAndSlideService clickAndSlideService;
    @PostMapping
    @CrossOrigin
    public void saveResult(@RequestBody ClickAndSlideResultDTO clickAndSlideResultDTO){
        clickAndSlideService.saveResult(clickAndSlideResultDTO);
    }
    @GetMapping("/{nickname}/{mode}")
    @CrossOrigin
    public List<ClickAndSlideResultDTO> getResultsByNickname(@PathVariable String nickname,@PathVariable String mode) {
        return clickAndSlideService.getResultsByNickname(nickname,mode);
    }

    @GetMapping("/date/{date}/{mode}")
    @CrossOrigin
    public List<ClickAndSlideResultDTO> getResultsByTime(@PathVariable LocalDate date,  @PathVariable String mode) {
        return clickAndSlideService.getBestByDates(date,mode);
    }

    @GetMapping("/results/bests/{mode}")
    @CrossOrigin
    public List<ClickAndSlideResultDTO> getResultsTop100(@PathVariable String mode) {
        return clickAndSlideService.getTheBestResults(mode);
    }
}
