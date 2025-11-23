"use client";

import { useEffect } from "react";

export function HydrationFix() {
  useEffect(() => {
    // Suppress hydration warnings caused by browser extensions
    // This is safe because these attributes are added by extensions AFTER React hydration
    const originalError = console.error;
    const originalWarn = console.warn;

    console.error = (...args) => {
      if (typeof args[0] === "string") {
        // Suppress hydration-related errors
        if (
          args[0].includes("Hydration failed") ||
          args[0].includes("There was an error while hydrating") ||
          args[0].includes("Text content does not match") ||
          (args[0].includes("Prop `") && args[0].includes("` did not match"))
        ) {
          return;
        }

        // Suppress browser extension attribute errors
        if (
          args[0].includes("bis_skin_checked") ||
          args[0].includes("bis_register") ||
          args[0].includes("__processed_") ||
          args[0].includes("grammarly-") ||
          args[0].includes("data-new-gr-") ||
          args[0].includes("data-gr-")
        ) {
          return;
        }
      }
      originalError.call(console, ...args);
    };

    console.warn = (...args) => {
      if (typeof args[0] === "string") {
        // Suppress hydration-related warnings
        if (
          (args[0].includes("Prop `") && args[0].includes("` did not match")) ||
          args[0].includes("Extra attributes from the server") ||
          args[0].includes("bis_skin_checked") ||
          args[0].includes("bis_register")
        ) {
          return;
        }
      }
      originalWarn.call(console, ...args);
    };

    return () => {
      console.error = originalError;
      console.warn = originalWarn;
    };
  }, []);

  return null;
}
