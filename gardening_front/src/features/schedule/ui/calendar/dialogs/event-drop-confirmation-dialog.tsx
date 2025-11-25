"use client";

import {format} from "date-fns";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/shared/shadcn/components/ui/alert-dialog.tsx";
import type {IEvent} from "@/entities/schedule/calendar/interfaces.ts";
import {formatTime, getColorClass} from "@/features/schedule/lib/helpers.ts";
import {cn} from "@/shared/shadcn/lib/utils.ts";
import {useCalendar} from "@/features/schedule/model/calendar-context.tsx";
import {ko} from "date-fns/locale/ko";

interface EventDropConfirmationDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    event: IEvent | null;
    newStartDate: Date | null;
    newEndDate: Date | null;
    onConfirm: () => void;
    onCancel: () => void;
}

export function EventDropConfirmationDialog({
                                                open,
                                                onOpenChange,
                                                event,
                                                newStartDate,
                                                newEndDate,
                                                onConfirm,
                                                onCancel,
                                            }: EventDropConfirmationDialogProps) {

    const {use24HourFormat} = useCalendar();

    if (!event || !newStartDate || !newEndDate) {
        return null;
    }

    const originalStart = new Date(event.startDate);

    const formatDate = (date: Date) => {
        return format(date, "yyyy년 MMM dd일, ", {locale:ko}) + formatTime(date, use24HourFormat);
    };

    const handleConfirm = () => {
        onConfirm();
        onOpenChange(false);
    };

    const handleCancel = () => {
        onCancel();
        onOpenChange(false);
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>이 일정을 이동하시겠습니까?</AlertDialogTitle>
                    <AlertDialogDescription>
                        <span className={cn(getColorClass(event.color), "mx-1 py-0.5 px-1 rounded-md font-semibold")}>
							{event.title}
                        </span>일정을 <br/>
                        <strong className="mx-1">{formatDate(originalStart)}</strong>에서<br/>
                        <strong className="mx-1">{formatDate(newStartDate)}</strong>로 이동하시겠습니까?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleCancel}>취소</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm}>확인</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
