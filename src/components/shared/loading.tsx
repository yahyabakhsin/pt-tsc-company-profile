import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";

export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  fullscreen?: boolean;
}

export function Loading({ className, fullscreen = false, ...props }: LoadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center space-y-4",
        fullscreen ? "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" : "py-12 w-full",
        className
      )}
      {...props}
    >
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
      <span className="text-sm font-medium text-muted-foreground animate-pulse">
        Loading engineering assets...
      </span>
    </div>
  );
}
