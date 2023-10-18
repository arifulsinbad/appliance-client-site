import PageLogin from "@/components/login/LoginPage";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "UMS/Login",
};
const Login = () => {
  return (
    <>
      <PageLogin />
    </>
  );
};

export default Login;
