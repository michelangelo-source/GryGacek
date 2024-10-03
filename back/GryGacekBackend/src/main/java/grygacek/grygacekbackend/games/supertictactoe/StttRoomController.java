package grygacek.grygacekbackend.games.supertictactoe;

import lombok.AllArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

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

    @PostMapping("/joinRoom")
    @CrossOrigin
    @ResponseBody
    public JoinRoomResponse joinRoom(@RequestBody JoinRoomRequest request) {
        String roomId = request.getRoomId();
        String userId = request.getUserId();
        if (!stttRoomService.stttRoomExists(roomId)) {
            return new JoinRoomResponse("Room not found", false,userId);
        }
        int userCount = stttRoomService.getUserCountInRoom(roomId);
        if (userCount >= 2) {
            return  new JoinRoomResponse("Room is full", false,userId);
        }
        stttRoomService.addUserToRoom(roomId,userId);
        return new JoinRoomResponse("User " + userId + " joined room: " + roomId, true,stttRoomService.getRoomAdmin(roomId));
    }
    @MessageMapping("/sendIds")
    public void sendNumbers(StttRoom stttRoom) {
        String stttRoomId = stttRoom.getRoomId();
        String stttUserId = stttRoom.getUserName();
        List<String> addressees =new ArrayList<String>();
        addressees.add(stttUserId);
        try {
            stttRoom = stttRoomService.changeUserName(stttRoom);
            stttRoom.setAddressees(stttRoomService.getRoomUsers(stttRoomId));
            messagingTemplate.convertAndSend("/moves/" + stttRoomId, stttRoom);
        } catch (Exception e) {
            messagingTemplate.convertAndSend("/moves/" + stttRoomId,new ExceptionDTO(e.getMessage(),addressees));
        }
    }
    @MessageMapping("/leaveRoom")
    public void leaveRoom(LeaveRoomRequest request) {
        String stttRoomId = request.getRoomId();
        String userId = request.getUserId();
        stttRoomService.removeUserFromRoom(stttRoomId, userId);
        messagingTemplate.convertAndSend("/moves/" + stttRoomId, new ExceptionDTO("User " + userId + " left room " + stttRoomId,stttRoomService.getRoomUsers(stttRoomId)));
    }
}
