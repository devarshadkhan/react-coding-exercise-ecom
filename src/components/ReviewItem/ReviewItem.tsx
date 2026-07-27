"use client";

import type { Product } from "@/types";
import { useSecuritySystem } from "@/hooks/useSecuritySystem";
import { makeQuantityKey } from "@/lib/quantityKey";
import { getVariantImage } from "@/data/variantImages";
import { QuantityStepper } from "@/components/QuantityStepper/QuantityStepper";
import { Price } from "@/components/Price/Price";

interface ReviewItemProps {
  product: Product;
  variantId: string;
  quantity: number;
}

export function ReviewItem({ product, variantId, quantity }: ReviewItemProps) {
  const { setQuantity } = useSecuritySystem();
  const key = makeQuantityKey(product.productId, variantId);
  const imgSrc =
    product.image || getVariantImage(product.productId, variantId) || "";

  return (
    <div className="grid grid-cols-[41px_minmax(0,1fr)_72px_auto] items-center gap-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imgSrc}
        alt={product.title}
        className="size-[41px] shrink-0 rounded-[5px] bg-white object-contain"
      />
      <span className="min-w-0 truncate font-gilroy text-xs leading-4 tracking-[0.06px] text-ink">
        {product.title}
      </span>
      <QuantityStepper
        quantity={quantity}
        onChange={(q) => setQuantity(key, q)}
      />
      <Price
        layout="review"
        price={product.price * quantity}
        compareAtPrice={
          product.compareAtPrice != null
            ? product.compareAtPrice * quantity
            : undefined
        }
      />
    </div>
  );
}
