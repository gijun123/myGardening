import {format} from "date-fns";
import type {ReactNode} from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalTitle,
    ModalTrigger,
} from "@/shared/shadcn/components/ui/responsive-modal.tsx";
import {cn} from "@/shared/shadcn/lib/utils.ts";
import {useCalendar} from "@/features/schedule/ui/calendar/contexts/calendar-context.tsx";
import {formatTime} from "@/features/schedule/ui/calendar/helpers.ts";
import type {IEvent} from "@/entities/schedule/calendar/interfaces.ts";
import {dayCellVariants} from "@/features/schedule/ui/calendar/views/month-view/day-cell.tsx";
import {EventBullet} from "@/features/schedule/ui/calendar/views/month-view/event-bullet.tsx";
import {EventDetailsDialog} from "@/features/schedule/ui/calendar/dialogs/event-details-dialog.tsx";
import {ko} from "date-fns/locale/ko";

interface EventListDialogProps {
    date: Date;
    events: IEvent[];
    maxVisibleEvents?: number;
    children?: ReactNode;
}

export function EventListDialog({
                                    date,
                                    events,
                                    maxVisibleEvents = 3,
                                    children,
                                }: EventListDialogProps) {
    const cellEvents = events;
    const hiddenEventsCount = Math.max(cellEvents.length - maxVisibleEvents, 0);
    const {badgeVariant, use24HourFormat} = useCalendar();

    const defaultTrigger = (
        <span className="cursor-pointer">
			<span className="sm:hidden">+{hiddenEventsCount}</span>
			<span className="hidden sm:inline py-0.5 px-2 my-1 rounded-xl border">
				{hiddenEventsCount}개 더보기...
			</span>
		</span>
    );

    return (
        <Modal>
            <ModalTrigger asChild>{children || defaultTrigger}</ModalTrigger>
            <ModalContent className="sm:max-w-[425px]">
                <ModalHeader>
                    <ModalTitle className="my-2">
                        <div className="flex items-center gap-2">
                            <EventBullet color={cellEvents[0]?.color} className=""/>
                            <p className="text-sm font-medium">
                                {format(date, "yyyy/MM/d(EEEE) ", {locale:ko})}일정
                            </p>
                        </div>
                    </ModalTitle>
                </ModalHeader>
                <div className="max-h-[60vh] overflow-y-auto space-y-2">
                    {cellEvents.length > 0 ? (
                        cellEvents.map((event) => (
                            <EventDetailsDialog event={event} key={event.id}>
                                <div
                                    className={cn(
                                        "flex items-center gap-2 p-2 border rounded-md hover:bg-muted cursor-pointer",
                                        {
                                            [dayCellVariants({color: event.color})]:
                                                badgeVariant === "colored",
                                        },
                                    )}
                                >
                                        <EventBullet color={event.color}/>
                                        <div className="flex justify-between items-center w-full">
                                            <p className="text-sm font-medium">{event.title}</p>
                                            <p className="text-xs">
                                                {formatTime(event.startDate, use24HourFormat) + " 시작"}
                                            </p>
                                        </div>
                                </div>
                            </EventDetailsDialog>
                        ))
                    ) : (
                        <p className="text-sm text-muted-foreground">
                            선택한 날짜에 일정이 없습니다.
                        </p>
                    )}
                </div>
            </ModalContent>
        </Modal>
    );
}
