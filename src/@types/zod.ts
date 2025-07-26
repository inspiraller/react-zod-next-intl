import z, { locales } from "zod";

export type zodLocale = keyof typeof locales;
export type zodLocaleError = z.core.$ZodErrorMap<z.core.$ZodIssue>; // locales[locale]().localeError; 

