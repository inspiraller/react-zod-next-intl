# Summary
This repo is a simpler version of using zod and useTranslations from next-intl.
It is generic. That means you don't have to manually create a custom message for each of your validations.
All you have to do is copy this code structure. If you want a different language version, simply duplicate the en.json file into your language of choice and then follow the guidelines from next-intl to extend your website.
I created this because the other solutions I found online were overly complicated. 
I have added notes below to credit those websites I have used for inspiration and copied ideas from.
Enjoy!

# Credits to existing implementations online
- This zod en object was taken from here: https://github.com/gcascio/next-intl-zod
- react-hook-form with zod validation https://www.freecodecamp.org/news/react-form-validation-zod-react-hook-form/


# Installation steps
1. git clone thisrepo
2. cd thisrepo
3. pnpm i
4. pnpm run dev
5. Test the validation

# Simplified steps for using zod next intl in your existing application
0. Install dependencies
`npm i zod next-intl`

1. **messages/en.json**
```json
{
  "HomePage": {
    "title": "Hello world!"
  },
  "zod": {
    /* Paste latest zod messages here. Example... */
    "invalid_type": "Expected {expected}, received {received}",
    "invalid_type_with_path": "{path} is expected {expected}, but received {received}",
    "invalid_type_received_undefined": "Required",
  }
}

```

2. **pages/_app.tsx**
- Wrap with NextIntlClientProvider
- inherit local 'en' from router
- pass pageProps into next page

```tsx
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { NextIntlClientProvider } from "next-intl";
import type { AppProps } from "next/app";
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  return (
    <NextIntlClientProvider
      locale={router.locale}
      timeZone="Europe/London"
      messages={pageProps.messages}
    >
      <Component {...pageProps} />
    </NextIntlClientProvider>
  );
}

export default App;
```

3. Example - Using the validation in react-hook-form - **FormRegister.tsx**
```tsx
import React, { useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useValidationSchema } from "./useValidationSchema";
import { Button } from "@/component/Form/Button/Button";
import { FormFieldEmail } from "./FormFieldEmail";
import { FormFieldPassword } from "./FormFieldPassword";
import { FormFieldConfirmPassword } from "./FormFieldConfirmPassword";
import { FormFieldUsername } from "./FormFieldUsername";

import styles from "@/component/Form/Form.module.css";

import useMutateRegister from "./useMutationRegister";
import { PropsFormRegister } from "@/@types";
import { useTranslations } from "next-intl";

export const FormRegister = () => {

  const tZod = useTranslations('zod');

  const t = useTranslations('Register');
  const T_legend = t('legend');
  const T_submit = t('submit');

  const zodValidationSchema = useValidationSchema(tZod);

  const methods = useForm<PropsFormRegister>({
   resolver: zodResolver(zodValidationSchema),
  });
  const { handleSubmit, reset, formState } = methods;

  const onSubmit = (values: PropsFormRegister) => {
    console.log("submit...");
    mutate(values);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>{T_legend}</legend>
          <FormFieldUsername />
          <FormFieldEmail />
          <FormFieldPassword />
          <FormFieldConfirmPassword />
        </fieldset>

        <div className={styles.actions}>
          <Button type="submit" variant="primary">
            {T_submit}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
```
4. **getStaticProps** in your Page.tsx
```tsx
import { useTranslations } from "next-intl";
export default function Home() {
  const t = useTranslations('HomePage');
  return (
    <main>
      <h1>{t('title')}</h1>
    </main>
  );
}

/* eslint-enable @typescript-eslint/no-explicit-any */
export async function getStaticProps(context: any) {
  return {
    props: {
      messages: (await import(`@/messages/${context.locale}.json`)).default
    }
  };
}
```
> Troubleshoot - Pages router = Error: MISSING_MESSAGE: No messages were configured on the provider.

- Ensure you aren't putting a Component inside the _app.tsx, because that will not enable you to use getStaticProps via the page context
- DON'T DO THIS
**app.tsx**
```tsx  

    <NextIntlClientProvider
      locale={router.locale}
      timeZone="Europe/London"
      messages={pageProps.messages}
    >
      <SpecificComponentConsumesNextIntlUseTranslations/>
    </NextIntlClientProvider>
```
Instead wrap your pages component with a higher order component...
**hoc/withMyPageComponent.tsx**
```ts
const withMyPageComponent = <P extends object>(
  SomePageComponent: React.ComponentType<P>
) => {
  const WithWrapper = (props: P) => {
    return (
      <>
        <SpecificComponentConsumesNextIntlUseTranslations/>
        <SomePageComponent {...props} />
      </>
    );
  };
  return WithWrapper;
};
withMyPageComponent.displayType = "hoc";

export default withMyPageComponent;

// use
// pages/Home.tsx 
//   const Home = (props: Props) => {}
//   getStaticProps
//   export default withMyPageComponent<Props>(Home);
```
---------------------------------------------------------------------------
5. OPTIONAL - if using app router:

- **next.config.ts**

```ts
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();
const nextConfig = {
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
};

export default withNextIntl(nextConfig);
```

- **i18n/request.ts**
```ts
import {getRequestConfig} from 'next-intl/server';
 
export default getRequestConfig(async () => {
  const locale = 'en';
  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default
  };
});
```


- **app/**
Need an app directory in order for _app.tsx to work
Otherwise you will get:
> Error: MISSING_MESSAGE: No messages were configured on the provider.

----------------------------------------------------------------------------------------
# Troubleshoot
> For either Pages or App router - see:
[https://next-intl.dev/docs/getting-started/pages-router](https://next-intl.dev/docs/getting-started/pages-router)


done. 
Enjoy!