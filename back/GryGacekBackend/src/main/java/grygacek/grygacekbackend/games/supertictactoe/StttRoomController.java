package grygacek.grygacekbackend.games.supertictactoe;

import lombok.AllArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@Controller
@RequestMapping("/sttt")
public class StttRoomController {

    private final StttRoomService stttRoomService;
    private final SimpMessagingTemplate messagingTemplate;


    @GetMapping("/createRoom")
    @CrossOrigin
    @ResponseBody
    public String createRoom() {
        return stttRoomService.createRoom();
    }

    @MessageMapping("/joinRoom")
    public void joinRoom(JoinRoomRequest request) {
        String roomId = request.getRoomId();
        String userId = request.getUserId();
        if (!stttRoomService.stttRoomExists(roomId)) {
            messagingTemplate.convertAndSend("/moves/" + roomId, new JoinRoomResponse("Room not found", false,userId));
            return;
        }
        int userCount = stttRoomService.getUserCountInRoom(roomId);
        if (userCount >= 2) {
            messagingTemplate.convertAndSend("/moves/" + roomId, new JoinRoomResponse("Room is full", false,userId));
            return;
        }
        stttRoomService.addUserToRoom(roomId,userId);

        messagingTemplate.convertAndSend("/moves/" + roomId, new JoinRoomResponse("User " + userId + " joined room: " + roomId, true,stttRoomService.getRoomAdmin(roomId)));
    }

    @MessageMapping("/sendIds")
    public void sendNumbers(StttRoom stttRoom) {
        String stttRoomId = stttRoom.getRoomId();
        try {
            stttRoom = stttRoomService.changeUserName(stttRoom);
            messagingTemplate.convertAndSend("/moves/" + stttRoomId, stttRoom);
        } catch (Exception e) {
            messagingTemplate.convertAndSend("/moves/" + stttRoomId,new ExceptionDTO(e.getMessage()));
        }

    }

    @MessageMapping("/leaveRoom")
    public void leaveRoom(LeaveRoomRequest request) {
        String stttRoomId = request.getRoomId();
        String userId = request.getUserId();

        stttRoomService.removeUserFromRoom(stttRoomId, userId);

        messagingTemplate.convertAndSend("/moves/" + stttRoomId, new ExceptionDTO("User " + userId + " left room " + stttRoomId));
    }
}
