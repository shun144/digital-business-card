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

vi.mock("@/lib/supabase/supabaseFunction", async () => {
  const actual = await vi.importActual<
    typeof import("@/lib/supabase/supabaseFunction")
  >("@/lib/supabase/supabaseFunction");
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
      { path: "/", Component: Search },
      { path: "/cards/register", Component: Register },
    ]);
    render(
      <ChakraProvider value={defaultSystem}>
        <Stub initialEntries={["/cards/register"]} />
      </ChakraProvider>,
    );
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

    // const fieldSkill = within(
    //   screen.getByTestId('skill-select')
    // ).getByRole('combobox')
    // const test = await within(fieldSkill).findAllByRole('option')
    // const test = await screen.findByRole("listbox")
    // const test = await screen.findAllByTestId('opt')
    // console.log(test.length)

    const fieldGithubId = await screen.findByLabelText("GitHub ID");
    const fieldQiitaId = await screen.findByLabelText("Qiita ID");
    const fieldXId = await screen.findByLabelText("X ID");
    const btnRegister = await screen.findByRole("button", { name: "登録" });

    await user.type(fieldEnglishWord, "butter2");
    await user.type(fieldUserName, "butter");
    await user.type(fieldDescription, "butter");
    await fireEvent.change(fieldSkill, { target: { value: 2 } });
    // await user.selectOptions(fieldSkill, "1")
    await user.type(fieldGithubId, "butter");
    await user.type(fieldQiitaId, "butter");
    await user.type(fieldXId, "butter");

    // await user.click(fieldSkill);

    // screen.debug()

    await user.click(btnRegister);

    const selectedValue = (fieldSkill as HTMLSelectElement).value;
    console.log({ selectedValue });
  });

  test.skip("必須項目確認", async () => {
    const btnRegister = await screen.findByRole("button", { name: "登録" });
    await user.click(btnRegister);

    await waitFor(() => {
      expect(screen.getByText("英単語は必須項目です")).toBeVisible();
      expect(screen.getByText("お名前は必須項目です")).toBeVisible();
      expect(screen.getByText("自己紹介は必須項目です")).toBeVisible();
      expect(screen.getAllByText(/必須項目/).length).toBe(3);
    });
  });
});
