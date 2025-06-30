import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/app/lib/utils"


const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // default: "bg-primary text-primary-foreground hover:bg-primary/90",

        default:"bg-[#39507f] duration-150 text-[#ffffffcc] hover:bg-[#071f50dd] hover:text-white active:opacity-70",
        destructive:"bg-destructive duration-150 text-destructive-foreground hover:bg-destructive/90 active:opacity-70",
        outline:"border border-input duration-150 bg-background hover:bg-accent hover:text-accent-foreground active:opacity-80",
        // secondary:"bg-secondary duration-150 text-secondary-foreground hover:bg-secondary/80 active:opacity-70",
        
        secondary:"bg-[#ffffff99] duration-150 text-[#020b1daa] border border-[#39507f2f] hover:border-[#39507f2a] hover:bg-[#ffffff] hover:text-[#020b1d] active:opacity-70",
        ghost: "hover:bg-accent duration-150 hover:text-accent-foreground active:opacity-70",
        link: "text-primary duration-150 underline-offset-4 hover:underline active:opacity-70",
      },
      size: {
        sm: "h-9 rounded-md px-3 text-[13px]",
        default: "h-10 px-4 py-2 text-sm",
        lg: "h-11 rounded-md px-4 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

