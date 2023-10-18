"use client";
import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import { genderOption } from "@/conastants/global";
import { useUserCreateMutation } from "@/redux/api/features/registerApi";
import { userShemas } from "@/schemas/user";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

const RegisterPage = () => {
  const [userCreate] = useUserCreateMutation();
  const router = useRouter();
  const onSubmit = async (data: any) => {
    console.log(data);

    try {
      const res: any = await userCreate(data);
      if (!!res.data) {
        message.success("Register created successfully!");
        router.push("/login");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <div
      style={{
        width: "70%",
        margin: "auto",
        marginTop: "50px",
      }}
    >
      <Form submitHandler={onSubmit} resolver={yupResolver(userShemas)}>
        <div
          style={{
            border: "1px solid #d9d9d9",
            borderRadius: "5px",
            padding: "15px",
            marginBottom: "10px",
          }}
        >
          <p
            style={{
              fontSize: "18px",
              marginBottom: "10px",
            }}
          >
            User Regitration
          </p>
          <Row
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            justify={"center"}
            align={"middle"}
          >
            <Col
              xs={24}
              sm={24}
              md={8}
              lg={8}
              className="gutter-row"
              span={8}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormInput
                type="text"
                name="name"
                size="large"
                label="First Name"
              />
            </Col>
            <Col
              xs={24}
              sm={24}
              md={8}
              lg={8}
              className="gutter-row"
              span={8}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormInput type="text" name="email" size="large" label="Email" />
            </Col>

            <Col
              xs={24}
              sm={24}
              md={8}
              lg={8}
              className="gutter-row"
              span={8}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormInput
                type="password"
                name="password"
                size="large"
                label="Password"
              />
            </Col>
            <Col
              xs={24}
              sm={24}
              md={8}
              lg={8}
              className="gutter-row"
              span={8}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormSelectField
                size="large"
                name="gender"
                options={genderOption}
                label="Gender"
                placeholder="Select"
              />
            </Col>
          </Row>
        </div>

        {/* basic info */}
        <div
          style={{
            border: "1px solid #d9d9d9",
            borderRadius: "5px",
            padding: "15px",
            marginBottom: "10px",
          }}
        >
          <p
            style={{
              fontSize: "18px",
              marginBottom: "10px",
            }}
          >
            Basic Information
          </p>
          <Row
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            justify={"center"}
            align={"middle"}
          >
            <Col
              xs={24}
              sm={24}
              md={8}
              lg={8}
              className="gutter-row"
              span={8}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormInput
                type="text"
                name="contactNo"
                size="large"
                label="Contact No."
              />
            </Col>

            <Col
              xs={24}
              sm={24}
              md={8}
              lg={8}
              className="gutter-row"
              span={8}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormDatePicker
                name="dateOfBirth"
                label="Date of birth"
                size="large"
              />
            </Col>

            <Col span={12} style={{ margin: "10px 0" }}>
              <FormTextArea name="address" label="Address" rows={4} />
            </Col>
          </Row>
        </div>
        <Button htmlType="submit" type="primary">
          Register
        </Button>
      </Form>
    </div>
  );
};

export default RegisterPage;
