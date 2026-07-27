import type { Metadata } from "next";
import { Providers } from "@/components/Layout/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Build Your Own Security System",
  description:
    "Configure cameras, sensors, and protection plans for your home security system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
