"use client";

import { SecuritySystemBuilder } from "@/features/security-system-builder/components/SecuritySystemBuilder";
import { ReviewPanel } from "@/components/ReviewPanel/ReviewPanel";

export function AppShell() {
  return (
    <main className="min-h-screen bg-white">
      <div className="flex flex-col items-center px-4 pt-7 md:hidden">
        <div
          role="status"
          className="relative mb-3 inline-flex items-center justify-center rounded-lg bg-tooltip px-4 py-2 font-gilroy-semibold text-sm text-ink-dark shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
        >
          Let&apos;s get started!
          <span
            aria-hidden
            className="absolute bottom-[-7px] left-1/2 size-3.5 -translate-x-1/2 rotate-45 rounded-sm bg-tooltip"
          />
        </div>
        <h1 className="mb-2 text-center font-gilroy-bold text-[28px] leading-[1.1] tracking-[-0.04em] text-ink-dark md:text-[31.875px]">
          Build Your Own
        </h1>
      </div>

      <div
        className={[
          "mx-auto flex w-full flex-col gap-5 px-3 pb-8 pt-4",
          "md:max-w-[960px] md:gap-5 md:px-5 md:py-8",
          /* Frame 1735 — builder 768 + review 399, gap 29 */
          "lg:max-w-[1216px] lg:flex-row lg:items-start lg:justify-center lg:gap-[29px] lg:px-5 lg:py-12",
          /* Frame 1736 — stacked full width */
          "xl:max-w-[1360px] xl:flex-col xl:items-stretch xl:gap-7 xl:px-10 xl:pb-[72px] xl:pt-12",
        ].join(" ")}
      >
        <div className="min-w-0 w-full lg:w-[768px] lg:shrink-0 xl:w-full">
          <SecuritySystemBuilder />
        </div>
        <div className="w-full lg:w-[399px] lg:shrink-0 xl:w-full">
          <ReviewPanel />
        </div>
      </div>
    </main>
  );
}
