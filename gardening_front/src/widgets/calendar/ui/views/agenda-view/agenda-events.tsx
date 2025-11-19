import {format, parseISO} from "date-fns";
import type {FC} from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/shared/shadcn/components/ui/avatar.tsx";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/shared/shadcn/components/ui/command.tsx";
import {cn} from "@/shared/shadcn/lib/utils.ts";
import {useCalendar} from "@/widgets/calendar/ui/contexts/calendar-context.tsx";
import {EventDetailsDialog} from "@/widgets/calendar/ui/dialogs/event-details-dialog.tsx";
import {
    formatTime,
    getBgColor,
    getColorClass, getEventsForMonth,
    getFirstLetters,
    toCapitalize,
} from "@/widgets/calendar/ui/helpers.ts";
import {EventBullet} from "@/widgets/calendar/ui/views/month-view/event-bullet.tsx";
import {COLORS_KO} from "@/widgets/calendar/ui/constants.ts";

export const AgendaEvents: FC = () => {
    const {events, use24HourFormat, badgeVariant, agendaModeGroupBy, selectedDate} =
        useCalendar();

    const monthEvents = getEventsForMonth(events, selectedDate)

    const agendaEvents = Object.groupBy(monthEvents, (event) => {
        return agendaModeGroupBy === "date"
            ? format(parseISO(event.startDate), "yyyy-MM-dd")
            : event.color;
    });

    const groupedAndSortedEvents = Object.entries(agendaEvents).sort(
        (a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime(),
    );

    return (
        <Command className="py-4 h-[80vh] bg-transparent">
            <div className="mb-4 mx-4">
                <CommandInput placeholder="검색할 제목 또는 내용을 입력하세요.."/>
            </div>
            <CommandList className="max-h-max px-3 border-t">
                {groupedAndSortedEvents.map(([date, groupedEvents]) => (
                    <CommandGroup
                        key={date}
                        heading={
                            agendaModeGroupBy === "date"
                                ? format(parseISO(date), "EEEE, MMMM d, yyyy")
                                : COLORS_KO[groupedEvents![0].color]
                        }
                    >
                        {groupedEvents!.map((event) => (
                            <CommandItem
                                key={event.id}
                                className={cn(
                                    "mb-2 p-4 border rounded-md data-[selected=true]:bg-bg transition-all data-[selected=true]:text-none hover:cursor-pointer",
                                    {
                                        [getColorClass(event.color)]: badgeVariant === "colored",
                                        "hover:bg-zinc-200 dark:hover:bg-gray-900":
                                            badgeVariant === "dot",
                                        "hover:opacity-60": badgeVariant === "colored",
                                    },
                                )}
                            >
                                <EventDetailsDialog event={event}>
                                    <div className="w-full flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-2">
                                            {badgeVariant === "dot" ? (
                                                <EventBullet color={event.color}/>
                                            ) : (
                                                <Avatar>
                                                    <AvatarImage src="" alt="@shadcn"/>
                                                    <AvatarFallback className={getBgColor(event.color)}>
                                                        {getFirstLetters(event.title)}
                                                    </AvatarFallback>
                                                </Avatar>
                                            )}
                                            <div className="flex flex-col">
                                                <p
                                                    className={cn({
                                                        "font-medium": badgeVariant === "dot",
                                                        "text-foreground": badgeVariant === "dot",
                                                    })}
                                                >
                                                    {event.title}
                                                </p>
                                                <p className="text-muted-foreground text-sm line-clamp-1 text-ellipsis md:text-clip w-1/3">
                                                    {event.description}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="w-40 flex justify-center items-center gap-1">
                                            {agendaModeGroupBy === "date" ? (
                                                <>
                                                    <p className="text-sm">
                                                        {formatTime(event.startDate, use24HourFormat)}
                                                    </p>
                                                    <span className="text-muted-foreground">-</span>
                                                    <p className="text-sm">
                                                        {formatTime(event.endDate, use24HourFormat)}
                                                    </p>
                                                </>
                                            ) : (
                                                <>
                                                    <p className="text-sm">
                                                        {format(event.startDate, "yyyy/MM/dd")}
                                                    </p>
                                                    <p className="text-sm">
                                                        {formatTime(event.startDate, use24HourFormat)} 부터
                                                    </p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </EventDetailsDialog>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                ))}
                <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
            </CommandList>
        </Command>
    );
};
