package com.ggirick.gardening_back.controllers.schedule;

import com.ggirick.gardening_back.dto.auth.UserTokenDTO;
import com.ggirick.gardening_back.dto.schedule.CalendarDTO;
import com.ggirick.gardening_back.dto.schedule.InsertCalendarDTO;
import com.ggirick.gardening_back.dto.schedule.PatchCalendarDTO;
import com.ggirick.gardening_back.services.schedule.ScheduleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/schedules")
public class ScheduleController {
    private final ScheduleService scheduleService;

    @Operation(summary = "요청자의 일정 가져오기")
    @ApiResponse(
            responseCode = "200",
            description = "응답된 일정",
            content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = CalendarDTO.class)
            )
    )
    @GetMapping
    public ResponseEntity<List<CalendarDTO>> getSchedules(@AuthenticationPrincipal UserTokenDTO userInfo) {
        if (userInfo != null) {
            return ResponseEntity.ok(scheduleService.getScheduleList(userInfo.getUid()));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @Operation(summary = "일정 추가하기", description = "일정을 추가하고, 추가된 일정의 id값을 반환한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "일정 추가 성공"),
            @ApiResponse(responseCode = "401", description = "권한 없음(AuthenticationPrincipal없음)"),
            @ApiResponse(responseCode = "500", description = "일정 추가 실패")
    })
    @PostMapping
    public ResponseEntity<Integer> insertSchedule(@AuthenticationPrincipal UserTokenDTO userInfo,
                                               @RequestBody InsertCalendarDTO calendarInfo) {
        if (userInfo != null) {
            int result = scheduleService.insertSchedule(calendarInfo, userInfo.getUid());
            if (result > 0) return ResponseEntity.ok(result);
            else return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @Operation(summary = "일정 삭제하기")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "일정 삭제 성공"),
            @ApiResponse(responseCode = "401", description = "권한 없음(AuthenticationPrincipal없음)"),
            @ApiResponse(responseCode = "500", description = "일정 삭제 실패")
    })
    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteSchedule(@AuthenticationPrincipal UserTokenDTO userInfo,
                                               @PathVariable int id) {
        if (userInfo != null) {
            if (scheduleService.getUserUidById(id).equals(userInfo.getUid())) {
                int result = scheduleService.deleteById(id);
                if (result > 0) return ResponseEntity.ok().build();
                else return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @Operation(summary = "일정 수정하기")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "일정 수정 성공"),
            @ApiResponse(responseCode = "401", description = "권한 없음(AuthenticationPrincipal없음)"),
            @ApiResponse(responseCode = "500", description = "일정 수정 실패")
    })
    @PatchMapping
    public ResponseEntity<Void> updateSchedule(@AuthenticationPrincipal UserTokenDTO userInfo,
                                               @RequestBody PatchCalendarDTO calendarInfo) {
        if (userInfo != null) {
            if (scheduleService.getUserUidById(calendarInfo.getId()).equals(userInfo.getUid())) {
                int result = scheduleService.updateById(calendarInfo);
                if (result > 0) return ResponseEntity.ok().build();
                else return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @ExceptionHandler
    public ResponseEntity<Void> error(Exception e) {
        log.error("schedule error", e);
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
}
