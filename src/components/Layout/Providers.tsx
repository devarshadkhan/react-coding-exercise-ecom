"use client";

import type { ReactNode } from "react";
import { SecuritySystemProvider } from "@/context/SecuritySystemContext";

/** App-wide context providers, isolated from RootLayout since providers need "use client". */
export function Providers({ children }: { children: ReactNode }) {
  return <SecuritySystemProvider>{children}</SecuritySystemProvider>;
}
