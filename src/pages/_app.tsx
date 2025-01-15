import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";

import "./globals.css";
import { useRouter } from "next/router";
import { NextIntlClientProvider } from "next-intl";
import type { AppProps } from "next/app";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const locale = router.locale ?? "en";

  return (
    <NextIntlClientProvider
      locale={locale}
      timeZone="Europe/London"
      messages={pageProps.messages}
    >
      <Component {...pageProps} />
    </NextIntlClientProvider>
  );
}

export default App;
