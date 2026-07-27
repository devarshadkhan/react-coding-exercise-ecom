"use client";

import type { Category, Product } from "@/types";
import productsData from "@/data/products.json";
import { useSecuritySystem } from "@/hooks/useSecuritySystem";
import {
  SHIPPING_COMPARE,
  buildLineItems,
  computeTotals,
} from "@/lib/calculations";
import { formatMonthly, formatPrice } from "@/lib/formatter";
import { ReviewItem } from "@/components/ReviewItem/ReviewItem";
import { PlanShieldIcon, ShippingIcon } from "@/components/Icons";
import { Price } from "@/components/Price/Price";
import { Button } from "@/components/Button/Button";
import { cn } from "@/lib/cn";

const products = productsData as Product[];

const categoryLabel: Record<Exclude<Category, "plan">, string> = {
  cameras: "Cameras",
  sensors: "Sensors",
  accessories: "Accessories",
};

const categoryOrder: Array<Exclude<Category, "plan">> = [
  "cameras",
  "sensors",
  "accessories",
];

export function ReviewPanel() {
  const { state, savedMessage, handleSaveForLater } = useSecuritySystem();

  const lineItems = buildLineItems(state.quantities, products);
  const hardwareItems = lineItems.filter((i) => i.product.category !== "plan");
  const planProduct =
    lineItems.find((i) => i.product.category === "plan")?.product ||
    products.find((p) => p.productId === "cam-unlimited")!;

  const grouped = hardwareItems.reduce((map, item) => {
    const cat = item.product.category as Exclude<Category, "plan">;
    if (!map.has(cat)) map.set(cat, []);
    map.get(cat)!.push(item);
    return map;
  }, new Map<Exclude<Category, "plan">, typeof hardwareItems>());

  const { compareTotal, activeTotal, savings, monthly } =
    computeTotals(lineItems);

  return (
    <aside
      className={cn(
        "rounded-[10px] bg-surface p-4",
        "lg:sticky lg:top-5 lg:p-5",
        "xl:static xl:px-8 xl:py-7",
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-5",
          "xl:flex-row xl:items-start xl:justify-between xl:gap-14",
        )}
      >
        {/* Line items column */}
        <div className="min-w-0 w-full xl:max-w-[720px] xl:flex-1">
          <p className="mb-2 font-gilroy text-xs uppercase leading-none tracking-[1.6px] text-muted">
            Review
          </p>
          <h2 className="mb-1 pt-2 font-gilroy-semibold text-[22px] leading-none tracking-[0.6px] text-ink-dark">
            Your security system
          </h2>
          <p className="mb-4 max-w-[380px] pt-2 font-gilroy text-sm leading-[130%] tracking-[0.6px] text-ink-dark/75">
            Review your personalized protection system designed to keep what
            matters most safe.
          </p>

          <div className="flex flex-col">
            {categoryOrder.map((cat) => {
              const items = grouped.get(cat);
              if (!items?.length) return null;
              return (
                <section
                  key={cat}
                  className="mt-3 flex flex-col gap-3 border-t border-line-strong pt-[15px] first:mt-0 first:border-t-0 first:pt-0"
                >
                  <h3 className="font-gilroy-regular text-xs uppercase leading-4 tracking-[0.03em] text-label">
                    {categoryLabel[cat]}
                  </h3>
                  {items.map((item) => (
                    <ReviewItem
                      key={`${item.productId}::${item.variantId}`}
                      product={item.product}
                      variantId={item.variantId}
                      quantity={item.quantity}
                    />
                  ))}
                </section>
              );
            })}

            <section className="mt-3 flex flex-col gap-3 border-t border-line-strong pt-[15px]">
              <h3 className="font-gilroy-regular text-xs uppercase leading-4 tracking-[0.03em] text-label">
                Plan
              </h3>
              <div className="flex items-center gap-2">
                <div className="flex size-[41px] shrink-0 items-center justify-center">
                  <PlanShieldIcon />
                </div>
                <div
                  aria-hidden
                  className="flex size-5 shrink-0 items-center justify-center rounded-full border-2 border-brand"
                >
                  <span className="size-3 rounded-full bg-brand" />
                </div>
                <p className="min-w-0 flex-1 font-gilroy-bold text-base leading-none tracking-[-0.002em] text-black">
                  Cam <span className="text-brand">Unlimited</span>
                </p>
                <Price
                  layout="review"
                  price={planProduct.price}
                  compareAtPrice={planProduct.compareAtPrice}
                  suffix="/mo"
                />
              </div>
            </section>

            <section className="mt-3 border-t border-line-strong pt-[15px]">
              <div className="flex items-center gap-2">
                <div className="flex size-[41px] shrink-0 items-center justify-center rounded-[5px] bg-white">
                  <ShippingIcon />
                </div>
                <span className="min-w-0 flex-1 font-gilroy-semibold text-sm leading-4 text-ink">
                  Fast Shipping
                </span>
                <Price
                  layout="review"
                  price={0}
                  compareAtPrice={SHIPPING_COMPARE}
                />
              </div>
            </section>
          </div>
        </div>

        {/* Totals / CTA column — Frame 1735: badge ‖ totals side-by-side */}
        <div className="mt-1 flex w-full shrink-0 flex-col xl:mt-0 xl:w-[340px]">
          <div
            className={cn(
              "flex items-center justify-between gap-3",
              "xl:flex-col xl:items-stretch",
            )}
          >
            <div className="flex items-start gap-3.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/badges/satisfaction-badge.png"
                alt="100% Wyze satisfaction guarantee"
                width={80}
                height={80}
                className="size-[80px] shrink-0 object-contain"
              />
              <div className="hidden pt-1.5 xl:block">
                <p className="mb-1 font-gilroy-semibold text-sm leading-[1.3] text-ink">
                  30-day hassle-free returns
                </p>
                <p className="font-gilroy text-xs leading-[1.4] text-subtle">
                  If you&apos;re not totally in love with the product, we will
                  refund you 100%.
                </p>
              </div>
            </div>

            <div className="flex flex-col 2xl:flex-row justify-between items-end gap-2 xl:mt-5 xl:items-end">
              <div className="inline-flex items-center justify-center whitespace-nowrap rounded-[3px] bg-brand px-[5px] py-0.5">
                <span className="font-gilroy text-xs leading-4 text-white">
                  as low as {formatMonthly(monthly)}
                </span>
              </div>
              <Price
                layout="total"
                price={activeTotal}
                compareAtPrice={compareTotal}
              />
            </div>
          </div>

          {savings > 0 && (
            <p className="mt-3 text-center font-gilroy-semibold text-xs leading-4 text-savings">
              Congrats! You&apos;re saving {formatPrice(savings)} on your
              security bundle!
            </p>
          )}

          <Button variant="primary" className="mt-1">
            Checkout
          </Button>

          <Button
            variant="link"
            className="mt-3 text-subtle hover:text-brand xl:text-brand"
            onClick={handleSaveForLater}
          >
            {savedMessage ? "System saved!" : "Save my system for later"}
          </Button>
        </div>
      </div>
    </aside>
  );
}
