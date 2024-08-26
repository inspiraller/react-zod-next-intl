import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import { z } from "zod";
import type { AppProps } from "next/app";

import "@/app/global.css";
import { useRouter } from "next/router";
import { NextIntlClientProvider } from "next-intl";
import { createCustomErrorMap } from "@/libraries/zodCustomErrorMap";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export const Layout = ({children}: {children: React.ReactNode}) => {
  const zodCustomErrorMap = createCustomErrorMap();
  z.setErrorMap(zodCustomErrorMap);
  return children
};
export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  return (
    <NextIntlClientProvider
      locale={router.locale}
      // timeZone="Europe/Vienna"
      timeZone="Europe/London"
      messages={pageProps.messages}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NextIntlClientProvider>
  );
}
