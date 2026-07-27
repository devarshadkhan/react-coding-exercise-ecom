import type { SecuritySystemState } from "@/types";
import type { StepMeta } from "../types/steps";

/** Seed cart so the demo loads with a populated review panel instead of an empty one. */
export const INITIAL_SECURITY_SYSTEM_STATE: SecuritySystemState = {
  currentStep: 1,
  quantities: {
    "wyze-cam-v4::white": 1,
    "wyze-cam-pan-v3::white": 2,
    "cam-unlimited::default": 1,
    "wyze-sense-motion-sensor::default": 2,
    "wyze-sense-hub::default": 1,
    "wyze-microsd-card::default": 2,
  },
  activeVariants: {
    "wyze-cam-v4": "white",
    "wyze-cam-pan-v3": "white",
    "wyze-cam-floodlight-v2": "white",
    "wyze-battery-cam-pro": "white",
  },
};

/** Drives the 4-step accordion — order, titles, icons, and the "Next: …" CTA labels. */
export const STEPS: StepMeta[] = [
  {
    step: 1,
    title: "Choose your cameras",
    nextLabel: "Choose your plan",
    icon: "camera",
  },
  {
    step: 2,
    title: "Choose your plan",
    nextLabel: "Choose your sensors",
    icon: "plan",
  },
  {
    step: 3,
    title: "Choose your sensors",
    nextLabel: "Add extra protection",
    icon: "sensor",
  },
  {
    step: 4,
    title: "Add extra protection",
    nextLabel: "",
    icon: "protection",
  },
];
