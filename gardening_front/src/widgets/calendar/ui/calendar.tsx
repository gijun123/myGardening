import {CalendarBody} from "@/widgets/calendar/ui/calendar-body.tsx";
import {CalendarProvider} from "@/features/schedule/model/calendar-context.tsx";
import {DndProvider} from "@/features/schedule/model/dnd-context.tsx";
import {CalendarHeader} from "@/features/schedule/ui/calendar/header/calendar-header.tsx";
import {getEvents} from "@/entities/schedule/calendar/requests.ts";
import {useEffect, useState} from "react";
import type {IEvent} from "@/entities/schedule/calendar/interfaces.ts";

export function Calendar() {
    const [events, setEvents] = useState<IEvent[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const data = await getEvents();
            setEvents(data);
        };
        fetchEvents();
    }, [])

    return (
        <CalendarProvider events={events} view="month">
            <DndProvider showConfirmation={true}>
                <div className="w-full border rounded-xl">
                    <CalendarHeader/>
                    <CalendarBody/>
                </div>
            </DndProvider>
        </CalendarProvider>
    );
}
