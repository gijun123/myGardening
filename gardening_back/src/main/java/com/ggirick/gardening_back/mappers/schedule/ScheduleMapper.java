package com.ggirick.gardening_back.mappers.schedule;

import com.ggirick.gardening_back.dto.schedule.CalendarDTO;
import com.ggirick.gardening_back.dto.schedule.InsertCalendarDTO;
import com.ggirick.gardening_back.dto.schedule.PatchCalendarDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ScheduleMapper {
    // 요청자 일정 목록 조회
    List<CalendarDTO> getScheduleList(@Param("userUid") String userUid);

    // 개별 일정 작성자 조회
    String getUserUidById(@Param("id") int id);

    // 일정 추가(추가된 일정의 id값 반환)
    void insertSchedule(InsertCalendarDTO calendarInfo);

    // 일정 삭제
    int deleteById(@Param("id") int id);

    // 일정 수정
    int updateById(PatchCalendarDTO calendarInfo);
}
