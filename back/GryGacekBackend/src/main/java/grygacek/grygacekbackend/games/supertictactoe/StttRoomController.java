package grygacek.grygacekbackend.games.supertictactoe;

import lombok.AllArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
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
        String userNickname = request.getUserNickname();
        if (!stttRoomService.stttRoomExists(roomId)) {
           return new JoinRoomResponse("Room not found", false);

        }
        int userCount = stttRoomService.getUserCountInRoom(roomId);
        if (userCount >= 2) {
          return new JoinRoomResponse("Room is full", false);
        }
        stttRoomService.addUserToRoom(roomId, userNickname);

       return new JoinRoomResponse("User " + userNickname + " joined room: " + roomId, true);
    }
    @MessageMapping("/getUsersInRoom")
    public void getUserInRoom(JoinRoomRequest joinRoomRequest){
        messagingTemplate.convertAndSend("/moves/" + joinRoomRequest.getRoomId(),
                new UsersInRoomResponse(stttRoomService.getRoomUsers(joinRoomRequest.getRoomId()),
                stttRoomService.getRoomUsers(joinRoomRequest.getRoomId())));
    }

    @MessageMapping("/sendIds")
    public void sendNumbers(StttMove stttMove) {
        stttMove.setAddressees(stttRoomService.getRoomUsers(stttMove.getRoomId()));
        messagingTemplate.convertAndSend("/moves/" + stttMove.getRoomId(), stttMove);

    }

    @MessageMapping("/leaveRoom")
    public void leaveRoom(LeaveRoomRequest request) {
        String roomId = request.getRoomId();
        String userNickname = request.getUserNickname();
        stttRoomService.removeUserFromRoom(roomId, userNickname);
        messagingTemplate.convertAndSend("/moves/" + roomId, new LeaveRoomResponse("User " + userNickname + " left room " + roomId,userNickname ,stttRoomService.getRoomUsers(roomId)));
    }
}
