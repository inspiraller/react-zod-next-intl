import { expect, describe, it, vi } from "vitest";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";

import type { AppProps } from "next/app";
import * as nextRouter from "next/router";
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

const renderApp = () => {
  const props: AppProps = {
    Component: Main,
    pageProps: {
      messages,
    },
    router: mockRouter as Router,
  };
  render(<App {...props} />);
};

//const spyUseRouter: ReturnType<typeof vi.spyOn> = vi.spyOn(nextRouter, "useRouter");

const spyUseRouter = vi.spyOn(nextRouter, "useRouter");

describe("_app", () => {
  it("Should render layout with h1", () => {
    spyUseRouter.mockReturnValue({
      locale: "en",
    } as Router);
    renderApp();

    expect(
      screen.getByText(messages.Register.h1).closest("h1")
    ).toBeInTheDocument();
  });
  it("Should allow users to press enter - return 3 validation errors in language - English", async () => {
    spyUseRouter.mockReturnValue({
      locale: "en",
    } as Router);
    renderApp();

    act(() => {
      const btnSubmit = screen.getByRole("button", {
        name: messages.Generic.submit,
      });
      fireEvent.click(btnSubmit);
    });

    await waitFor(() => {
      expect(screen.getAllByRole("alert")[0]?.textContent).toEqual(
        "Too small: expected string to have >=3 characters"
      );
      expect(screen.getAllByRole("alert")[1]?.textContent).toEqual(
        "Invalid email address"
      );
      expect(screen.getAllByRole("alert")[2]?.textContent).toEqual(
        "Too small: expected string to have >=8 characters"
      );
    });
  });
  it("Should allow users to press enter - return 3 validation errors in language - German", async () => {
    spyUseRouter.mockReturnValue({
      locale: "de",
    } as Router);
    renderApp();

    act(() => {
      const btnSubmit = screen.getByRole("button", {
        name: messages.Generic.submit,
      });
      fireEvent.click(btnSubmit);
    });

    await waitFor(() => {
      expect(screen.getAllByRole("alert")[0]?.textContent).toEqual(
        "Zu klein: erwartet, dass string >=3 Zeichen hat"
      );
      expect(screen.getAllByRole("alert")[1]?.textContent).toEqual(
        "Ungültig: E-Mail-Adresse"
      );
      expect(screen.getAllByRole("alert")[2]?.textContent).toEqual(
        "Zu klein: erwartet, dass string >=8 Zeichen hat"
      );
    });
  });

  it("Should fail custom validation on confirmPassword - 'passwords don't match'", async () => {
    spyUseRouter.mockReturnValue({
      locale: "en",
    } as Router);
    renderApp();

    act(() => {
      const inputPassword = screen.getByLabelText(messages.Register.password);
      fireEvent.change(inputPassword, { target: { value: "12345678" } });

      const btnSubmit = screen.getByRole("button", {
        name: messages.Generic.submit,
      });
      fireEvent.click(btnSubmit);
    });

    await waitFor(() => {
      expect(
        screen.getByText(messages.customValidation.confirmPassword_match)
      ).toBeInTheDocument();
    });
  });
  it("Should pass all validation and submit", async () => {
    spyUseRouter.mockReturnValue({
      locale: "en",
    } as Router);
    renderApp();

    act(() => {
      const inputUsername = screen.getByLabelText(messages.Register.username);
      fireEvent.change(inputUsername, { target: { value: "aaa" } });

      const inputEmail = screen.getByLabelText(messages.Register.email);
      fireEvent.change(inputEmail, { target: { value: "a@a.com" } });

      const inputPassword = screen.getByLabelText(messages.Register.password);
      fireEvent.change(inputPassword, { target: { value: "12345678" } });

      const inputConfirmPassword = screen.getByLabelText(
        messages.Register.confirmPassword
      );
      fireEvent.change(inputConfirmPassword, { target: { value: "12345678" } });

      const btnSubmit = screen.getByRole("button", {
        name: messages.Generic.submit,
      });
      fireEvent.click(btnSubmit);
    });

    await waitFor(() => {
      expect(
        screen.getByText(messages.Generic.loading)
      ).toBeInTheDocument();
    });
  });
});
