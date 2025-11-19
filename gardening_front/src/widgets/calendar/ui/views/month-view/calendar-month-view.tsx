import {motion} from "framer-motion";
import {useMemo} from "react";
import {staggerContainer, transition,} from "@/widgets/calendar/ui/animations.ts";
import {useCalendar} from "@/widgets/calendar/ui/contexts/calendar-context.tsx";

import {calculateMonthEventPositions, getCalendarCells,} from "@/widgets/calendar/ui/helpers.ts";

import type {IEvent} from "@/widgets/calendar/ui/interfaces.ts";
import {DayCell} from "@/widgets/calendar/ui/views/month-view/day-cell.tsx";

interface IProps {
    singleDayEvents: IEvent[];
    multiDayEvents: IEvent[];
}

const WEEK_DAYS = ["일", "월", "화", "수", "목", "금", "토"];

export function CalendarMonthView({singleDayEvents, multiDayEvents}: IProps) {
    const {selectedDate} = useCalendar();

    const allEvents = [...multiDayEvents, ...singleDayEvents];

    const cells = useMemo(() => getCalendarCells(selectedDate), [selectedDate]);

    const eventPositions = useMemo(
        () =>
            calculateMonthEventPositions(
                multiDayEvents,
                singleDayEvents,
                cells.map((c) => c.date),
            ),
        [multiDayEvents, singleDayEvents, selectedDate],
    );

    return (
        <motion.div initial="initial" animate="animate" variants={staggerContainer}>
            <div className="grid grid-cols-7">
                {WEEK_DAYS.map((day, index) => (
                    <motion.div
                        key={day}
                        className="flex items-center justify-center py-2"
                        initial={{opacity: 0, y: -10}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: index * 0.05, ...transition}}
                    >
						<span className={day === "토" || day === "일" ?
                            day === "토" ?
                                "text-xs font-medium text-t-quaternary text-blue-700" :
                                "text-xs font-medium text-t-quaternary text-destructive" :
                            "text-xs font-medium text-t-quaternary"}>
                            {day}
                        </span>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-7 overflow-hidden">
                {cells.map((cell, index) => (
                    <DayCell
                        key={index}
                        cell={cell}
                        events={allEvents}
                        eventPositions={eventPositions}
                    />
                ))}
            </div>
        </motion.div>
    );
}
