import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import type { FC, PropsWithChildren } from "react";

const StyleProvider: FC<PropsWithChildren> = ({ children }) => {
  return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>;
};

export default StyleProvider;
