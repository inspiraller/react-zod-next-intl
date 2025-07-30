import React from "react";
import { FormProvider, useForm } from "react-hook-form";

import { useZodSchema } from "./useZodSchema";
import styles from "@/components/Form/Form.module.css";

import useMutateRegister from "./useMutationRegister";
import { PropsFormRegister } from "@/@types";
import { useTranslations } from "next-intl";

import { zodResolver } from "@/zod/zodResolver";
import { FormInputs } from "./FormInputs/FormInput";
import { ResponseError } from "./FormResponse/ResponseError";
import { Success } from "./FormResponse/Success";
import { Loading } from "./FormResponse/Loading";

export const FormExample = () => {
  const t = useTranslations();
  const zodSchema = useZodSchema(t);

  const methods = useForm<PropsFormRegister>({
    resolver: zodResolver(zodSchema),
  });

  const { handleSubmit } = methods;

  const {
    mutate,
    isError,
    isSuccess,
    status,
    error,
  } = useMutateRegister();

  const onSubmit = (values: PropsFormRegister) => {
    console.log("handle submit", values);
    mutate(values);
  };

  console.log('isLoading..')
  const isLoading = status === "pending";


  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <FormInputs />
        {isLoading && <Loading />}
        {isError && <ResponseError error={error.toString()} />}
        {isSuccess && <Success />}
      </form>
    </FormProvider>
  );
};
