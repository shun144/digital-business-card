import StyleProvider from "@/provider/style/StyleProvider";
import RouteProvider from "@/router/RouteProvider";
import type { FC, PropsWithChildren } from "react";

const RootProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <StyleProvider>
      <RouteProvider />
      {children}
    </StyleProvider>);
};

export default RootProvider;
