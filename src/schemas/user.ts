import * as yup from "yup";

export const userShemas = yup.object().shape({
  password: yup.string().min(6).max(32).required("Password is required"),

  name: yup.string().required(" Name is required"),

  email: yup.string().email().required("Email is required"),

  contactNo: yup.string().required(" Contact No is required"),
  address: yup.string().required(" Address is required"),

  dateOfBirth: yup.string().required("Date of birth is required"),
});
