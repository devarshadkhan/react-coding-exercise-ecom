"use client";

import { useCallback, useState } from "react";
import { useSecuritySystemContext } from "@/context/SecuritySystemContext";

/** Public API for reading and mutating the shopper's security system configuration. */
export function useSecuritySystem() {
  const { state, dispatch, hydrated, saveForLater } = useSecuritySystemContext();
  const [savedMessage, setSavedMessage] = useState(false);

  const setQuantity = useCallback(
    (key: string, quantity: number) => {
      dispatch({ type: "SET_QUANTITY", key, quantity });
    },
    [dispatch],
  );

  const setStep = useCallback(
    (step: number) => {
      dispatch({ type: "SET_STEP", step });
    },
    [dispatch],
  );

  const setActiveVariant = useCallback(
    (productId: string, variantId: string) => {
      dispatch({ type: "SET_ACTIVE_VARIANT", productId, variantId });
    },
    [dispatch],
  );

  const handleSaveForLater = useCallback(() => {
    saveForLater();
    setSavedMessage(true);
    // Matches the review panel's "System saved!" confirmation window.
    window.setTimeout(() => setSavedMessage(false), 2500);
  }, [saveForLater]);

  return {
    state,
    hydrated,
    savedMessage,
    setQuantity,
    setStep,
    setActiveVariant,
    handleSaveForLater,
  };
}
