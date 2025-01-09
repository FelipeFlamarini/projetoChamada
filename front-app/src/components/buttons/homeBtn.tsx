import React from "react";
import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const ButtonHome = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn("w-full h-[109px] bg-btnHome hover:bg-btnHome/80 rounded-2xl border border-black",className)}
        ref={ref}
        {...props}
      />
    );
  }
);
ButtonHome.displayName = "ButtonHome";

export { ButtonHome };
