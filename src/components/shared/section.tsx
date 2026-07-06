import * as React from "react";
import { cn } from "@/utils/cn";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  gridBg?: boolean;
}

export function Section({ className, gridBg = false, ...props }: SectionProps) {
  return (
    <section
      className={cn(
        "py-16 sm:py-24 relative overflow-hidden",
        gridBg && "industrial-grid",
        className
      )}
      {...props}
    />
  );
}
