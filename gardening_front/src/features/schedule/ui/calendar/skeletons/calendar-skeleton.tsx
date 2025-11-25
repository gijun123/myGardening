import { CalendarHeaderSkeleton } from "@/features/schedule/ui/calendar/skeletons/calendar-header-skeleton.tsx";
import { MonthViewSkeleton } from "@/features/schedule/ui/calendar/skeletons/month-view-skeleton.tsx";

export function CalendarSkeleton() {
	return (
		<div className="container mx-auto">
			<div className="flex h-screen flex-col">
				<CalendarHeaderSkeleton />
				<div className="flex-1">
					<MonthViewSkeleton />
				</div>
			</div>
		</div>
	);
}
