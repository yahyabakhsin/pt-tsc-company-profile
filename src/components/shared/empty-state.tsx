import * as React from "react";
import { HardDrive } from "lucide-react";
import { cn } from "@/utils/cn";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

export function EmptyState({
  className,
  title = "No data found",
  description = "There are no records matching the selected parameters.",
  icon = <HardDrive className="h-10 w-10 text-muted-foreground/60" />,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center border border-dashed border-border rounded-lg bg-card/40 py-16",
        className
      )}
      {...props}
    >
      <div className="mb-4 flex items-center justify-center p-3 rounded-full bg-secondary">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="max-w-md text-sm text-muted-foreground mt-2">{description}</p>
    </div>
  );
}
