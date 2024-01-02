"use client"

import { ViewportProvider } from "./viewportcontext";
import { AudioProvider } from "./audiocontext";

export function ContextProvider({ children }: { children: React.ReactNode }) {
  return (
    <ViewportProvider>
      <AudioProvider>{children}</AudioProvider>
    </ViewportProvider>
  );
}
