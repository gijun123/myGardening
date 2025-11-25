package com.ggirick.gardening_back.services.schedule;

import com.ggirick.gardening_back.dto.schedule.CalendarDTO;
import com.ggirick.gardening_back.dto.schedule.InsertCalendarDTO;
import com.ggirick.gardening_back.dto.schedule.PatchCalendarDTO;
import com.ggirick.gardening_back.mappers.schedule.ScheduleMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ScheduleService {
    private final ScheduleMapper scheduleMapper;

    // 요청자 일정 조회
    public List<CalendarDTO> getScheduleList(String uid) {
        return scheduleMapper.getScheduleList(uid);
    }

    // 개별 일정 사용자 uid 조회
    public String getUserUidById(int id) {
        return scheduleMapper.getUserUidById(id);
    }

    // 일정 추가
    public int insertSchedule(InsertCalendarDTO calendarInfo, String uid) {
        calendarInfo.setUserUid(uid);
        scheduleMapper.insertSchedule(calendarInfo);
        return calendarInfo.getId();
    }
    
    // 일정 삭제
    public int deleteById(int id) {
        return scheduleMapper.deleteById(id);
    }
    
    // 일정 업데이트
    public int updateById(PatchCalendarDTO updateInfo) {
        return scheduleMapper.updateById(updateInfo);
    }
}
