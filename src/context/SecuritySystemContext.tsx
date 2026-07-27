"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type Dispatch,
  type ReactNode,
} from "react";
import type { SecuritySystemAction, SecuritySystemState } from "@/types";
import { INITIAL_SECURITY_SYSTEM_STATE } from "@/features/security-system-builder/constants/steps";
import { loadFromStorage, saveToStorage } from "@/lib/storage";

function securitySystemReducer(
  state: SecuritySystemState,
  action: SecuritySystemAction,
): SecuritySystemState {
  switch (action.type) {
    case "SET_QUANTITY": {
      const quantities = { ...state.quantities };
      if (action.quantity > 0) quantities[action.key] = action.quantity;
      else delete quantities[action.key];
      return { ...state, quantities };
    }
    case "SET_STEP":
      return { ...state, currentStep: action.step };
    case "SET_ACTIVE_VARIANT":
      return {
        ...state,
        activeVariants: {
          ...state.activeVariants,
          [action.productId]: action.variantId,
        },
      };
    case "RESTORE":
      return action.state;
    default:
      return state;
  }
}

interface SecuritySystemContextValue {
  state: SecuritySystemState;
  dispatch: Dispatch<SecuritySystemAction>;
  hydrated: boolean;
  saveForLater: () => void;
}

const SecuritySystemContext = createContext<SecuritySystemContextValue | null>(
  null,
);

/** Root provider for the builder's cart-like state — quantities, active color variants, and current step. */
export function SecuritySystemProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    securitySystemReducer,
    INITIAL_SECURITY_SYSTEM_STATE,
  );
  // Tracks whether the one-time localStorage restore (below) has run, so the
  // save effect doesn't fire on mount and clobber a saved system with the seed state.
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = loadFromStorage<SecuritySystemState | null>(null);
    if (
      saved &&
      typeof saved.currentStep === "number" &&
      saved.quantities &&
      saved.activeVariants
    ) {
      dispatch({ type: "RESTORE", state: saved });
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveToStorage(state);
  }, [state, hydrated]);

  const saveForLater = useCallback(() => {
    saveToStorage(state);
  }, [state]);

  const value = useMemo(
    () => ({ state, dispatch, hydrated, saveForLater }),
    [state, hydrated, saveForLater],
  );

  return (
    <SecuritySystemContext.Provider value={value}>
      {children}
    </SecuritySystemContext.Provider>
  );
}

export function useSecuritySystemContext() {
  const ctx = useContext(SecuritySystemContext);
  if (!ctx) {
    throw new Error(
      "useSecuritySystemContext must be used within SecuritySystemProvider",
    );
  }
  return ctx;
}
