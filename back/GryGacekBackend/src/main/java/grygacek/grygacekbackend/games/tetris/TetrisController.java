package grygacek.grygacekbackend.games.tetris;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;


@AllArgsConstructor
@RestController
@RequestMapping( path="/tetris")
public class TetrisController {

    private final TetrisService tetrisService;
    @PostMapping
    @CrossOrigin
    public void save_result(@RequestBody TetrisResult tetrisResult){
        tetrisService.saveResult(tetrisResult);
    }

}
