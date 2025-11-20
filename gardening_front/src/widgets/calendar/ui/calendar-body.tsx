"use client";

import { isSameDay, parseISO } from "date-fns";
import { motion } from "framer-motion";
import { fadeIn, transition } from "@/features/schedule/ui/calendar/animations.ts";
import { useCalendar } from "@/features/schedule/ui/calendar/contexts/calendar-context.tsx";
import { AgendaEvents } from "@/features/schedule/ui/calendar/views/agenda-view/agenda-events.tsx";
import { CalendarMonthView } from "@/features/schedule/ui/calendar/views/month-view/calendar-month-view.tsx";
import { CalendarDayView } from "@/features/schedule/ui/calendar/views/week-and-day-view/calendar-day-view.tsx";
import { CalendarWeekView } from "@/features/schedule/ui/calendar/views/week-and-day-view/calendar-week-view.tsx";
import { CalendarYearView } from "@/features/schedule/ui/calendar/views/year-view/calendar-year-view.tsx";

export function CalendarBody() {
	const { view, events } = useCalendar();

	const singleDayEvents = events.filter((event) => {
		const startDate = parseISO(event.startDate);
		const endDate = parseISO(event.endDate);
		return isSameDay(startDate, endDate);
	});

	const multiDayEvents = events.filter((event) => {
		const startDate = parseISO(event.startDate);
		const endDate = parseISO(event.endDate);
		return !isSameDay(startDate, endDate);
	});

	return (
		<div className="w-full h-full relative">
			<motion.div
				key={view}
				initial="initial"
				animate="animate"
				exit="exit"
				variants={fadeIn}
				transition={transition}
			>
				{view === "month" && (
					<CalendarMonthView
						singleDayEvents={singleDayEvents}
						multiDayEvents={multiDayEvents}
					/>
				)}
				{view === "week" && (
					<CalendarWeekView
						singleDayEvents={singleDayEvents}
						multiDayEvents={multiDayEvents}
					/>
				)}
				{view === "day" && (
					<CalendarDayView
						singleDayEvents={singleDayEvents}
						multiDayEvents={multiDayEvents}
					/>
				)}
				{view === "year" && (
					<CalendarYearView
						singleDayEvents={singleDayEvents}
						multiDayEvents={multiDayEvents}
					/>
				)}
				{view === "agenda" && (
					<motion.div
						key="agenda"
						initial="initial"
						animate="animate"
						exit="exit"
						variants={fadeIn}
						transition={transition}
					>
						<AgendaEvents />
					</motion.div>
				)}
			</motion.div>
		</div>
	);
}
