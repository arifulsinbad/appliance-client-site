"use client";

import { Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { errorMessage } from "../ui/Shema-validator";

interface ITnput {
  type?: string;
  name: string;
  size?: "large" | "small";
  value?: string | string[] | undefined;
  placeholder?: string;
  validation?: object;
  label?: string;
  required?: boolean;
}

const FormInput = ({
  name,
  type,
  size,
  value,
  placeholder,
  validation,
  label,
  required,
}: ITnput) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const errorMessages = errorMessage(errors, name);

  return (
    <>
      {required ? <span style={{ color: "red" }}>*</span> : null}
      {label ? label : undefined}
      <Controller
        control={control}
        name={name}
        render={({ field }) =>
          type === "password" ? (
            <Input.Password
              type={type}
              size={size}
              placeholder={placeholder}
              {...field}
              value={value ? value : field.value}
              style={{ width: "100%" }}
            />
          ) : (
            <Input
              type={type}
              size={size}
              placeholder={placeholder}
              {...field}
              value={value ? value : field.value}
              style={{ width: "100%" }}
            />
          )
        }
      />
      <>
        <small style={{ color: "red" }}>{errorMessages}</small>
      </>
    </>
  );
};

export default FormInput;
