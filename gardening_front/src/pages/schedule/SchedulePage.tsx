import {Suspense} from "react";
import {CalendarSkeleton} from "@/widgets/calendar/ui/skeletons/calendar-skeleton.tsx";
import {Calendar} from "@/widgets/calendar/ui/calendar.tsx";

export default function SchedulePage() {
    return (
        <main className="mx-auto h-full w-full max-w-6xl px-4 py-6">
            <Suspense fallback={<CalendarSkeleton/>}>
                <Calendar/>
            </Suspense>
        </main>
    );
}