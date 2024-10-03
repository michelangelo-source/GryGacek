package grygacek.grygacekbackend.games.supertictactoe;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class ExceptionDTO {
    private String message;
    private List<String> addressees;
}
