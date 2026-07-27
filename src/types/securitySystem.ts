/** Persisted shape of a shopper's in-progress security system configuration. */
export interface SecuritySystemState {
  currentStep: number;
  quantities: Record<string, number>;
  activeVariants: Record<string, string>;
}

export type SecuritySystemAction =
  | { type: "SET_QUANTITY"; key: string; quantity: number }
  | { type: "SET_STEP"; step: number }
  | { type: "SET_ACTIVE_VARIANT"; productId: string; variantId: string }
  | { type: "RESTORE"; state: SecuritySystemState };
