"use client";

import { useEffect, useState } from "react";
import { Toaster } from "sonner";

export function AppToaster() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Toaster
      richColors
      position="top-right"
      toastOptions={{
        style: {
          borderRadius: "18px",
          borderColor: "var(--border)",
          boxShadow: "0 22px 70px rgb(20 88 53 / 14%)"
        }
      }}
    />
  );
}
