"use client";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/AuthStore";

export default function ZustandHydration({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsub = useAuthStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    if (useAuthStore.persist.hasHydrated()) {
      setHydrated(true);
    }

    return () => unsub();
  }, []);

  if (!hydrated) {
    return (
    <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
    </div>
    );
  }

  return <>{children}</>;
}
