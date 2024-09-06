import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { NextIntlClientProvider } from "next-intl";
import messages from "@/../messages/en.json";

import { Title } from "@/components/Title";

interface Props {
  children: React.ReactNode;
  locale: 'en'
}

const WrapProvider = ({ children, locale }: Props) => (
  <html lang={locale}>
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  </html>
);

test("loads and displays greeting", async () => {
  
const locale = 'en';
  render(
    <WrapProvider locale={locale}>
      <Title />
    </WrapProvider>
  );
  expect(screen.getByText("Hello world!")).toBeInTheDocument();
});
