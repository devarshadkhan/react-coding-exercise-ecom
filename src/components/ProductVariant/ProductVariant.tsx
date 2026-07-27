"use client";

import type { Variant } from "@/types";
import { getVariantImage } from "@/data/variantImages";
import { cn } from "@/lib/cn";

interface ProductVariantProps {
  productId: string;
  variants: Variant[];
  activeVariantId: string;
  onChange: (variantId: string) => void;
}

export function ProductVariant({
  productId,
  variants,
  activeVariantId,
  onChange,
}: ProductVariantProps) {
  return (
    <div className="flex flex-nowrap gap-2 overflow-x-auto">
      {variants.map((variant) => {
        const img = getVariantImage(productId, variant.variantId);
        const active = variant.variantId === activeVariantId;

        return (
          <button
            key={variant.variantId}
            type="button"
            onClick={() => onChange(variant.variantId)}
            className={cn(
              "inline-flex h-[26px] shrink-0 items-center justify-center gap-0.5 rounded-[2px] border-[0.5px] font-gilroy text-xs transition-all duration-150",
              active
                ? "w-[65px] border-savings bg-[rgba(29,240,187,0.04)] px-[3px] text-brand"
                : "w-[63px] border-chip bg-white px-[5px] text-subtle hover:border-subtle",
            )}
          >
            {img ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={img}
                alt={variant.label}
                className="size-[18px] shrink-0 rounded-[2px] object-cover"
              />
            ) : (
              <span
                className="size-[18px] shrink-0 rounded-[3px] border border-black/10"
                style={{ backgroundColor: variant.swatchColor }}
              />
            )}
            <span className="font-medium">{variant.label}</span>
          </button>
        );
      })}
    </div>
  );
}
