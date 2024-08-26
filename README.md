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

# Simplified steps for using zod next intl in your application
1. **next.config.mjs**
```ts
/** @type {import('next').NextConfig} */

const nextConfig = {
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
};

export default nextConfig;
```

2. **pages/_app.tsx**
```tsx
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import { z } from "zod";
import type { AppProps } from "next/app";

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
      timeZone="Europe/London"
      messages={pageProps.messages}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NextIntlClientProvider>
  );
}
```

3. **libraries/zodCustomErrorMap.ts**
```ts
import { useTranslations } from "next-intl";
import { z } from "zod";


const hasInclusiveType = [
  "inclusive",
  "inclusive_one",
  "inclusive_other",
  "inclusive_with_path",
  "inclusive_with_path_one",
  "inclusive_with_path_other",
  "not_inclusive",
  "not_inclusive_one",
  "not_inclusive_other",
  "not_inclusive_with_path",
  "not_inclusive_with_path_one",
  "not_inclusive_with_path_other",
].reverse();

export const createCustomErrorMap = (): z.ZodErrorMap => {
  const t = useTranslations("zod");
  return (issue, ctx) => {
    let key = "";
    const { code } = issue;
    switch (code) {
      case "too_big":
      case "too_small":
        const inclusiveType = Object.keys(issue).find(
          (item) => hasInclusiveType.indexOf(item) !== -1
        );
        key = `${issue.code}.${issue.type}.${inclusiveType}`;
        break;
      case "invalid_string":
        key = `${issue.code}.${issue.validation}`;
        break;
      default:
        key = issue.code;
    }
    return { message: t(key, issue as any) ?? ctx.defaultError };
  };
};

```
4. **messages/en.json**
```json
{
  "HomePage": {
  },
  "zod": {
    "invalid_type": "Expected {expected}, received {received}",
    "invalid_type_with_path": "{path} is expected {expected}, but received {received}",
    "invalid_type_received_undefined": "Required",
    "invalid_literal": "Invalid literal value, expected {expected}",
    "unrecognized_keys": "Unrecognized key(s) in object: {- keys}",
    "unrecognized_keys_one": "Unrecognized key in object: {- keys}",
    "unrecognized_keys_other": "Unrecognized keys in object: {- keys}",
    "invalid_union": "Invalid input",
    "invalid_union_discriminator": "Invalid discriminator value. Expected {- options}",
    "invalid_enum_value": "Invalid enum value. Expected {- options}, received {received}",
    "invalid_arguments": "Invalid function arguments",
    "invalid_return_type": "Invalid function return type",
    "invalid_date": "Invalid date",
    "custom": "Invalid input",
    "invalid_intersection_types": "Intersection results could not be merged",
    "not_multiple_of": "Number must be a multiple of {multipleOf}",
    "not_finite": "Number must be finite",
    "invalid_string": {
      "email": "Invalid {validation}",
      "url": "Invalid {validation}",
      "uuid": "Invalid {validation}",
      "cuid": "Invalid {validation}",
      "regex": "Invalid",
      "datetime": "Invalid {validation}",
      "startsWith": "Invalid input: must start with {startsWith}",
      "endsWith": "Invalid input: must end with {endsWith}"
    },
    "too_small": {
      "array": {
        "inclusive": "Array must contain at least {minimum} element(s)",
        "inclusive_one": "Array must contain at least {minimum} element",
        "inclusive_other": "Array must contain at least {minimum} elements",
        "not_inclusive": "Array must contain more than {minimum} element(s)",
        "not_inclusive_one": "Array must contain more than {minimum} element",
        "not_inclusive_other": "Array must contain more than {minimum} elements"
      },
      "string": {
        "inclusive": "String must contain at least {minimum} character(s)",
        "inclusive_one": "String must contain at least {minimum} character",
        "inclusive_other": "String must contain at least {minimum} characters",
        "inclusive_with_path": "{path} must contain at least {minimum} character(s)",
        "inclusive_with_path_one": "{path} must contain at least {minimum} character",
        "inclusive_with_path_other": "{path} must contain at least {minimum} characters",
        "not_inclusive": "String must contain over {minimum} character(s)",
        "not_inclusive_one": "String must contain over {minimum} character",
        "not_inclusive_other": "String must contain over {minimum} characters",
        "not_inclusive_with_path": "{path} must contain over {minimum} character(s)",
        "not_inclusive_with_path_one": "{path} must contain over {minimum} character",
        "not_inclusive_with_path_other": "{path} must contain over {minimum} characters"
      },
      "number": {
        "inclusive": "Number must be greater than or equal to {minimum}",
        "inclusive_with_path": "{path} must be greater than or equal to {minimum}",
        "not_inclusive": "Number must be greater than {minimum}",
        "not_inclusive_with_path": "{path} must be greater than {minimum}"
      },
      "set": {
        "inclusive": "Invalid input",
        "not_inclusive": "Invalid input"
      },
      "date": {
        "inclusive": "Date must be greater than or equal to {- minimum, datetime}",
        "not_inclusive": "Date must be greater than {- minimum, datetime}"
      }
    },
    "too_big": {
      "array": {
        "inclusive": "Array must contain at most {maximum} element(s)",
        "inclusive_one": "Array must contain at most {maximum} element",
        "inclusive_other": "Array must contain at most {maximum} elements",
        "not_inclusive": "Array must contain less than {maximum} element(s)",
        "not_inclusive_one": "Array must contain less than {maximum} element",
        "not_inclusive_other": "Array must contain less than {maximum} elements"
      },
      "string": {
        "inclusive": "String must contain at most {maximum} character(s)",
        "inclusive_one": "String must contain at most {maximum} character",
        "inclusive_other": "String must contain at most {maximum} characters",
        "inclusive_with_path": "{path} must contain at most {maximum} character(s)",
        "inclusive_with_path_one": "{path} must contain at most {maximum} character",
        "inclusive_with_path_other": "{path} must contain at most {maximum} characters",
        "not_inclusive": "String must contain under {maximum} character(s)",
        "not_inclusive_one": "String must contain under {maximum} character",
        "not_inclusive_other": "String must contain under {maximum} characters",
        "not_inclusive_with_path": "{path} must contain under {maximum} character(s)",
        "not_inclusive_with_path_one": "{path} must contain under {maximum} character",
        "not_inclusive_with_path_other": "{path} must contain under {maximum} characters"
      },
      "number": {
        "inclusive": "Number must be less than or equal to {maximum}",
        "inclusive_with_path": "{path} must be less than or equal to {maximum}",
        "not_inclusive": "Number must be less than {maximum}",
        "not_inclusive_with_path": "{path} must be less than {maximum}"
      },
      "set": {
        "inclusive": "Invalid input",
        "not_inclusive": "Invalid input"
      },
      "date": {
        "inclusive": "Date must be smaller than or equal to {- maximum, datetime}",
        "not_inclusive": "Date must be smaller than {- maximum, datetime}"
      }
    },
    "customValidation": { 
      "confirmPassword_match": "Passwords do not match"
    }
  }
}
```
5. OPTIONAL customValidation messages, not part of zod - See above item - customValidation: {}
**component/Form/implementation/useValidationSchema.ts**
```ts
import { PropsFormRegister } from "@/@types";
import { TranslationValues } from "next-intl";
import { z, ZodType } from "zod"; // Add new import
import en from "@/../messages/en.json";

type firstKey = keyof typeof en.zod;

type TasProp = (
  key: firstKey | `${firstKey}.confirmPassword_match`,
  val?: TranslationValues | undefined
) => string;

export const useValidationSchema = (
  t?: TasProp
): ZodType<PropsFormRegister> => {
  return z
    .object({
      regUsername: z.string().min(3),
      regEmail: z.string().email(),
      regPassword: z.string().min(8).max(20),
      regConfirmPassword: z.string(),
    })
    .refine((data) => data.regPassword === data.regConfirmPassword, {
      message: t?.("customValidation.confirmPassword_match"),
      path: ["regConfirmPassword"],
    });
};
```

6. Using the validation in react-hook-form - **FormRegister.tsx**
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

done. 
Enjoy!