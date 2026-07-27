import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface CardProps {
  children: ReactNode;
  className?: string;
  selected?: boolean;
}

export function Card({ children, className, selected }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[10px] border bg-white p-[11px] shadow-card transition-all duration-200",
        selected
          ? "border-brand shadow-[0_0_0_1px_#4e2fd2]"
          : "border-line",
        className,
      )}
    >
      {children}
    </div>
  );
}
