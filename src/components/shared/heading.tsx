import * as React from "react";
import { cn } from "@/utils/cn";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4;
  subtitle?: React.ReactNode;
  align?: "left" | "center" | "right";
  accent?: boolean;
}

export function Heading({
  className,
  level = 2,
  subtitle,
  align = "left",
  accent = false,
  children,
  ...props
}: HeadingProps) {
  const Tag = `h${level}` as const;

  const levelStyles = {
    1: "text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white",
    2: "text-3xl font-bold tracking-tight sm:text-4xl text-white",
    3: "text-2xl font-bold text-white",
    4: "text-xl font-semibold text-white",
  };

  const alignmentStyles = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  return (
    <div className={cn("flex flex-col space-y-2", alignmentStyles[align], className)}>
      <Tag
        className={cn(
          levelStyles[level],
          accent && "border-l-4 border-primary pl-4"
        )}
        {...props}
      >
        {children}
      </Tag>
      {subtitle && (
        <p className="max-w-2xl text-muted-foreground text-sm sm:text-base mt-1">
          {subtitle}
        </p>
      )}
    </div>
  );
}
export type HeaderProps = HeadingProps;
