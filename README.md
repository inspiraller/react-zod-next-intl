# Summary
This repo is an example how to use form validation in React, combining React hook form, Nextjs, Zod 4 with translations.
It uses zod 4 and takes advantage of its internal locales. There are about 42 of them. React hook form zodResolver breaks with zod 4 so I have a custom polyfill for this.

# Basic structure
## package.json - dependencies
```json
  "dependencies": {
    "@hookform/error-message": "^2.0.1",
    "i18next": "^25.3.2",
    "next": "^15.4.4",
    "next-intl": "^4.3.4",
    "react-hook-form": "^7.61.1",
    "zod": "^4.0.13"
  },
```
## _app.tsx
```tsx

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
```

## ZodSetup.tsx
```tsx
// Custom error map function for global translations

import z, { locales } from "zod";
import { useEffect } from "react";
import { zodLocale } from "@/@types";

interface Props {
  locale: zodLocale;
  children: React.ReactNode;
}
export const ZodSetup = ({ locale, children }: Props) => {
  useEffect(() => {
    if (locale) {
      const localeError = locales[locale]().localeError; // type: z.core.$ZodErrorMap<z.core.$ZodIssue>;
      z.config({ localeError });
    }
  }, [locale]);
  return <>{children}</>;
};
```

## React hook form example
```tsx
  const methods = useForm<PropsFormRegister>({
    resolver: zodResolver(zodValidationSchema),
  });
```

## zodResolver.ts
This is a polyfill for @hookform/resolvers which currently only works with zod 3. 
I'm sure this will be updated to work with zod 4. In the meantime we can use this
```tsx
import type { FieldErrors, FieldValues, ResolverResult, ResolverOptions } from 'react-hook-form';
import type { ZodType } from 'zod';

export const zodResolver = <T extends FieldValues = FieldValues>(
  schema: ZodType<T>
) => {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  return (
    values: T,
    _context?: any,
    _options?: ResolverOptions<T>
  ): ResolverResult<T> => {
      /* eslint-enable @typescript-eslint/no-unused-vars */
    console.log('Custom resolver called with values:', values);
    
    const result = schema.safeParse(values);
    console.log('Schema validation result:', result);
    
    if (result.success) {
      return {
        values: result.data,
        errors: {},
      };
    } else {
      const fieldErrors: Record<string, any> = {};
      
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path.join('.');
        if (fieldName && !fieldErrors[fieldName]) {
          fieldErrors[fieldName] = {
            type: issue.code,
            message: issue.message,
          };
        }
      });
      
      console.log('Validation errors:', fieldErrors);
      
      return {
        values: {},
        errors: fieldErrors as FieldErrors<T>,
      };
    }
  };
};
```
