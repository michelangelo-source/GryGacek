package grygacek.grygacekbackend.games.supertictactoe;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class JoinRoomResponse {
    private String message;
    private boolean joined;
}
