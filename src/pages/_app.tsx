import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";

import "@/app/globals.css";
import { useRouter } from "next/router";
import { NextIntlClientProvider } from "next-intl";
import type { AppProps } from "next/app";
import { Header } from "@/components/Header/Header";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  console.log('_app stuff...')
  return (
    <NextIntlClientProvider
      locale={router.locale}
      // timeZone="Europe/Vienna"
      timeZone="Europe/London"
      messages={pageProps.messages}
    >
      <Header {...pageProps} />
      <Component {...pageProps} />
    </NextIntlClientProvider>
  );
}

export default App;
