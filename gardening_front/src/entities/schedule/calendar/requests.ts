import {type CalendarDTO, ScheduleControllerApi} from "@/shared/api";
import type {IEvent} from "@/entities/schedule/calendar/interfaces.ts";
import type {TEventColor} from "@/entities/schedule/calendar/types.ts";

export const getEvents = async () => {
    // return CALENDAR_ITEMS_MOCK;

    const scheduleApi = new ScheduleControllerApi();
    const respData = await scheduleApi.getSchedules().then(r => r.data);

    const dtoArray: CalendarDTO[] = Array.isArray(respData) ? respData : [respData];

    // CalendarDTO → IEvent 변환
    const events: IEvent[] = dtoArray.map(dto => ({
        id: dto.id ?? 0,
        startDate: new Date(dto.startDate!).toISOString(),
        endDate: new Date(dto.endDate!).toISOString(),
        title: dto.title ?? "",
        color: (dto.color as TEventColor) ?? "blue",
        description: dto.description ?? "",
        recurrenceId: dto.recurrenceId ?? -1,
        recurrence: dto.recurrence ?? 0,
        recurrenceEnd: dto.recurrenceEnd ?? "",
    }));

    return events;
};

export const calcRecurrence = (events: IEvent[]) => {

};