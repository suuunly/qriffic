import React from "react";
import { cn } from "~/lib/utils";

export type TransparentColourProps = object &
  React.HTMLAttributes<HTMLDivElement>;

export const TransparentColour = React.forwardRef<
  HTMLDivElement,
  TransparentColourProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative h-6 w-6 cursor-pointer overflow-hidden rounded-md border active:scale-105",
      className,
    )}
    {...props}
  >
    <div
      className={
        "absolute bottom-[-50%] left-[43%] right-[43%] top-[-50%] rotate-45 bg-red-400"
      }
    />
  </div>
));

TransparentColour.displayName = "TransparentColour";
