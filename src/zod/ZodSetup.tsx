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
