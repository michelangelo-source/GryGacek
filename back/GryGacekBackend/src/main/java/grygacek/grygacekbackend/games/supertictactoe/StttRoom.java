package grygacek.grygacekbackend.games.supertictactoe;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class StttRoom {
    private String roomId;
    private int bigTableId;
    private int smallTableId;

    public StttRoom(String roomId) {
    }
}
