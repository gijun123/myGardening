import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cn } from "@/shared/shadcn/lib/utils"

interface IconSwitchBaseProps
    extends React.ComponentProps<typeof SwitchPrimitive.Root> {
    icon?: React.ReactNode | React.ElementType
}

export function IconSwitch({
                               className,
                               icon: Icon,
                               ...props
                           }: IconSwitchBaseProps) {
    return (
        <SwitchPrimitive.Root
            {...props}
            className={cn(
                "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
        >
            <SwitchPrimitive.Thumb
                className={cn(
                    "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none relative block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0 flex items-center justify-center"
                )}
            >
                {Icon && <Icon className="h-2 w-2 scale-[0.7]" />}
            </SwitchPrimitive.Thumb>
        </SwitchPrimitive.Root>
    )
}
