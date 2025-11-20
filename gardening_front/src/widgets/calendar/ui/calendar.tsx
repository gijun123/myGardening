import {CalendarBody} from "@/widgets/calendar/ui/calendar-body.tsx";
import {CalendarProvider} from "@/widgets/calendar/ui/contexts/calendar-context.tsx";
import {DndProvider} from "@/widgets/calendar/ui/contexts/dnd-context.tsx";
import {CalendarHeader} from "@/widgets/calendar/ui/header/calendar-header.tsx";
import {getEvents} from "@/widgets/calendar/ui/requests.ts";

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
