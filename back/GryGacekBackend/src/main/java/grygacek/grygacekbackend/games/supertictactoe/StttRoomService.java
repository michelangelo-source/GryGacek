package grygacek.grygacekbackend.games.supertictactoe;

import java.util.*;

import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@EnableScheduling
public class StttRoomService {
    private final Map<String, List<String>> stttRooms = new HashMap<>();
    private final Map<String, Date> stttRoomsDate = new HashMap<>();

    public String createRoom() {

        String roomId;
        do {
            roomId = UUID.randomUUID().toString().substring(0, 8);
        }
        while (this.stttRoomExists(roomId));
        List<String> userList = new ArrayList<>();
        stttRooms.put(roomId, userList);
        stttRoomsDate.put(roomId, new Date());
        return roomId;
    }

    public boolean stttRoomExists(String roomId) {
        return stttRooms.containsKey(roomId);
    }

    public int getUserCountInRoom(String roomId) {
        List<String> users = stttRooms.get(roomId);
        return users != null ? users.size() : 0;
    }

    public void addUserToRoom(String roomId, String userId) {
        List<String> users = stttRooms.get(roomId);
        if (users.size() < 2) {
            users.add(userId);
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

    public List<String> getRoomUsers(String roomId) {
        return stttRooms.get(roomId);
    }

    @Scheduled(cron = "0 0 0 * * ?")
    public void cleanupRooms() {
        Date twoDaysAgo = new Date(System.currentTimeMillis() - 2 * 24 * 60 * 60 * 1000);
        Iterator<Map.Entry<String, Date>> iterator = stttRoomsDate.entrySet().iterator();
        while (iterator.hasNext()) {
            Map.Entry<String, Date> entry = iterator.next();
            if (entry.getValue().before(twoDaysAgo)) {
                stttRooms.remove(entry.getKey());
                iterator.remove();
            }
        }
    }
}
