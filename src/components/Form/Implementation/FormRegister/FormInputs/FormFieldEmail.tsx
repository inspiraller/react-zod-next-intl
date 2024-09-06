import React from "react";
import { PropsFormRegister } from "@/@types";

import { useFormContext } from "react-hook-form";
import FormField from "@/components/Form/FormField/FormField";
import { useTranslations } from "next-intl";

export const FormFieldEmail = () => {
  const { register, formState } = useFormContext<PropsFormRegister>();
  const { errors } = formState;

  const t = useTranslations('Register');

  return (
    <FormField
      type="email"
      label={t('email')}
      placeholder="Email"
      name="regEmail"
      register={register}
      errors={errors}
    />
  );
};
