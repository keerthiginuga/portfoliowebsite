import Script from "next/script";

/** Loads portfolio-v2 mobile viewport gate (width &lt; 1024px). */
export function DeviceGateScript() {
  return <Script src="/js/device-gate.js" strategy="afterInteractive" />;
}
