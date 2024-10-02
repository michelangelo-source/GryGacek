package grygacek.grygacekbackend.games.supertictactoe;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class JoinRoomResponse {
    private String message;
    private boolean isJoined;
    private String userWhoMoves;

    public JoinRoomResponse(String message, boolean isJoined) {
        this.message = message;
        this.isJoined = isJoined;
    }
}
