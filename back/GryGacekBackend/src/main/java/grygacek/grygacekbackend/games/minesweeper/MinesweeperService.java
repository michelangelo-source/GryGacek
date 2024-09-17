package grygacek.grygacekbackend.games.minesweeper;


import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@AllArgsConstructor
@Service
public class MinesweeperService {
    private final MinesweeperRepository minesweeperRepository;

    public void saveResult(MinesweeperResultDTO minesweeperResultDTO) {
        LocalDate date = LocalDate.now();
        MinesweeperResult minesweeperResult=new MinesweeperResult();
        minesweeperResult.setDate(date);
        minesweeperResult.setNickname(minesweeperResultDTO.getNickname());
        MinesweeperGameModes minesweeperGameModes=new MinesweeperGameModes(minesweeperResultDTO.getGameMode());
        minesweeperResult.setGameMode(minesweeperGameModes);


        minesweeperResult.setResult( Timestamp.valueOf(LocalDate.of(1970, 1, 1).atTime(minesweeperResultDTO.getResult())));
        minesweeperRepository.saveResult(minesweeperResult.getGameMode().getGameMode(), minesweeperResult.getNickname(), minesweeperResult.getResult(), minesweeperResult.getDate());
    }

    public List<MinesweeperResultDTO> getResultsByNickname(String nickname, String mode) {

        List<MinesweeperResult> list= minesweeperRepository.findByNicknameAndGameMode_GameModeOrderByResult(nickname, mode);
        return convertDates(list);
    }

    public List<MinesweeperResultDTO> getBestByDates(LocalDate end_date, String mode) {
        List<MinesweeperResult> list= minesweeperRepository.findTop100ByGameMode_GameModeAndDateBetweenOrderByResult(mode, end_date, LocalDate.now());
        return convertDates(list);
    }

    public List<MinesweeperResultDTO> getTheBestResults(String mode) {
        List<MinesweeperResult> list=minesweeperRepository.findTop100ByGameMode_GameModeOrderByResult(mode);
        return convertDates(list);
    }
    private List<MinesweeperResultDTO> convertDates(List<MinesweeperResult> list){

        List<MinesweeperResultDTO> newList=new ArrayList<>();
        for(MinesweeperResult elem:list){
            MinesweeperResultDTO newListElement=new MinesweeperResultDTO(elem.getGameMode().getGameMode(), elem.getNickname(), elem.getResult().toLocalDateTime().toLocalTime(),elem.getDate()) ;

            newList.add(newListElement);

        }
        return newList;
    }
}
