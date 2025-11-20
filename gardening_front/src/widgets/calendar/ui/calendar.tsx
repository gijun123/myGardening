import {CalendarBody} from "@/widgets/calendar/ui/calendar-body.tsx";
import {CalendarProvider} from "@/features/schedule/ui/calendar/contexts/calendar-context.tsx";
import {DndProvider} from "@/features/schedule/ui/calendar/contexts/dnd-context.tsx";
import {CalendarHeader} from "@/features/schedule/ui/calendar/header/calendar-header.tsx";
import {getEvents} from "@/entities/schedule/calendar/requests.ts";

async function getCalendarData() {
    return {
        events: await getEvents()
    };
}

export async function Calendar() {
    const {events} = await getCalendarData();

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
