import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface TypographyProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
}

export function Typography({
  as: Tag = "p",
  children,
  className,
}: TypographyProps) {
  return <Tag className={cn("font-gilroy text-ink", className)}>{children}</Tag>;
}
