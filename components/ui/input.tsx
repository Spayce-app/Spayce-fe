import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  noRing?: boolean 
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, noRing, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full rounded-lg border border-muted-foreground/25 bg-background px-3 py-2 text-sm placeholder:text-muted-foreground transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 focus:border-primary/60",
          noRing
            ? "focus:outline-none focus:ring-0" 
            : "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export { Input }
