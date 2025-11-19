import { CheckIcon, Filter, RefreshCcw } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shared/shadcn/components/ui/dropdown-menu.tsx";
import { Separator } from "@/shared/shadcn/components/ui/separator.tsx";
import { Toggle } from "@/shared/shadcn/components/ui/toggle.tsx";
import { useCalendar } from "@/widgets/calendar/ui/contexts/calendar-context.tsx";
import {COLORS, COLORS_KO} from "@/widgets/calendar/ui/constants.ts";

export default function FilterEvents() {
	const { selectedColors, filterEventsBySelectedColors, clearFilter } =
		useCalendar();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Toggle variant="outline" className="cursor-pointer w-fit">
					<Filter className="h-4 w-4" />
				</Toggle>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-[150px]">
                <DropdownMenuLabel>색상 별 일정 보기</DropdownMenuLabel>
                <DropdownMenuSeparator />
				{COLORS.map((color, index) => (
					<DropdownMenuItem
						key={index}
						className="flex items-center gap-2 cursor-pointer"
						onClick={(e) => {
							e.preventDefault();
							filterEventsBySelectedColors(color);
						}}
					>
						<div
							className={`size-3.5 rounded-full bg-${color}-600 dark:bg-${color}-700`}
						/>
						<span className="capitalize flex justify-center items-center gap-2">
							{COLORS_KO[color]}
							<span>
								{selectedColors.includes(color) && (
									<span className="text-blue-500">
										<CheckIcon className="size-4" />
									</span>
								)}
							</span>
						</span>
					</DropdownMenuItem>
				))}
				<Separator className="my-2" />
				<DropdownMenuItem
					disabled={selectedColors.length === 0}
					className="flex gap-2 cursor-pointer"
					onClick={(e) => {
						e.preventDefault();
						clearFilter();
					}}
				>
					<RefreshCcw className="size-3.5" />
					필터 초기화
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
