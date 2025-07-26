import { expect, describe, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import type { AppProps } from "next/app";
import type { Router } from "next/router";
import App from "@/pages/_app";
import Main from "@/pages";
import messages from "@/messages/en.json";

const mockRouter: Partial<Router> = {
  locale: "en",
};

vi.mock("next/router", () => ({
  useRouter: () => mockRouter,
}));

describe("_app", () => {
  it("Should render layout with h1", () => {
    const props: AppProps = {
      Component: Main,
      pageProps: {
        messages,
      },
      router: mockRouter as Router,
    };
    render(<App {...props} />);

    expect(
      screen.getByText(messages.Register.h1).closest("h1")
    ).toBeInTheDocument();
  });
});
