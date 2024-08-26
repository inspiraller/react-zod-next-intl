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
  const T_reset = t('reset');
  const T_submit = t('submit');

  const zodValidationSchema = useValidationSchema(tZod);

  const methods = useForm<PropsFormRegister>({
   resolver: zodResolver(zodValidationSchema),
  });
  const { handleSubmit, reset, formState } = methods;

  const { defaultValues } = formState;
  const refSubmittedValues = useRef(defaultValues);
  const handleReset = () => {
    console.log("reset", refSubmittedValues.current);
    reset(refSubmittedValues.current);
  };

  const {
    mutate,
    isError,
    isSuccess,
    data: dataResponse,
  } = useMutateRegister();
  console.log("mutate response", isSuccess, dataResponse);
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
          <Button type="reset" onClick={handleReset} variant="reset">
            {T_reset}
          </Button>
          <Button type="submit" variant="primary">
            {T_submit}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
