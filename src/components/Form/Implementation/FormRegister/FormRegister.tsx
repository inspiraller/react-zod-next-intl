import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useValidationSchema } from "./useValidationSchema";
import styles from "@/components/Form/Form.module.css";

import useMutateRegister from "./useMutationRegister";
import { PropsFormRegister } from "@/@types";
import { useTranslations } from "next-intl";
import { FormInputs } from "./FormInputs/FormInput";
import { ResponseError } from "./FormResponse/ResponseError";
import { Success } from "./FormResponse/Success";
import { Loading } from "./FormResponse/Loading";

export const FormRegister = () => {
  const tZod = useTranslations("zod");
  const zodValidationSchema = useValidationSchema(tZod);

  const methods = useForm<PropsFormRegister>({
    resolver: zodResolver(zodValidationSchema),
  });
  const { handleSubmit } = methods;

  const {
    mutate,
    isError,
    isSuccess,
    status,
    data: dataResponse,
    error
  } = useMutateRegister();

  const onSubmit = (values: PropsFormRegister) => {
    mutate(values);
  };

  const isLoading = status === 'pending';
  console.log("mutate=", {isError, isSuccess, error, dataResponse, status, isLoading});
  
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
