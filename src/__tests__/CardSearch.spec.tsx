import App from "@/App";
import Register from "@/pages/cards/Register";
import Search from "@/pages/cards/Search";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRoutesStub } from "react-router";
import { beforeEach, describe, expect, test, vi } from "vitest";

const user = userEvent.setup();

describe.skip("名刺カード検索テスト", () => {
  beforeEach(() => {
    const Stub = createRoutesStub([
      { path: "/", Component: Search },
      { path: "/cards/register", Component: Register },
    ]);
    render(
      <ChakraProvider value={defaultSystem}>
        <Stub initialEntries={["/"]} />
      </ChakraProvider>,
    );
  });

  test("タイトルが表示されていること", async () => {
    const sut = await screen.findByText("名刺検索");
    expect(sut).toBeVisible();
  });
});
