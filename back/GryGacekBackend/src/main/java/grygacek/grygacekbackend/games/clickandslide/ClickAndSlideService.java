package grygacek.grygacekbackend.games.clickandslide;


import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@AllArgsConstructor
@Service
public class ClickAndSlideService {
    private final ClickAndSlideRepository clickAndSlideRepository;

    public void saveResult(ClickAndSlideResultDTO clickAndSlideResultDTO) {
        LocalDate date = LocalDate.now();
        clickAndSlideRepository.saveResult(
                clickAndSlideResultDTO.getGameMode(),
                clickAndSlideResultDTO.getNickname(),
                Timestamp.valueOf(LocalDate.of(1970, 1, 1).atTime(clickAndSlideResultDTO.getResult())),
                date
        );
    }

    public List<ClickAndSlideResultDTO> getResultsByNickname(String nickname, String mode) {

        List<ClickAndSlideResult> list = clickAndSlideRepository.findByNicknameAndGameMode_GameModeOrderByResult(nickname, mode);
        return convertDates(list);
    }

    public List<ClickAndSlideResultDTO> getBestByDates(LocalDate end_date, String mode) {
        List<ClickAndSlideResult> list = clickAndSlideRepository.findTop100ByGameMode_GameModeAndDateBetweenOrderByResult(mode, end_date, LocalDate.now());
        return convertDates(list);
    }

    public List<ClickAndSlideResultDTO> getTheBestResults(String mode) {
        List<ClickAndSlideResult> list = clickAndSlideRepository.findTop100ByGameMode_GameModeOrderByResult(mode);
        return convertDates(list);
    }

    private List<ClickAndSlideResultDTO> convertDates(List<ClickAndSlideResult> list) {
        List<ClickAndSlideResultDTO> newList = new ArrayList<>();
        for (ClickAndSlideResult elem : list) {
            ClickAndSlideResultDTO newListElement = new ClickAndSlideResultDTO(elem.getGameMode().getGameMode(), elem.getNickname(), elem.getResult().toLocalDateTime().toLocalTime(), elem.getDate());
            newList.add(newListElement);
        }
        return newList;
    }
}
