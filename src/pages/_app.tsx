import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";

import "@/app/globals.css";
import { useRouter } from "next/router";
import { NextIntlClientProvider } from "next-intl";
import { AppProps } from "next/app";

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
      <Component {...pageProps} />
    </NextIntlClientProvider>
  );
}

export default App;
