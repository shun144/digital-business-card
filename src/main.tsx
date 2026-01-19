import RootProvider from "@/provider/RootProvider";
import RouteProvider from "@/router/RouteProvider";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RootProvider>
      <RouteProvider />
    </RootProvider>
  </StrictMode>,
);
