import {toast} from "sonner";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/shared/shadcn/components/ui/alert-dialog.tsx";
import {Button, buttonVariants} from "@/shared/shadcn/components/ui/button.tsx";
import {useCalendar} from "@/widgets/calendar/ui/contexts/calendar-context.tsx";

interface DeleteEventDialogProps {
    eventId: number;
}

export default function DeleteEventDialog({eventId}: DeleteEventDialogProps) {
    const {removeEvent} = useCalendar();

    const deleteEvent = () => {
        try {
            removeEvent(eventId);
            toast.success("Event deleted successfully.");
        } catch {
            toast.error("Error deleting event.");
        }
    };

    if (!eventId) {
        return null;
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive">
                    삭제
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>정말 삭제하시겠습니까?</AlertDialogTitle>
                    <AlertDialogDescription>
                        이 작업은 되돌릴 수 없습니다. 해당 이벤트가 영구적으로 삭제되며,
                        관련된 모든 데이터가 서버에서 제거됩니다.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>취소</AlertDialogCancel>
                    <AlertDialogAction className={buttonVariants({ variant: "destructive" })} onClick={deleteEvent}>
                        삭제
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
