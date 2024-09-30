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
    public String joinRoom(JoinRoomRequest request, SimpMessageHeaderAccessor headerAccessor) {
        String roomId = request.getRoomId();
        String userId = request.getUserId();

        if (!stttRoomService.stttRoomExists(roomId)) {
            return "Room not found";
        }

        int userCount = stttRoomService.getUserCountInRoom(roomId);

        if (userCount >= 2) {
            return "Room is full";
        }

        boolean added = stttRoomService.addUserToRoom(roomId, userId);

        if (added) {
            headerAccessor.getSessionAttributes().put("roomId", roomId);
            return "User " + userId + " joined room " + roomId;
        } else {
            return "Room is full";
        }
    }

    @MessageMapping("/sendIds")
    public void sendNumbers(StttRoom stttRoom) {
        String stttRoomId = stttRoom.getRoomId();
        try {
            stttRoom = stttRoomService.changeUserName(stttRoom);
            System.out.println("here");
            messagingTemplate.convertAndSend("/moves/" + stttRoomId, stttRoom);
        }catch (Exception e){
            messagingTemplate.convertAndSend("/moves/" + stttRoomId, e);
        }

    }

    @MessageMapping("/leaveRoom")
    public void leaveRoom(LeaveRoomRequest request) {
        String stttRoomId = request.getRoomId();
        String userId = request.getUserId();

        stttRoomService.removeUserFromRoom(stttRoomId, userId);

        messagingTemplate.convertAndSend("/moves/"+stttRoomId, "User " + userId + " left room " + stttRoomId);
    }
}
