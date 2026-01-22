// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { test, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "@/App";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

// describe(() => )

test("SampleTest", async () => {
  await render(
    <ChakraProvider value={defaultSystem}>
      <App />
    </ChakraProvider>,
  );
  const title = await screen.findByText("APP");
  expect(title).toBeInTheDocument();
});
