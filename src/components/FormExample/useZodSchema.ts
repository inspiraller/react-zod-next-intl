
import { TranslationValues } from "next-intl";
import { z } from "zod"; // Add new import
import en from "@/messages/en.json";

type firstKey = keyof typeof en;

type TasProp = (
  key: `${firstKey}.confirmPassword_match` | `${firstKey}.username_no_at`,
  val?: TranslationValues | undefined
) => string;

export const useZodSchema = (
  t?: TasProp
// ): ZodType<PropsFormRegister> => {
) => {
  return z
    .object({
      regUsername: z.string().min(3).refine(val => val.indexOf('@') === -1, {
        message: t?.("customValidation.username_no_at"),
      }),
      regEmail: z.email(),
      regPassword: z.string().min(8).max(20),
      regConfirmPassword: z.string(),
    })
    .refine((data) => data.regPassword === data.regConfirmPassword, {
      message: t?.("customValidation.confirmPassword_match"),
      path: ["regConfirmPassword"],
    });


    
};

