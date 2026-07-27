# Security System Builder

Pixel-faithful Next.js implementation of the [Frontend-Test-Figma](https://www.figma.com/design/JYf61etQVqeseX7oY5alGz/Frontend-Test-Figma?node-id=68-8088) multi-step security system configurator.

## Project Overview

Shoppers assemble a home security bundle through a 4-step accordion (cameras → plan → sensors → protection) with a live review panel, per-variant quantities, financing chip, and save-for-later persistence.

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS v4** (utility-only styling)
- **React Context + useReducer**
- **clsx + tailwind-merge** (`cn`)
- **ESLint + Prettier**

## Folder Structure

```
src/
  app/                              # App Router (layout, page, globals)
  components/
    Accordion/ ProductCard/ ProductVariant/ QuantityStepper/
    ReviewPanel/ ReviewItem/ Price/ Button/ Badge/ Card/
    Layout/ Icons/ Typography/
  features/security-system-builder/ # SecuritySystemBuilder + step config
    components/ hooks/ utils/ types/ constants/
  context/                          # SecuritySystemProvider (useReducer)
  hooks/                            # useSecuritySystem, useLocalStorage
  data/                             # products.json + variant image map
  lib/                              # calculations, formatter, storage, cn
  types/ utils/
public/images/
  badges/ icons/ logos/ variants/
```

## Architecture

- **`SecuritySystemContext`** (`src/context`) holds the one shared piece of state — a `useReducer` over `{ currentStep, quantities, activeVariants }` — and mirrors it to `localStorage` on every change so a reload (or "Save my system for later") restores the shopper's cart.
- **`useSecuritySystem`** (`src/hooks`) is the only way components read/write that state. It wraps the raw context with typed setters (`setQuantity`, `setStep`, `setActiveVariant`) so components never dispatch actions directly.
- **`SecuritySystemBuilder`** (`src/features/security-system-builder`) renders the 4-step accordion from `STEPS` config and `products.json`; it doesn't own any state of its own.
- **`ReviewPanel`** reads the same context, so editing a quantity in either the builder or the review list stays in sync without extra plumbing.
- Quantities are keyed `productId::variantId` (see `lib/quantityKey.ts`) so each color variant of a product tracks its own count independently.

## Installation

```bash
npm install
```

## Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Features

- 4-step accordion with animated expand/collapse
- Data-driven product cards from `products.json`
- Color variants with independent quantity keys (`productId::variantId`)
- Live review panel synced via Context
- Compare-at / sale pricing, FREE shipping, savings callout
- Affirm-style “as low as $X/mo” chip
- Checkout CTA + Save my system for later (`localStorage`)
- Responsive frames aligned to Figma:
  - **Mobile** `<768` — stacked + “Let’s get started!” tooltip
  - **Tablet** `768–1023` — optimized stacked layout
  - **Laptop** `≥1024` (Frame 1735) — horizontal cards, 2-col grid, sticky 399px review
  - **Desktop** `≥1440` (Frame 1736) — 5 vertical cards, review full-width below

## Tradeoffs

- Figma MCP requires **can edit** access; this account is View-only on Starter, so assets were taken from Figma-exported PNGs for the same file rather than live MCP downloads.
- Review totals follow the Figma seed cart math (shipping compare shown but excluded from strikethrough total).
- Gilroy webfonts load from a CDN mirror to match Figma typography.

## Future Improvements

- Wire Checkout to a real cart / payment flow
- Unit tests for pricing and reducer actions
- Code Connect mappings for design-system components
- Playwright visual regression against Figma screenshots
- Grant Figma edit access for live Dev Mode token sync
