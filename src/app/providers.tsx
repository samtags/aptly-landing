"use client";

import Brook from "@aptly-sdk/brook";
import { BrookProvider } from "@aptly-sdk/brook/react";

const API_KEY = "pk_zKHqrVh8N23aqK1Q8BIDHIv7uy3bBqubS7u19Qc3";

export default function Providers({ children }: { children: React.ReactNode }) {
  const config = new Brook({
    apiKey: API_KEY,
  });

  return <BrookProvider config={config}>{children}</BrookProvider>;
}
