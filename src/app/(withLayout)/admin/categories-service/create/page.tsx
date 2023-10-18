"use client";

import Form from "@/components/Forms/Form";

import FormInput from "@/components/Forms/FormInput";

import FormTextArea from "@/components/Forms/FormTextArea";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UploadImage from "@/components/ui/UploadImage";
import { useRepairingCategoryMutation } from "@/redux/api/features/repairingCategoryApi";

import { Button, Col, Row, message } from "antd";

const CreateCategoryPage = () => {
  const [repairingCategory] = useRepairingCategoryMutation();
  //@ts-ignore

  const onSubmit = async (values: any) => {
    const obj = { ...values };
    console.log(obj);
    const file = obj["file"];
    delete obj["file"];
    const data = JSON.stringify(obj);
    const formData = new FormData();
    formData.append("file", file as Blob);
    formData.append("data", data);
    message.loading("Creating...");
    try {
      await repairingCategory(formData);
      message.success("Repairing Category created successfully!");
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: "admin",
            link: "/admin",
          },
          {
            label: "admin",
            link: "/admin",
          },
        ]}
      />
      <h1>Create Repairing Category</h1>

      <div>
        <Form submitHandler={onSubmit}>
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
              margin: "0px 20px",
            }}
          >
            <p
              style={{
                fontSize: "18px",
                marginBottom: "10px",
              }}
            >
              Repairing Category Information
            </p>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="title"
                  size="large"
                  label="Category Title"
                  required
                />
              </Col>{" "}
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <UploadImage name="file" />
              </Col>
              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea name="location" label="Location" rows={4} />
              </Col>
              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea name="details" label="Service Details" rows={4} />
              </Col>
            </Row>

            <Button htmlType="submit" type="primary">
              Create
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateCategoryPage;
