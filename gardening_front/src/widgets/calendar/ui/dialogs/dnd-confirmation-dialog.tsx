import { useDragDrop } from "@/widgets/calendar/ui/contexts/dnd-context.tsx";
import { EventDropConfirmationDialog } from "./event-drop-confirmation-dialog.tsx";
import { memo } from "react";

const DndConfirmationDialog = memo(() => {
	const {
		showConfirmation,
		pendingDropData,
		handleConfirmDrop,
		handleCancelDrop,
	} = useDragDrop();

	if (!showConfirmation || !pendingDropData) return null;

	return (
		<EventDropConfirmationDialog
			open={showConfirmation}
			onOpenChange={() => {}} // Controlled by context
			event={pendingDropData.event}
			newStartDate={pendingDropData.newStartDate}
			newEndDate={pendingDropData.newEndDate}
			onConfirm={handleConfirmDrop}
			onCancel={handleCancelDrop}
		/>
	);
});

DndConfirmationDialog.displayName = "DndConfirmationDialog";

export { DndConfirmationDialog };
