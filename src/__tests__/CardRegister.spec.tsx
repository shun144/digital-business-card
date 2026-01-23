import { describe, vi, test, expect, beforeEach } from "vitest";
import { act, render, screen, waitFor, cleanup } from "@testing-library/react";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { User } from "@/domain/User";
import Register from "@/pages/cards/Register";
import { useNavigate } from "react-router";

vi.mock("react-router", () => {
  const actual = vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("名刺カード新規登録テスト", () => {
  beforeEach(async () => {
    act(() => {
      render(
        <ChakraProvider value={defaultSystem}>
          <Register />
        </ChakraProvider>,
      );
    });
  });

  test("タイトルが表示されていること", async () => {
    const sut = await screen.findByText("新規名刺登録");
    expect(sut).toBeInTheDocument();
  });
});
