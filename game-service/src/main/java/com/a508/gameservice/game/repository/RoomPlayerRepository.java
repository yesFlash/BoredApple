package com.a508.gameservice.game.repository;

import com.a508.gameservice.game.domain.RoomPlayer;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public class RoomPlayerRepository {
    private final RedisTemplate<String, RoomPlayer> redisTemplate;
    private static final String ROOM_PLAYER_HASH_KEY = "roomPlayer:";

    public RoomPlayerRepository(RedisTemplate<String, RoomPlayer> redisRoomPlayerTemplate) {
        this.redisTemplate = redisRoomPlayerTemplate;
    }

    public void addPlayerToRoom(String roomId, int userId, RoomPlayer roomPlayer) {
        String key = ROOM_PLAYER_HASH_KEY + roomId;
        String userIdStr = String.valueOf(userId);
        redisTemplate.opsForHash().put(key, userIdStr, roomPlayer);
    }

    public Integer playerCnt(String roomId) {
        String key = ROOM_PLAYER_HASH_KEY + roomId;
        return Math.toIntExact(redisTemplate.opsForHash().size(key));
    }

    public Map<Object, Object> getPlayersInRoom(String roomId) {
        String key = ROOM_PLAYER_HASH_KEY + roomId;
        return redisTemplate.opsForHash().entries(key);
    }

}
