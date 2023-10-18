import * as yup from "yup";

export const loginShemas = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().min(6).max(32).required("Password is required"),
});
