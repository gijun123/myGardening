import { zodResolver } from "@hookform/resolvers/zod";
import { addMinutes, format, set } from "date-fns";
import { type ReactNode, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/shared/shadcn/components/ui/button.tsx";
import { DateTimePicker } from "@/features/schedule/ui/calendar/dialogs/date-time-picker.tsx";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/shared/shadcn/components/ui/form.tsx";
import { Input } from "@/shared/shadcn/components/ui/input.tsx";
import {
	Modal,
	ModalClose,
	ModalContent,
	ModalDescription,
	ModalFooter,
	ModalHeader,
	ModalTitle,
	ModalTrigger,
} from "@/shared/shadcn/components/ui/responsive-modal.tsx";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/shared/shadcn/components/ui/select.tsx";
import { Textarea } from "@/shared/shadcn/components/ui/textarea.tsx";
import {COLORS, COLORS_KO} from "@/entities/schedule/calendar/constants.ts";
import { useCalendar } from "@/features/schedule/ui/calendar/contexts/calendar-context.tsx";
import { useDisclosure } from "@/entities/schedule/calendar/hooks.ts";
import type { IEvent } from "@/entities/schedule/calendar/interfaces.ts";
import {
	eventSchema,
	type TEventFormData,
} from "@/entities/schedule/calendar/schemas.ts";

interface IProps {
	children: ReactNode;
	startDate?: Date;
	startTime?: { hour: number; minute: number };
	event?: IEvent;
}

export function AddEditEventDialog({
	children,
	startDate,
	startTime,
	event,
}: IProps) {
	const { isOpen, onClose, onToggle } = useDisclosure();
	const { addEvent, updateEvent } = useCalendar();
	const isEditing = !!event;

	const initialDates = useMemo(() => {
		if (!isEditing && !event) {
			if (!startDate) {
				const now = new Date();
				return { startDate: now, endDate: addMinutes(now, 30) };
			}
			const start = startTime
				? set(new Date(startDate), {
						hours: startTime.hour,
						minutes: startTime.minute,
						seconds: 0,
					})
				: new Date(startDate);
			const end = addMinutes(start, 30);
			return { startDate: start, endDate: end };
		}

		return {
			startDate: new Date(event.startDate),
			endDate: new Date(event.endDate),
		};
	}, [startDate, startTime, event, isEditing]);

	const form = useForm<TEventFormData>({
		resolver: zodResolver(eventSchema),
		defaultValues: {
			title: event?.title ?? "",
			description: event?.description ?? "",
			startDate: initialDates.startDate,
			endDate: initialDates.endDate,
			color: event?.color ?? "blue",
		},
	});

	useEffect(() => {
		form.reset({
			title: event?.title ?? "",
			description: event?.description ?? "",
			startDate: initialDates.startDate,
			endDate: initialDates.endDate,
			color: event?.color ?? "blue",
		});
	}, [event, initialDates, form]);

	const onSubmit = (values: TEventFormData) => {
		try {
			const formattedEvent: IEvent = {
				...values,
				startDate: format(values.startDate, "yyyy-MM-dd'T'HH:mm:ss"),
				endDate: format(values.endDate, "yyyy-MM-dd'T'HH:mm:ss"),
                // eslint-disable-next-line react-hooks/purity
				id: isEditing ? event.id : Math.floor(Math.random() * 1000000),
				color: values.color,
			};

			if (isEditing) {
				updateEvent(formattedEvent);
				toast.success("일정이 수정되었습니다");
			} else {
				addEvent(formattedEvent);
				toast.success("일정이 추가되었습니다");
			}

			onClose();
			form.reset();
		} catch (error) {
			console.error(`Error ${isEditing ? "editing" : "adding"} event:`, error);
			toast.error(`Failed to ${isEditing ? "edit" : "add"} event`);
		}
	};

	return (
		<Modal open={isOpen} onOpenChange={onToggle} modal={true}>
			<ModalTrigger asChild>{children}</ModalTrigger>
			<ModalContent>
				<ModalHeader>
					<ModalTitle>{isEditing ? "일정 수정" : "일정 추가"}</ModalTitle>
					<ModalDescription>
						{isEditing
							? "수정할 정보를 변경하세요."
							: "달력에 일정을 추가하세요."}
					</ModalDescription>
				</ModalHeader>

				<Form {...form}>
					<form
						id="event-form"
						onSubmit={form.handleSubmit(onSubmit)}
						className="grid gap-4 py-4"
					>
						<FormField
							control={form.control}
							name="title"
							render={({ field, fieldState }) => (
								<FormItem>
									<FormLabel htmlFor="title" className="required">
										제목
									</FormLabel>
									<FormControl>
										<Input
											id="title"
											placeholder="제목 입력"
											{...field}
											className={fieldState.invalid ? "border-red-500" : ""}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="startDate"
							render={({ field }) => (
								<DateTimePicker form={form} field={field} />
							)}
						/>
						<FormField
							control={form.control}
							name="endDate"
							render={({ field }) => (
								<DateTimePicker form={form} field={field} />
							)}
						/>
						<FormField
							control={form.control}
							name="color"
							render={({ field, fieldState }) => (
								<FormItem>
									<FormLabel className="required">색상</FormLabel>
									<FormControl>
										<Select value={field.value} onValueChange={field.onChange}>
											<SelectTrigger
												className={`w-full ${
													fieldState.invalid ? "border-red-500" : ""
												}`}
											>
												<SelectValue placeholder="색상 선택" />
											</SelectTrigger>
											<SelectContent onPointerDown={(e) => e.stopPropagation()}>
												{COLORS.map((color) => (
													<SelectItem value={color} key={color}>
														<div className="flex items-center gap-2">
															<div
																className={`size-3.5 rounded-full bg-${color}-600 dark:bg-${color}-700`}
															/>
															{COLORS_KO[color]}
														</div>
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field, fieldState }) => (
								<FormItem>
									<FormLabel className="required">내용</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											placeholder="내용 입력"
											className={fieldState.invalid ? "border-red-500" : ""}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</form>
				</Form>
				<ModalFooter className="flex justify-end gap-2">
					<ModalClose asChild>
						<Button type="button" variant="outline">
							취소
						</Button>
					</ModalClose>
					<Button form="event-form" type="submit">
						{isEditing ? "수정" : "추가"}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
