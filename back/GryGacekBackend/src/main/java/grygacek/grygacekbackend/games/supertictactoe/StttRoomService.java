package grygacek.grygacekbackend.games.supertictactoe;

import java.util.*;

import org.springframework.stereotype.Service;

@Service
public class StttRoomService {
    private final Map<String, List<String>> stttRooms = new HashMap<>();


    public String createRoom() {

        String roomId;
        do{
            roomId = UUID.randomUUID().toString().substring(0,8);
        }
        while(this.stttRoomExists(roomId));
        List<String> userList=new ArrayList<>();
        stttRooms.put(roomId, userList);
        return roomId;
    }

    public boolean stttRoomExists(String roomId) {
        return stttRooms.containsKey(roomId);
    }
    public int getUserCountInRoom(String roomId) {
        List<String> users = stttRooms.get(roomId);
        return users != null ? users.size() : 0;
    }
    public boolean addUserToRoom(String roomId, String userId) {
        List<String> users = stttRooms.get(roomId);
        if (users.size() < 2) {
            users.add(userId);
            return true;
        } else {
            return false;
        }
    }
    public void removeUserFromRoom(String roomId, String userId) {
        List<String> users = stttRooms.get(roomId);
        if (users != null) {
            users.remove(userId);
            if (users.isEmpty()) {
                stttRooms.remove(roomId);
            }
        }
    }
}
