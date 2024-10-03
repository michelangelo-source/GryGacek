package grygacek.grygacekbackend.games.supertictactoe;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class StttRoom {
    private String roomId;
    private int bigTableId;
    private int smallTableId;
    private String userName;
    private List<String> addressees;
    public StttRoom(String roomId) {
    }
}
