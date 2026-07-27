export type StepIcon = "camera" | "plan" | "sensor" | "protection";

export interface StepMeta {
  step: number;
  title: string;
  nextLabel: string;
  icon: StepIcon;
}
