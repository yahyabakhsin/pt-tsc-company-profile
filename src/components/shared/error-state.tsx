import * as React from "react";
import { AlertOctagon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";

export interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  error?: Error | string;
  reset?: () => void;
}

export function ErrorState({
  className,
  title = "An engineering fault occurred",
  error = "The system was unable to load these system parameters.",
  reset,
  ...props
}: ErrorStateProps) {
  const errorMessage = error instanceof Error ? error.message : error;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center border border-destructive/20 rounded-lg bg-destructive/5 py-16",
        className
      )}
      {...props}
    >
      <div className="mb-4 flex items-center justify-center p-3 rounded-full bg-destructive/10 text-destructive">
        <AlertOctagon className="h-10 w-10" />
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="max-w-md text-sm text-destructive/80 mt-2 font-mono bg-black/40 p-3 rounded border border-destructive/10">
        {errorMessage}
      </p>
      {reset && (
        <Button onClick={reset} variant="destructive" size="sm" className="mt-6">
          Re-initialize System
        </Button>
      )}
    </div>
  );
}
