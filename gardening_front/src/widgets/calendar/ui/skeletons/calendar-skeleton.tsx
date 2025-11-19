import { CalendarHeaderSkeleton } from "@/widgets/calendar/ui/skeletons/calendar-header-skeleton.tsx";
import { MonthViewSkeleton } from "@/widgets/calendar/ui/skeletons/month-view-skeleton.tsx";

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
