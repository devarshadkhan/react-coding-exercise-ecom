"use client";

import type { Product } from "@/types";
import productsData from "@/data/products.json";
import { useSecuritySystem } from "@/hooks/useSecuritySystem";
import { STEPS } from "@/features/security-system-builder/constants/steps";
import { AccordionStep } from "@/components/Accordion/AccordionStep";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import {
  CameraIcon,
  PlanIcon,
  SensorIcon,
  ProtectionIcon,
} from "@/components/Icons";
import { cn } from "@/lib/cn";

const products = productsData as Product[];

const icons = {
  camera: <CameraIcon />,
  plan: <PlanIcon />,
  sensor: <SensorIcon />,
  protection: <ProtectionIcon />,
};

function getStepProducts(step: number) {
  return products.filter((p) => p.step === step);
}

function StepProducts({ step }: { step: number }) {
  const productsForStep = getStepProducts(step);

  if (step === 1) {
    return (
      <div
        className={cn(
          "grid grid-cols-1 gap-3.5",
          "md:grid-cols-2",
          /* Frame 1735 — 2-col flex-like grid, cards max 360 */
          "lg:grid-cols-2 lg:justify-items-stretch",
          /* Frame 1736 — five vertical cards */
          "xl:grid-cols-5",
        )}
      >
        {productsForStep.map((product, index) => (
          <div
            key={product.productId}
            className={cn(
              "min-w-0",
              index === 4 &&
                "md:col-span-2 md:mx-auto md:w-[calc(50%-7px)] lg:col-span-2 lg:mx-auto lg:w-[calc(50%-7px)] lg:max-w-[360px] xl:col-span-1 xl:mx-0 xl:w-full xl:max-w-none",
            )}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row items-stretch gap-3.5 lg:items-center">
      {productsForStep.map((product) => (
        <div
          key={product.productId}
          className="w-full lg:max-w-[360px] xl:max-w-[240px]"
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}

/** The 4-step "cameras → plan → sensors → protection" accordion configurator. */
export function SecuritySystemBuilder() {
  const { state, setStep } = useSecuritySystem();

  const selectedCount = (step: number) =>
    getStepProducts(step).filter((product) => {
      if (product.variants?.length) {
        return product.variants.some(
          (v) =>
            (state.quantities[`${product.productId}::${v.variantId}`] || 0) >
            0,
        );
      }
      return (state.quantities[`${product.productId}::default`] || 0) > 0;
    }).length;

  return (
    <div className="flex w-full flex-col lg:max-w-[768px] xl:max-w-none">
      {STEPS.map((meta) => {
        const isOpen = state.currentStep === meta.step;
        return (
          <AccordionStep
            key={meta.step}
            step={meta.step}
            title={meta.title}
            icon={icons[meta.icon]}
            isOpen={isOpen}
            selectedCount={selectedCount(meta.step)}
            onToggle={() => setStep(isOpen ? 0 : meta.step)}
            nextLabel={meta.nextLabel}
            showNext={isOpen && meta.step < 4}
            onNext={() => setStep(meta.step + 1)}
          >
            <StepProducts step={meta.step} />
          </AccordionStep>
        );
      })}
    </div>
  );
}
