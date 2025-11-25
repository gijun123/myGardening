import { z } from "zod";

export const eventSchema = z.object({
	title: z.string().min(1, "제목을 입력하세요"),
	description: z.string().min(1, "내용을 입력하세요"),
	startDate: z.date({
		required_error: "시작 날짜를 입력하세요",
	}),
	endDate: z.date({
		required_error: "종료 날짜를 입력하세요",
	}),
	color: z.enum(["blue", "green", "red", "yellow", "purple", "orange"], {
		required_error: "색상을 지정하세요",
	}),
});

export type TEventFormData = z.infer<typeof eventSchema>;
