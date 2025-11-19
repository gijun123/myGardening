"use client";

import { motion } from "framer-motion";
import {
	Plus,
} from "lucide-react";

import { Button } from "@/shared/shadcn/components/ui/button.tsx";
import {
	slideFromLeft,
	slideFromRight,
	transition,
} from "@/widgets/calendar/ui/animations.ts";
import { useCalendar } from "@/widgets/calendar/ui/contexts/calendar-context.tsx";
import { AddEditEventDialog } from "@/widgets/calendar/ui/dialogs/add-edit-event-dialog.tsx";
import { DateNavigator } from "@/widgets/calendar/ui/header/date-navigator.tsx";
import FilterEvents from "@/widgets/calendar/ui/header/filter.tsx";
import { TodayButton } from "@/widgets/calendar/ui/header/today-button.tsx";
import { Settings } from "@/widgets/calendar/ui/settings/settings.tsx";
import Views from "./view-tabs.tsx";

export function CalendarHeader() {
	const { view, events } = useCalendar();

	return (
		<div className="flex flex-col gap-4 border-b p-4 lg:flex-row lg:items-center lg:justify-between">
			<motion.div
				className="flex items-center gap-3"
				variants={slideFromLeft}
				initial="initial"
				animate="animate"
				transition={transition}
			>
				<TodayButton />
				<DateNavigator view={view} events={events} />
			</motion.div>

			<motion.div
				className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-1.5"
				variants={slideFromRight}
				initial="initial"
				animate="animate"
				transition={transition}
			>
				<div className="options flex-wrap flex items-center gap-4 md:gap-2">
					<FilterEvents />
					<Views />
				</div>

				<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-1.5">
					<AddEditEventDialog>
						<Button>
							<Plus className="h-4 w-4" />
							일정 추가
						</Button>
					</AddEditEventDialog>
				</div>
				<Settings />
			</motion.div>
		</div>
	);
}
