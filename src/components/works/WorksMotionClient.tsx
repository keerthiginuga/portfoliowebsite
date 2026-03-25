"use client";

import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import { attachWorksPage } from "@/lib/motion/attachWorksPage";

export function WorksMotionClient({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useLayoutEffect(() => {
    return attachWorksPage((href) => {
      void router.push(href);
    });
  }, [router]);

  return <>{children}</>;
}
