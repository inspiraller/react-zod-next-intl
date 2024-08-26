import React from "react";

import { useFormContext } from "react-hook-form";
import { PropsFormRegister } from "@/@types";
import FormField from "@/component/Form/FormField/FormField";
import { useTranslations } from "next-intl";

export const FormFieldPassword = () => {
  const { register, formState } = useFormContext<PropsFormRegister>();
  const { errors } = formState;
  const t = useTranslations('Register');

  return (
    <FormField
      type="password"
      label={t('password')}
      placeholder=""
      name="regPassword"
      register={register}
      errors={errors}
    />
  );
};
