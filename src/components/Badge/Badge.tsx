import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex h-[19px] items-center justify-center whitespace-nowrap rounded-[10px] bg-brand px-1.5 font-gilroy-semibold text-[11px] text-white",
        className,
      )}
    >
      {children}
    </span>
  );
}
