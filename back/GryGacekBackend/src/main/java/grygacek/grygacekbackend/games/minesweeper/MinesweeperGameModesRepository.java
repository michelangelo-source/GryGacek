package grygacek.grygacekbackend.games.minesweeper;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MinesweeperGameModesRepository extends JpaRepository<MinesweeperGameModes, Long> {
    MinesweeperGameModes findByGameMode(String gameMode);
}