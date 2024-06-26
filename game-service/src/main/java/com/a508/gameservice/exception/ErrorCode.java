package com.a508.gameservice.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    //Game
    PLAYER_IS_FULL_ERROR(404, "GME001", "제한 인원을 초과했습니다."),
    ROOM_IS_NOT_EXIST(404, "GME002", "해당 방이 존재하지 않습니다"),
    RESULT_IS_EMPTY(400, "GME003", "결과값이 없습니다."),
    GAME_IS_STARTED(404, "GME004", "해당 방의 게임이 시작되었습니다."),
    QUICK_ENTRY_ROOM_IS_EMPTY(400, "GME005", "현재 입장 가능한 방이 없습니다."),
   GAME_ROOM_IS_EMPTY(400, "GME006", "현재 게임 방이 없습니다.");

    private final int status;

    private final String code;

    private final String message;
}
