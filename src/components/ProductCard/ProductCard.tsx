"use client";

import type { Product } from "@/types";
import { useSecuritySystem } from "@/hooks/useSecuritySystem";
import { makeQuantityKey } from "@/lib/quantityKey";
import { Badge } from "@/components/Badge/Badge";
import { Price } from "@/components/Price/Price";
import { QuantityStepper } from "@/components/QuantityStepper/QuantityStepper";
import { ProductVariant } from "@/components/ProductVariant/ProductVariant";
import { cn } from "@/lib/cn";

interface ProductCardProps {
  product: Product;
}

/**
 * Frame 1735 (lg): horizontal card — 101px image left, max 360px wide.
 * Frame 1736 (xl): vertical card for 5-column grid.
 * Mobile/tablet: stacked vertical.
 */
export function ProductCard({ product }: ProductCardProps) {
  const { state, setQuantity, setActiveVariant } = useSecuritySystem();

  const hasVariants = Boolean(product.variants?.length);
  const activeVariantId = hasVariants
    ? state.activeVariants[product.productId] ||
      product.variants![0].variantId
    : "default";
  const key = makeQuantityKey(product.productId, activeVariantId);
  const quantity = state.quantities[key] || 0;
  const selected = quantity > 0;

  return (
    <article
      className={cn(
        "group relative flex h-full min-w-0 rounded-[10px] border bg-white p-[11px] shadow-card transition-all duration-200",
        "flex-col gap-3",
        "lg:max-w-[360px] lg:flex-row lg:items-center lg:gap-[13px]",
        "xl:max-w-none xl:flex-col xl:items-stretch xl:gap-2.5",
        selected
          ? "border-brand shadow-[0_0_0_1px_#4e2fd2]"
          : "border-line hover:border-brand/40",
      )}
    >
      <div
        className={cn(
          "relative mx-auto h-[148px] w-full max-w-[220px] shrink-0 overflow-hidden rounded-[5px] bg-white",
          "lg:mx-0 lg:h-auto lg:w-[101px] lg:max-w-none lg:shrink-0",
          "xl:mx-auto xl:h-[118px] xl:w-full",
        )}
      >
        {product.badge && (
          <Badge className="absolute left-1.5 top-1.5 z-[1] w-[65px]">
            {product.badge}
          </Badge>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.title}
          // width={101}
          // height={101}
          className="size-full w-[60%] mx-auto object-contain transition-transform duration-300 group-hover:scale-[1.02] lg:h-auto "
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <h3 className="font-gilroy-semibold text-base leading-tight text-ink xl:text-sm">
          {product.title}
        </h3>
        <p className="font-gilroy text-sm leading-[1.4] text-subtle xl:text-xs">
          {product.description}{" "}
          {product.learnMoreUrl && (
            <a
              href={product.learnMoreUrl}
              className="whitespace-nowrap font-medium text-brand underline transition-colors hover:text-brand-hover"
            >
              Learn More
            </a>
          )}
        </p>

        {hasVariants && (
          <ProductVariant
            productId={product.productId}
            variants={product.variants!}
            activeVariantId={activeVariantId}
            onChange={(variantId) =>
              setActiveVariant(product.productId, variantId)
            }
          />
        )}

        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <QuantityStepper
            quantity={quantity}
            onChange={(q) => setQuantity(key, q)}
          />
          <Price price={product.price} compareAtPrice={product.compareAtPrice} />
        </div>
      </div>
    </article>
  );
}
