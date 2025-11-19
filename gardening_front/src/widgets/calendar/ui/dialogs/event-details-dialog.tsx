"use client";

import { format, parseISO } from "date-fns";
import { Calendar, Clock, Text, User } from "lucide-react";
import type { ReactNode } from "react";
import { toast } from "sonner";
import { Button } from "@/shared/shadcn/components/ui/button.tsx";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/shared/shadcn/components/ui/dialog.tsx";
import { ScrollArea } from "@/shared/shadcn/components/ui/scroll-area.tsx";
import { useCalendar } from "@/widgets/calendar/ui/contexts/calendar-context.tsx";
import { AddEditEventDialog } from "@/widgets/calendar/ui/dialogs/add-edit-event-dialog.tsx";
import { formatTime } from "@/widgets/calendar/ui/helpers.ts";
import type { IEvent } from "@/widgets/calendar/ui/interfaces.ts";
import {ko} from "date-fns/locale/ko";
import DeleteEventDialog from "@/widgets/calendar/ui/dialogs/delete-event-dialog.tsx";

interface IProps {
	event: IEvent;
	children: ReactNode;
}

export function EventDetailsDialog({ event, children }: IProps) {
	const startDate = parseISO(event.startDate);
	const endDate = parseISO(event.endDate);
	const { use24HourFormat, removeEvent } = useCalendar();

	const deleteEvent = (eventId: number) => {
		try {
			removeEvent(eventId);
			toast.success("Event deleted successfully.");
		} catch {
			toast.error("Error deleting event.");
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{event.title}</DialogTitle>
				</DialogHeader>

				<ScrollArea className="max-h-[80vh]">
					<div className="space-y-4 p-4">
						<div className="flex items-start gap-2">
							<Calendar className="mt-1 size-4 shrink-0 text-muted-foreground" />
							<div>
								<p className="text-sm font-medium">시작 날짜</p>
								<p className="text-sm text-muted-foreground">
									{format(startDate, "MMMM dd일(EEEE) ", {locale: ko})}
									{formatTime(parseISO(event.startDate), use24HourFormat)}
								</p>
							</div>
						</div>

						<div className="flex items-start gap-2">
							<Clock className="mt-1 size-4 shrink-0 text-muted-foreground" />
							<div>
								<p className="text-sm font-medium">종료 날짜</p>
								<p className="text-sm text-muted-foreground">
									{format(endDate, "MMMM dd일(EEEE) ", {locale: ko})}
									{formatTime(parseISO(event.endDate), use24HourFormat)}
								</p>
							</div>
						</div>

						<div className="flex items-start gap-2">
							<Text className="mt-1 size-4 shrink-0 text-muted-foreground" />
							<div>
								<p className="text-sm font-medium">내용</p>
								<p className="text-sm text-muted-foreground">
									{event.description}
								</p>
							</div>
						</div>
					</div>
				</ScrollArea>
				<div className="flex justify-end gap-2">
					<AddEditEventDialog event={event}>
						<Button variant="outline">수정</Button>
					</AddEditEventDialog>
                    <DeleteEventDialog eventId={event.id}/>
				</div>
				<DialogClose />
			</DialogContent>
		</Dialog>
	);
}
