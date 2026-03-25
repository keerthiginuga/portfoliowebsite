"use client";

import { useLayoutEffect } from "react";
import { attachAboutPageMotion } from "@/lib/motion/attachAboutHero";

export function AboutMotionClient({ children }: { children: React.ReactNode }) {
  useLayoutEffect(() => attachAboutPageMotion(), []);
  return <>{children}</>;
}
