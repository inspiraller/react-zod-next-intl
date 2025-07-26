import { type ReactElement, type ReactNode } from "react";
import type { NextPage } from "next";

import "./globals.css";
import { useRouter } from "next/router";
import { NextIntlClientProvider } from "next-intl";
import type { AppProps } from "next/app";
import { ZodSetup } from "@/zod/ZodSetup";
import { zodLocale } from "@/@types";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  let locale =  (router.locale ?? "en") as zodLocale;
  locale = 'de' // TODO: change to whatever. Proving changing locale updates zod locales

  return (
    <NextIntlClientProvider
      locale={locale}
      timeZone="Europe/London"
      messages={pageProps.messages}
    >
      <ZodSetup locale={locale}>
        {locale ?<Component {...pageProps} /> : 'loading'}
      </ZodSetup>
    </NextIntlClientProvider>
  );
}

export default App;
