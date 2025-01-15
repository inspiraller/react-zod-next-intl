import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, vi, it, expect } from "vitest";
import { NextIntlClientProvider } from "next-intl";
import { FormRegister } from "@/component/Form/Implementation/FormRegister/FormRegister";

vi.mock(
  "@/component/Form/Implementation/FormRegister/useMutationRegister",
  () => ({
    default: () => ({
      mutate: vi.fn(),
      isSuccess: false,
      data: null,
    }),
  })
);

const messages = {
  Register: {
    reset: "Reset",
    submit: "Submit",
  },
  zod: {
    required: "This field is required",
    customValidation: {
      confirmPassword_match: "Passwords do not match",
    }
  },
};

describe("FormRegister", () => {
  it("Should render the form with correct button texts from translations", () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <FormRegister />
      </NextIntlClientProvider>
    );

    expect(screen.getByText("Reset")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

});
