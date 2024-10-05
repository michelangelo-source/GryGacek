package grygacek.grygacekbackend.games.supertictactoe;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LeaveRoomRequest {
    private String roomId;
    private String userNickname;
}
