"use client";

import Brook from "@aptly-sdk/brook";
import { BrookProvider } from "@aptly-sdk/brook/react";

const API_KEY = "pk_qgtoa1gGuj2hei6vyMPvHwOfxkf0tY7JrKykAMxE";

export default function Providers({ children }: { children: React.ReactNode }) {
  const config = new Brook({
    apiKey: API_KEY,
  });

  return <BrookProvider config={config}>{children}</BrookProvider>;
}
