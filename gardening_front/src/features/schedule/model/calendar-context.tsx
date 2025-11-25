"use client";

import React, {createContext, useContext, useEffect, useState} from "react";
import {useLocalStorage} from "@/entities/schedule/calendar/hooks.ts";
import type {IEvent} from "@/entities/schedule/calendar/interfaces.ts";
import type {TCalendarView, TEventColor,} from "@/entities/schedule/calendar/types.ts";
import {type InsertCalendarDTO, type PatchCalendarDTO, ScheduleControllerApi} from "@/shared/api";

interface ICalendarContext {
    selectedDate: Date;
    view: TCalendarView;
    setView: (view: TCalendarView) => void;
    agendaModeGroupBy: "date" | "color";
    setAgendaModeGroupBy: (groupBy: "date" | "color") => void;
    use24HourFormat: boolean;
    toggleTimeFormat: () => void;
    setSelectedDate: (date: Date | undefined) => void;
    badgeVariant: "dot" | "colored";
    setBadgeVariant: (variant: "dot" | "colored") => void;
    selectedColors: TEventColor[];
    filterEventsBySelectedColors: (colors: TEventColor) => void;
    events: IEvent[];
    addEvent: (event: IEvent) => void;
    updateEvent: (event: IEvent) => void;
    removeEvent: (eventId: number) => void;
    clearFilter: () => void;
}

interface CalendarSettings {
    badgeVariant: "dot" | "colored";
    view: TCalendarView;
    use24HourFormat: boolean;
    agendaModeGroupBy: "date" | "color";
}

const DEFAULT_SETTINGS: CalendarSettings = {
    badgeVariant: "colored",
    view: "day",
    use24HourFormat: true,
    agendaModeGroupBy: "date",
};

const scheduleApi = new ScheduleControllerApi();

const CalendarContext = createContext({} as ICalendarContext);

export function CalendarProvider({
                                     children,
                                     events,
                                     badge = "colored",
                                     view = "day",
                                 }: {
    children: React.ReactNode;
    events: IEvent[];
    view?: TCalendarView;
    badge?: "dot" | "colored";
}) {
    const [settings, setSettings] = useLocalStorage<CalendarSettings>(
        "calendar-settings",
        {
            ...DEFAULT_SETTINGS,
            badgeVariant: badge,
            view: view,
        },
    );

    const [badgeVariant, setBadgeVariantState] = useState<"dot" | "colored">(
        settings.badgeVariant,
    );
    const [currentView, setCurrentViewState] = useState<TCalendarView>(
        settings.view,
    );
    const [use24HourFormat, setUse24HourFormatState] = useState<boolean>(
        settings.use24HourFormat,
    );
    const [agendaModeGroupBy, setAgendaModeGroupByState] = useState<
        "date" | "color"
    >(settings.agendaModeGroupBy);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedColors, setSelectedColors] = useState<TEventColor[]>([]);

    const [allEvents, setAllEvents] = useState<IEvent[]>(events || []);
    const [filteredEvents, setFilteredEvents] = useState<IEvent[]>(events || []);

    // 이벤트 props가 바뀌면 state 동기화
    useEffect(() => {
        setAllEvents(events);
        setFilteredEvents(events);
    }, [events]);

    const updateSettings = (newPartialSettings: Partial<CalendarSettings>) => {
        setSettings({
            ...settings,
            ...newPartialSettings,
        });
    };

    const setBadgeVariant = (variant: "dot" | "colored") => {
        setBadgeVariantState(variant);
        updateSettings({badgeVariant: variant});
    };

    const setView = (newView: TCalendarView) => {
        setCurrentViewState(newView);
        updateSettings({view: newView});
    };

    const toggleTimeFormat = () => {
        const newValue = !use24HourFormat;
        setUse24HourFormatState(newValue);
        updateSettings({use24HourFormat: newValue});
    };

    const setAgendaModeGroupBy = (groupBy: "date" | "color") => {
        setAgendaModeGroupByState(groupBy);
        updateSettings({agendaModeGroupBy: groupBy});
    };

    const filterEventsBySelectedColors = (color: TEventColor) => {
        const isColorSelected = selectedColors.includes(color);
        const newColors = isColorSelected
            ? selectedColors.filter((c) => c !== color)
            : [...selectedColors, color];

        if (newColors.length > 0) {
            const filtered = allEvents.filter((event) => {
                const eventColor = event.color || "blue";
                return newColors.includes(eventColor);
            });
            setFilteredEvents(filtered);
        } else {
            setFilteredEvents(allEvents);
        }

        setSelectedColors(newColors);
    };

    const handleSelectDate = (date: Date | undefined) => {
        if (!date) return;
        setSelectedDate(date);
    };

    // 일정 추가
    const addEvent = (event: IEvent) => {
        const insertScheduleInfo: InsertCalendarDTO = {
            title: event.title,
            description: event.description,
            color: event.color,
            recurrence: event.recurrence,
            recurrenceEnd: event.recurrenceEnd,
            startDate: event.startDate,
            endDate: event.endDate
        }
        scheduleApi.insertSchedule(insertScheduleInfo).then((resp: { data: number }) => {
            event.id = resp.data;
            setAllEvents((prev) => [...prev, event]);
            setFilteredEvents((prev) => [...prev, event]);
        });
    };

    // 일정 수정
    const updateEvent = (event: IEvent) => {
        const updated = {
            ...event,
            startDate: new Date(event.startDate).toISOString(),
            endDate: new Date(event.endDate).toISOString(),
        };

        const updateScheduleInfo: PatchCalendarDTO = {
            id: event.id,
            title: event.title,
            description: event.description,
            color: event.color,
            recurrenceId: event.recurrenceId,
            recurrence: event.recurrence,
            recurrenceEnd: event.recurrenceEnd,
            startDate: new Date(event.startDate).toISOString(),
            endDate: new Date(event.endDate).toISOString(),
        }

        scheduleApi.updateSchedule(updateScheduleInfo).then(() => {
            setAllEvents((prev) => prev.map((e) => (e.id === event.id ? updated : e)));
            setFilteredEvents((prev) =>
                prev.map((e) => (e.id === event.id ? updated : e)),
            );
        });
    };

    // 일정 삭제
    const removeEvent = (eventId: number) => {
        scheduleApi.deleteSchedule(eventId).then(() => {
            setAllEvents((prev) => prev.filter((e) => e.id !== eventId));
            setFilteredEvents((prev) => prev.filter((e) => e.id !== eventId));
        });
    };

    const clearFilter = () => {
        setFilteredEvents(allEvents);
        setSelectedColors([]);
    };

    const value = {
        selectedDate,
        setSelectedDate: handleSelectDate,
        badgeVariant,
        setBadgeVariant,
        selectedColors,
        filterEventsBySelectedColors,
        events: filteredEvents,
        view: currentView,
        use24HourFormat,
        toggleTimeFormat,
        setView,
        agendaModeGroupBy,
        setAgendaModeGroupBy,
        addEvent,
        updateEvent,
        removeEvent,
        clearFilter,
    };

    return (
        <CalendarContext.Provider value={value}>
            {children}
        </CalendarContext.Provider>
    );
}

export function useCalendar(): ICalendarContext {
    const context = useContext(CalendarContext);
    if (!context)
        throw new Error("useCalendar must be used within a CalendarProvider.");
    return context;
}
