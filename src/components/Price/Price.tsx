import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/formatter";

interface PriceProps {
  price: number;
  compareAtPrice?: number;
  freeLabel?: string;
  suffix?: string;
  layout?: "card" | "review" | "total";
  className?: string;
}

export function Price({
  price,
  compareAtPrice,
  freeLabel = "FREE",
  suffix = "",
  layout = "card",
  className,
}: PriceProps) {
  if (layout === "total") {
    return (
      <div className={cn("flex items-baseline gap-2", className)}>
        {compareAtPrice != null && (
          <span className="font-gilroy text-lg leading-5 text-subtle line-through">
            {formatPrice(compareAtPrice)}
          </span>
        )}
        <span className="font-gilroy-bold text-2xl leading-8 tracking-[-0.00125em] text-brand">
          {formatPrice(price)}
        </span>
      </div>
    );
  }

  if (layout === "review") {
    return (
      <div
        className={cn(
          "flex shrink-0 flex-col items-end whitespace-nowrap",
          className,
        )}
      >
        {compareAtPrice != null && (
          <span className="font-gilroy text-xs leading-4 text-subtle line-through">
            {formatPrice(compareAtPrice)}
            {suffix}
          </span>
        )}
        <span className="font-gilroy-semibold text-xs leading-4 text-brand">
          {price === 0 ? freeLabel : `${formatPrice(price)}${suffix}`}
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-cols gap-1.5 items-end font-medium whitespace-nowrap",
        className,
      )}
    >
      {compareAtPrice != null && (
        <span className="font-gilroy-regular text-base leading-none tracking-[0.6px] text-sale line-through">
          {formatPrice(compareAtPrice)}
        </span>
      )}
      <span className="font-gilroy-regular text-base leading-none tracking-[0.6px] text-price">
        {price === 0 ? freeLabel : formatPrice(price)}
      </span>
    </div>
  );
}
