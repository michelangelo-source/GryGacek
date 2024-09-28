package grygacek.grygacekbackend.games.supertictactoe;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JoinRoomRequest {
    private String roomId;
    private String userId;
}
