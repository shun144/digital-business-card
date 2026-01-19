import StyleProvider from "@/provider/style/StyleProvider";
import type { FC, PropsWithChildren } from "react";

const RootProvider: FC<PropsWithChildren> = ({ children }) => {
  return <StyleProvider>{children}</StyleProvider>;
};

export default RootProvider;
