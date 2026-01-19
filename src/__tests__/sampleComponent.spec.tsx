import Sample from "@/Sample";
import { render, screen, waitFor } from "@testing-library/react";

describe("Sample", () => {
  it("tst", async () => {
    render(<Sample />);

    await waitFor(() => {
      expect(screen.getByText("Sample")).toBeInTheDocument();
    });
  });
});
