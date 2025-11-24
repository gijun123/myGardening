package com.ggirick.gardening_back.controllers.schedule;

import com.ggirick.gardening_back.dto.auth.UserTokenDTO;
import com.ggirick.gardening_back.dto.schedule.CalendarDTO;
import com.ggirick.gardening_back.dto.schedule.InsertCalendarDTO;
import com.ggirick.gardening_back.services.schedule.ScheduleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/schedule")
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
        if(userInfo != null) {
            return ResponseEntity.ok(scheduleService.getScheduleList(userInfo.getUid()));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @Operation(summary = "일정 추가하기")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "일정 추가 성공",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = Boolean.class),
                            examples = @ExampleObject(
                                    value = "true"
                            )
                    )
            ),
            @ApiResponse(responseCode = "401", description = "권한 없음(AuthenticationPrincipal없음)"),
            @ApiResponse(responseCode = "500", description = "일정 추가 실패")
    })
    @PostMapping
    public ResponseEntity<Void> insertSchedule(@AuthenticationPrincipal UserTokenDTO userInfo,
                                                      @RequestBody InsertCalendarDTO calendarInfo) {
        if(userInfo != null) {
            userInfo.getUid();
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @ExceptionHandler
    public ResponseEntity<Void> error() {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
}
