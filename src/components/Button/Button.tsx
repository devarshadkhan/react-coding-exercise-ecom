import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "link";
  children?: ReactNode;
}

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center transition-all duration-200",
        variant === "primary" &&
          "w-full rounded-lg bg-brand py-4 font-gilroy-semibold text-base text-white hover:bg-brand-hover active:scale-[0.99]",
        variant === "outline" &&
          "rounded-[7px] border border-brand bg-transparent px-6 py-[5px] font-gilroy-semibold text-lg text-brand hover:bg-brand/[0.06]",
        variant === "link" &&
          "w-full bg-transparent text-center font-gilroy text-sm leading-4 underline transition-colors",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
