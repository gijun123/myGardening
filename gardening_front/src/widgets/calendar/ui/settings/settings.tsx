import {CheckIcon, DotIcon, PaletteIcon, SettingsIcon, XIcon,} from "lucide-react";
import {Button} from "@/shared/shadcn/components/ui/button.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/shared/shadcn/components/ui/dropdown-menu.tsx";
import {useCalendar} from "@/widgets/calendar/ui/contexts/calendar-context.tsx";
import {useDragDrop} from "@/widgets/calendar/ui/contexts/dnd-context.tsx";
import {IconSwitch} from "@/shared/shadcn/components/ui/icon-switch.tsx";
import {Clock12, Clock24} from "@/shared/ui/ClockIcon.tsx";

export function Settings() {
    const {
        badgeVariant,
        setBadgeVariant,
        use24HourFormat,
        toggleTimeFormat,
        agendaModeGroupBy,
        setAgendaModeGroupBy,
    } = useCalendar();
    const {showConfirmation, setShowConfirmation} = useDragDrop();

    const isDotVariant = badgeVariant === "dot";

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <SettingsIcon/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>일정 설정</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuGroup>
                    <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
                        일정 드래그&드롭 시 확인
                        <DropdownMenuShortcut>
                            <IconSwitch
                                icon={showConfirmation ? CheckIcon : XIcon}
                                checked={showConfirmation}
                                onCheckedChange={(checked) => setShowConfirmation(checked)}
                            />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
                        점으로 색상 표시
                        <DropdownMenuShortcut>
                            <IconSwitch
                                icon={isDotVariant ? DotIcon : PaletteIcon}
                                checked={isDotVariant}
                                onCheckedChange={(checked) =>
                                    setBadgeVariant(checked ? "dot" : "colored")
                                }
                            />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
                        24시로 표시
                        <DropdownMenuShortcut>
                            <IconSwitch
                                icon={use24HourFormat ? Clock24 : Clock12}
                                checked={use24HourFormat}
                                onCheckedChange={toggleTimeFormat}
                            />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator/>
                <DropdownMenuGroup>
                    <DropdownMenuLabel>일정 그룹 설정</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuRadioGroup
                        value={agendaModeGroupBy}
                        onValueChange={(value) =>
                            setAgendaModeGroupBy(value as "date" | "color")
                        }
                    >
                        <DropdownMenuRadioItem value="date" onSelect={(event) => event.preventDefault()}>날짜</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="color" onSelect={(event) => event.preventDefault()}>색상</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}