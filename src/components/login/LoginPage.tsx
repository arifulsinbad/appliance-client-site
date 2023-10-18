"use client";
import LoginImage from "../../asserts/Account-bro.png";
import { useUserLoginMutation } from "@/redux/api/features/authApi";
import { userLoginInfo } from "@/services/auth.service";
import { Button, Col, Row, message } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { loginShemas } from "@/schemas/login";
import Form from "../Forms/Form";
import FormInput from "../Forms/FormInput";

type FormValues = {
  id: string;
  password: string;
};
const PageLogin = () => {
  // console.log(getUserInfo());
  // console.log(isLoggedIn());
  const [userLogin] = useUserLoginMutation();
  const router = useRouter();

  const onsubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const res = await userLogin({ ...data }).unwrap();
      console.log(res);
      if (res?.data?.token) {
        router.push("/profile");
        message.success("User Login Success");
      }
      userLoginInfo({ accessToken: res?.data?.token });
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Row justify={"center"} align={"middle"} style={{ minHeight: "100vh" }}>
        <Col sm={12} md={16} lg={8}>
          <Image src={LoginImage} width={500} alt="login-image" />
        </Col>
        <Col sm={12} md={8} lg={8}>
          <h1>Fist Login Your Account</h1>
          <div style={{ margin: "15px 0px" }}>
            <Form submitHandler={onsubmit} resolver={yupResolver(loginShemas)}>
              <div style={{ margin: "15px 0px" }}>
                <FormInput
                  name="email"
                  type="text"
                  size="large"
                  label="Email"
                  required
                />
              </div>
              <div style={{ margin: "15px 0px" }}>
                <FormInput
                  name="password"
                  type="password"
                  size="large"
                  label="User Password"
                  required
                />
              </div>
              <Button
                style={{ margin: "15px 0px" }}
                type="primary"
                htmlType="submit"
              >
                Login
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PageLogin;
