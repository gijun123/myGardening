package com.ggirick.gardening_back.dto.schedule;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InsertCalendarDTO {
    @Schema(description = "일정 제목", example = "제목 Title")
    String title;
    @Schema(description = "일정 내용", example = "내용 description")
    String description;
    @Schema(description = "작성자 uuid", example = "f44e67f3-417d-42ed-9dc4-8ha632674bba")
    String userUid;
    @Schema(description = "일정 구분 색상", example = "blue")
    String color;
    @Schema(description = "일정 반복 지정(start_date부터 ~일 마다)", example = "7")
    int recurrence;
    @Schema(description = "일정 반복 종료일", example = "2025-10-14T15:32:40")
    Timestamp recurrenceEnd;
    @Schema(description = "일정 시작일", example = "2025-10-14T15:32:40")
    Timestamp startDate;
    @Schema(description = "일정 종료일", example = "2025-10-14T15:32:40")
    Timestamp endDate;
}
