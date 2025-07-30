import React, { useRef } from "react";
import {  useFormContext } from "react-hook-form";
import { Button } from "@/components/Form/Button/Button";
import { FormFieldEmail } from "./FormFieldEmail";
import { FormFieldPassword } from "./FormFieldPassword";
import { FormFieldConfirmPassword } from "./FormFieldConfirmPassword";
import { FormFieldUsername } from "./FormFieldUsername";

import styles from "@/components/Form/Form.module.css";

import { PropsFormRegister } from "@/@types";
import { useTranslations } from "next-intl";

export const FormInputs = () => {
  
  const t = useTranslations("Register");
  const T_legend = t("legend");

  const tGeneric = useTranslations("Generic");
  const T_reset = tGeneric("reset");
  const T_submit = tGeneric("submit");

  const methods = useFormContext<PropsFormRegister>();
  const { reset, formState } = methods;
  const { defaultValues } = formState;

  const refSubmittedValues = useRef(defaultValues);
  const handleReset = () => {
    reset(refSubmittedValues.current);
  };

  return (
    <>
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
    </>
  );
};
