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
import { BrowserRouter, Route, Routes, createRoutesStub } from "react-router";
import Layout from "@/templates/Layout";
import App from "@/App";
import CardsLayout from "@/templates/CardsLayout";
import Search from "@/pages/cards/Search";
import Cards from "@/pages/cards/Cards";
import RootProvider from "@/provider/RootProvider";


vi.mock("@/lib/supabase/supabaseFunction", async () => {
  const actual = await vi.importActual<typeof import("@/lib/supabase/supabaseFunction")>("@/lib/supabase/supabaseFunction");
  return {
    ...actual,
    insertUser: vi.fn().mockImplementation((args) => {
      console.log(args);
    }),
  };
});

const user = userEvent.setup();

describe("名刺カード新規登録テスト", () => {
  beforeEach(() => {
    const Stub = createRoutesStub([
      { path: '/', Component: App },
      { path: '/cards/register', Component: Register }]);
    render(
      <ChakraProvider value={defaultSystem}>
        <Stub initialEntries={['/cards/register']} />
      </ChakraProvider>
    );
  })

  test.skip("タイトルが表示されていること", async () => {
    const sut = await screen.findByText("新規名刺登録");
    expect(sut).toBeInTheDocument();
  });

  // const spy = vi.spyOn(reactRouter, "useNavigate").mockImplementation(() => vi.fn())

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
    await user.type(fieldUserName, "pizza");
    await user.type(fieldDescription, "pizza");
    await fireEvent.change(fieldSkill, { target: { value: 1 } });
    await user.type(fieldGithubId, "pizza");
    await user.type(fieldQiitaId, "pizza");
    await user.type(fieldXId, "pizza");
    await user.click(btnRegister);


    await waitFor(() => {
      expect(screen.getByText("APP")).toBeInTheDocument()
    })

    screen.debug(fieldSkill)

  });
});
