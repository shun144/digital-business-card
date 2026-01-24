import { describe, vi, test, expect, beforeEach } from "vitest";
import {
  act,
  render,
  screen,
  waitFor,
  cleanup,
  findByTestId,
  fireEvent,
} from "@testing-library/react";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import userEvent from "@testing-library/user-event";
import { User } from "@/domain/User";
import Register from "@/pages/cards/Register";
import * as reactRouter from "react-router";
import * as supabaseFunc from "@/lib/supabase/supabaseFunction";
import RouteProvider from "@/router/RouteProvider";
import { BrowserRouter, Route, Routes } from "react-router";

// const { mockNavigate } = vi.hoisted(() => ({
//   mockNavigate: () => vi.fn(),
// }));

const mockNavigate = vi.fn();
vi.mock("react-router", async () => {
  const actual =
    await vi.importActual<typeof import("react-router")>("react-router");
  return {
    ...actual,
    // useNavigate: mockNavigate,
    // useNavigate: vi.fn().mockReturnValue(mockNavigate),
    useNavigate: () => mockNavigate,
  };
});

vi.mock("@/lib/supabase/supabaseFunction", () => {
  const actual = vi.importActual("@/lib/supabase/supabaseFunction");
  return {
    ...actual,
    insertUser: vi.fn().mockImplementation((args) => {
      console.log(args);
    }),
  };
});

const user = userEvent.setup();

describe("名刺カード新規登録テスト", () => {
  beforeEach(async () => {
    act(() => {
      render(
        <ChakraProvider value={defaultSystem}>
          <BrowserRouter>
            <Register />
          </BrowserRouter>
        </ChakraProvider>,
      );
    });
  });

  afterEach(() => {
    cleanup();
  });

  test.skip("タイトルが表示されていること", async () => {
    const sut = await screen.findByText("新規名刺登録");
    expect(sut).toBeInTheDocument();
  });

  test("全項目入力して登録ボタンを押すと/に遷移する", async () => {
    const fieldEnglishWord = await screen.findByLabelText("好きな英単語");
    const fieldUserName = await screen.findByLabelText("お名前");
    const fieldDescription = await screen.findByLabelText("自己紹介");
    const fieldSkill = await screen.findByTestId("skill-select");
    const fieldGithubId = await screen.findByLabelText("GitHub ID");
    const fieldQiitaId = await screen.findByLabelText("Qiita ID");
    const fieldXId = await screen.findByLabelText("X ID");
    const btnRegister = await screen.findByRole("button", { name: "登録" });

    await user.type(fieldEnglishWord, "pizza");
    // await user.type(fieldUserName, "pizza");
    // await user.type(fieldDescription, "pizza");
    // await fireEvent.change(fieldSkill, { target: { value: 1 } });
    // await user.type(fieldGithubId, "pizza");
    // await user.type(fieldQiitaId, "pizza");
    // await user.type(fieldXId, "pizza");

    await user.click(btnRegister);

    expect(mockNavigate).toHaveBeenCalledWith("/");
    expect(mockNavigate).toHaveBeenCalledTimes(1);

    // const sut = await screen.findByText("APP");
    // expect(sut).toBeInTheDocument();

    // // const spyUseNavigate = vi.spyOn(reactRouter, "useNavigate");
    // // const spyInsertUser = vi.spyOn(supabaseFunc, "insertUser");

    // // const sut = await screen.findByText("新規名刺登録");
    // // expect(sut).toBeInTheDocument();

    // const fieldEnglishWord = await screen.findByLabelText("好きな英単語");
    // const fieldUserName = await screen.findByLabelText("お名前");
    // const fieldDescription = await screen.findByLabelText("自己紹介");
    // const fieldSkill = await screen.findByTestId("skill-select");
    // const fieldGithubId = await screen.findByLabelText("GitHub ID");
    // const fieldQiitaId = await screen.findByLabelText("Qiita ID");
    // const fieldXId = await screen.findByLabelText("X ID");

    // const btnRegister = await screen.findByRole("button", { name: "登録" });

    // await user.type(fieldEnglishWord, "pizza");

    // // await waitFor(() => {
    // //   user.type(fieldEnglishWord, "pizza");
    // //   // user.type(fieldUserName, "pizza");
    // //   // user.type(fieldDescription, "pizza");
    // //   // fireEvent.change(fieldSkill, { target: { value: 1 } });
    // //   // user.type(fieldGithubId, "pizza");
    // //   // user.type(fieldQiitaId, "pizza");
    // //   // user.type(fieldXId, "pizza");
    // //   user.click(btnRegister);

    // //   expect(screen.getByText("必須項目です")).not.toBeInTheDocument();
    // // });

    // await user.click(btnRegister);
    // const err = await screen.findAllByText("好きな英単語は必須項目です");

    // // expect(err).not.toBeInTheDocument();

    // // expect(spyInsertUser).toHaveBeenCalledTimes(1);

    // // expect(fieldSkill).toBeInTheDocument();
  });
});
