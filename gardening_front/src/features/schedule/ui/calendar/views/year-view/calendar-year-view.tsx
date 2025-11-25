import {getYear, isSameDay, isSameMonth} from "date-fns";
import {motion} from "framer-motion";
import {cn} from "@/shared/shadcn/lib/utils.ts";
import {staggerContainer, transition,} from "@/features/schedule/ui/calendar/animations.ts";
import {useCalendar} from "@/features/schedule/model/calendar-context.tsx";
import {EventListDialog} from "@/features/schedule/ui/calendar/dialogs/events-list-dialog.tsx";
import {getCalendarCells} from "@/features/schedule/lib/helpers.ts";
import type {IEvent} from "@/entities/schedule/calendar/interfaces.ts";
import {EventBullet} from "@/features/schedule/ui/calendar/views/month-view/event-bullet.tsx";

interface IProps {
    singleDayEvents: IEvent[];
    multiDayEvents: IEvent[];
}

const MONTHS = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
];

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

export function CalendarYearView({singleDayEvents, multiDayEvents}: IProps) {
    const {selectedDate, setSelectedDate, setView} = useCalendar();
    const currentYear = getYear(selectedDate);
    const allEvents = [...multiDayEvents, ...singleDayEvents];

    return (
        <div className="flex flex-col h-full  overflow-y-auto p-4  sm:p-6">
            {/* Year grid */}
            <motion.div
                initial="initial"
                animate="animate"
                variants={staggerContainer}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-fr"
            >
                {MONTHS.map((month, monthIndex) => {
                    const monthDate = new Date(currentYear, monthIndex, 1);
                    const cells = getCalendarCells(monthDate);

                    return (
                        <motion.div
                            key={month}
                            className="flex flex-col border border-border rounded-lg shadow-sm overflow-hidden"
                            initial={{opacity: 0, scale: 0.95}}
                            animate={{opacity: 1, scale: 1}}
                            transition={{delay: monthIndex * 0.05, ...transition}}
                            role="region"
                            aria-label={`${month} ${currentYear} calendar`}
                        >
                            {/* Month header */}
                            <div
                                className="px-3 py-2 text-center font-semibold text-sm sm:text-base cursor-pointer transition-colors hover:bg-primary/20"
                                onClick={() => {
                                    setSelectedDate(new Date(currentYear, monthIndex, 1));
                                    setView("month");
                                }}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        setSelectedDate(new Date(currentYear, monthIndex, 1));
                                    }
                                }}
                                aria-label={`Select ${month}`}
                            >
                                {month}
                            </div>

                            <div
                                className="grid grid-cols-7 text-center text-xs font-medium text-muted-foreground py-2">
                                {WEEKDAYS.map((day) => (
                                    <div key={day}
                                         className={cn(
                                             "p-1",
                                             day === "토" && "text-blue-700",
                                             day === "일" && "text-destructive"
                                         )}
                                    >
                                        {day}
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-7 gap-0.5 p-1.5 flex-grow text-xs">
                                {cells.map((cell) => {
                                    const isCurrentMonth = isSameMonth(cell.date, monthDate);
                                    const isToday = isSameDay(cell.date, new Date());
                                    const dayEvents = allEvents.filter((event) =>
                                        isSameDay(new Date(event.startDate), cell.date),
                                    );
                                    const hasEvents = dayEvents.length > 0;

                                    return (
                                        <div
                                            key={cell.date.toISOString()}
                                            className={cn(
                                                "flex flex-col items-center justify-start p-1 min-h-[2rem] relative",
                                                !isCurrentMonth && "text-muted-foreground/40",
                                                hasEvents && isCurrentMonth
                                                    ? "cursor-pointer hover:bg-accent/20 hover:rounded-md"
                                                    : "cursor-default",
                                            )}
                                        >
                                            {isCurrentMonth && hasEvents ? (
                                                <EventListDialog date={cell.date} events={dayEvents}>
                                                    <div
                                                        className="w-full h-full flex flex-col items-center justify-start gap-0.5">
														<span
                                                            className={cn(
                                                                "size-5 flex items-center justify-center font-medium",
                                                                isToday &&
                                                                "rounded-full bg-primary text-primary-foreground",
                                                                cell.date.getDay() === 0 && "text-destructive", // 일요일
                                                                cell.date.getDay() === 6 && "text-blue-700" // 토요일
                                                            )}
                                                        >
															{cell.day}
														</span>
                                                        <div className="flex justify-center items-center gap-0.5">
                                                            {dayEvents.length <= 2 ? (
                                                                dayEvents
                                                                    .slice(0, 2)
                                                                    .map((event) => (
                                                                        <EventBullet
                                                                            key={event.id}
                                                                            color={event.color}
                                                                            className="size-1.5"
                                                                        />
                                                                    ))
                                                            ) : (
                                                                <div
                                                                    className="flex flex-col justify-center items-center">
                                                                    <EventBullet
                                                                        color={dayEvents[0].color}
                                                                        className="size-1.5"
                                                                    />
                                                                    <span className="text-[0.6rem]">
																		+{dayEvents.length - 1}
																	</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </EventListDialog>
                                            ) : (
                                                <div className="w-full h-full flex flex-col items-center justify-start">
													<span
                                                        className={cn(
                                                            "size-5 flex items-center justify-center font-medium",
                                                            // 일요일
                                                            cell.date.getDay() === 0 &&
                                                            cn(
                                                                "text-destructive",
                                                                !isCurrentMonth && "opacity-40" // 이번달 아닌 경우만 흐리게
                                                            ),
                                                            // 토요일
                                                            cell.date.getDay() === 6 &&
                                                            cn(
                                                                "text-blue-700",
                                                                !isCurrentMonth && "opacity-40" // 이번달 아닌 경우만 흐리게
                                                            )
                                                        )}
                                                    >
														{cell.day}
													</span>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
}
