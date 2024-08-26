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
