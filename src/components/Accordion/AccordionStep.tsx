/**
 * Single expand/collapse section of the security-system builder's 4-step wizard.
 * Height animates via grid-template-rows (0fr → 1fr) instead of max-height, so it
 * doesn't need a hardcoded cap and settles at the content's real height.
 */

"use client";

import type { ReactNode } from "react";
import { ChevronUp } from "@/components/Icons";
import { Button } from "@/components/Button/Button";
import { cn } from "@/lib/cn";

interface AccordionStepProps {
  step: number;
  totalSteps?: number;
  title: string;
  icon: ReactNode;
  isOpen: boolean;
  selectedCount: number;
  onToggle: () => void;
  nextLabel?: string;
  onNext?: () => void;
  showNext?: boolean;
  children: ReactNode;
}

export function AccordionStep({
  step,
  totalSteps = 4,
  title,
  icon,
  isOpen,
  selectedCount,
  onToggle,
  nextLabel,
  onNext,
  showNext,
  children,
}: AccordionStepProps) {
  return (
    <section
      className={cn(
        "bg-transparent transition-colors duration-200",
        isOpen &&
          "mb-3 overflow-hidden rounded-[10px] border border-surface-border bg-surface",
      )}
    >
      <p
        className={cn(
          "font-gilroy text-[10px] uppercase leading-none mb-2 tracking-[1.6px] text-muted",
          isOpen ? "px-[15px] pt-2" : "px-2 pt-4",
        )}
      >
        Step {step} of {totalSteps}
      </p>

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={cn(
          "flex w-full items-center justify-between gap-3 border-0 bg-transparent text-left transition-colors",
          isOpen
            ? "px-[15px] pb-2 pt-5"
            : "border-y border-[rgba(31,31,31,0.5)] px-[15px] py-5 hover:bg-black/[0.01]",
        )}
      >
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex shrink-0 items-center justify-center">
            {icon}
          </span>
          <span className="font-gilroy-semibold text-lg leading-none text-ink">
            {title}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          {isOpen && selectedCount > 0 && (
            <span className="whitespace-nowrap font-gilroy text-sm leading-4 text-brand">
              {selectedCount} selected
            </span>
          )}
          <span
            className={cn(
              "flex transition-transform duration-200",
              !isOpen && "rotate-180",
            )}
          >
            <ChevronUp />
          </span>
        </div>
      </button>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          {isOpen && (
            <div className="flex flex-col gap-3.5 px-4 pb-5 pt-1 lg:px-[22px]">
              {children}
              {showNext && nextLabel && onNext && (
                <div className="flex justify-center pt-1">
                  <Button
                    variant="outline"
                    onClick={onNext}
                    className="max-md:w-full max-md:text-base border border-brand text-brand hover:bg-brand border-solid  hover:text-white"
                  >
                    Next: {nextLabel}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
