import { act, render, screen, waitFor, cleanup } from "@testing-library/react";
import Card from "@/components/molecules/Card";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { User } from "@/domain/User";

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe.skip("名刺カード表示テスト", () => {
  beforeEach(async () => {
    act(() => {
      const user = createUser();
      render(
        <ChakraProvider value={defaultSystem}>
          <Card user={user} />
        </ChakraProvider>,
      );
    });
  });

  test("名前が表示されていること", async () => {
    const sut = await screen.findByText("テスト太郎");
    expect(sut).toBeInTheDocument();
  });

  test("自己紹介が表示されていること", async () => {
    const sut = await screen.findByText("初めまして");
    expect(sut).toContainHTML("<h1>初めまして</h1>");
  });

  test("技術が表示されていること", async () => {
    const sut = await screen.findByText("React");
    expect(sut).toBeInTheDocument();
  });

  test("Githubアイコンが表示されていること", async () => {
    const sut = await screen.findByRole("link", { name: "Githubリンク" });
    expect(sut).toBeInTheDocument();
  });

  test("Qiitaアイコンが表示されていること", async () => {
    const sut = await screen.findByRole("link", { name: "Qiitaリンク" });
    expect(sut).toBeInTheDocument();
  });

  test("X(旧ツイッター)アイコンが表示されていること", async () => {
    const sut = await screen.findByRole("link", { name: "Xリンク" });
    expect(sut).toBeInTheDocument();
  });
});

function createUser() {
  const user = new User(
    "dummy",
    "テスト太郎",
    "<h1>初めまして</h1>",
    "test",
    "test",
    "test",
    ["React"],
  );
  return user;
}
