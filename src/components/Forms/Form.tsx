"use client";

import { ReactElement, ReactNode, useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

type FormConfige = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};
type FormProps = {
  children?: ReactElement | ReactNode;
  submitHandler: SubmitHandler<any>;
} & FormConfige;
const Form = ({
  children,
  submitHandler,
  defaultValues,
  resolver,
}: FormProps) => {
  const formConfige: FormConfige = {};
  if (!!defaultValues) formConfige["defaultValues"] = defaultValues;
  if (!!resolver) formConfige["resolver"] = resolver;
  const methods = useForm<FormProps>(formConfige);
  const { handleSubmit, reset } = methods;

  const onSubmit = (data: any) => {
    submitHandler(data);

    reset();
  };
  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset, methods]);
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default Form;
