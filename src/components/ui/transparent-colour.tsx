import React from 'react';
import {cn} from "~/lib/utils";

export type TransparentColourProps = {} & React.HTMLAttributes<HTMLDivElement>;

export const TransparentColour = React.forwardRef<HTMLDivElement, TransparentColourProps>(
  ({className, ...props}, ref) => (
    <div
      ref={ref}
      className={cn("relative rounded-md h-6 w-6 cursor-pointer active:scale-105 border overflow-hidden", className)}
      {...props}
    >
      <div className={"absolute top-[-50%] bottom-[-50%] left-[43%] right-[43%] bg-red-400 rotate-45"}/>
    </div>
  )
);