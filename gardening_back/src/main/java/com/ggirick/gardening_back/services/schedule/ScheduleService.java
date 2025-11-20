package com.ggirick.gardening_back.services.schedule;

import com.ggirick.gardening_back.dto.schedule.CalendarDTO;
import com.ggirick.gardening_back.dto.schedule.InsertCalendarDTO;
import com.ggirick.gardening_back.mappers.schedule.ScheduleMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ScheduleService {
    private ScheduleMapper scheduleMapper;

    // 요청자 일정 조회
    public List<CalendarDTO> getScheduleList(String uid) {
        return scheduleMapper.getScheduleList(uid);
    }

    // 일정 추가
    public int insertSchedule(InsertCalendarDTO calendarInfo, String uid) {
        return scheduleMapper.insertSchedule(CalendarDTO.builder()
                .title(calendarInfo.getTitle())
                .description(calendarInfo.getDescription())
                .color(calendarInfo.getColor())
                .userUid(uid)
                .startDate(calendarInfo.getStartDate())
                .endDate(calendarInfo.getEndDate())
                .recurrence(calendarInfo.getRecurrence())
                .recurrenceEnd(calendarInfo.getRecurrenceEnd())
                .build());
    }
}
