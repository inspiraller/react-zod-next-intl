import React from "react";

import { useFormContext } from "react-hook-form";
import FormField from "@/component/Form/FormField/FormField";
import { PropsFormRegister } from "@/@types";
import { useTranslations } from "next-intl";

export const FormFieldUsername = () => {
  const { register, formState } = useFormContext<PropsFormRegister>();
  const { errors } = formState;
  const t = useTranslations('Register');


  return (
    <FormField
      type="text"
      label={t('username')}
      placeholder="username"
      name="regUsername"
      register={register}
      errors={errors}
    />
  );
};
