"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import {
  useCategoryReviewMutation,
  useGetRepairingCategoryQuery,
} from "@/redux/api/features/repairingCategoryApi";
import { ArrowRightOutlined, SendOutlined } from "@ant-design/icons";
import { Button, Col, Divider, List, Row, Typography, message } from "antd";
import Image from "next/image";
import { useParams } from "next/navigation";

const DetailsPage = () => {
  const params: any = useParams();
  const { data, isLoading } = useGetRepairingCategoryQuery(params?.id);
  const [categoryReview] = useCategoryReviewMutation();
  const onSubmit = async (data: any) => {
    data["repairingCategoryId"] = params?.id;
    console.log(data);

    try {
      const res: any = await categoryReview(data);
      if (!!res.data) {
        message.success("Post Review successfully!");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const resData = data?.data;
  return (
    <div>
      <div
        style={{
          width: "80%",
          margin: "auto",

          marginTop: "30px",
        }}
      >
        <h1
          style={{
            margin: "10px",
            marginBottom: "50px",
            textAlign: "center",
          }}
        >
          Category Details
        </h1>
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          style={{
            margin: "10px",
          }}
          justify={"center"}
          align={"middle"}
        >
          <Col
            className="gutter-row"
            span={12}
            style={{
              marginBottom: "10px",
            }}
            xs={24}
            sm={24}
            md={8}
            lg={8}
          >
            <Image src={resData?.image} alt="image" width={300} height={300} />
          </Col>
          <Col
            className="gutter-row"
            span={12}
            style={{
              marginBottom: "10px",
              margin: "0px 20px",
            }}
            xs={24}
            sm={24}
            md={8}
            lg={8}
          >
            <h1
              style={{
                marginBottom: "20px",
              }}
            >
              {resData?.title}
            </h1>
            <h4
              style={{
                marginBottom: "20px",
              }}
            >
              Rating:{resData?.rating}
            </h4>
            <h3>Datails</h3>
            <p
              style={{
                marginBottom: "20px",
              }}
            >
              {resData?.details}
            </p>
            <h3>Location</h3>
            <p>{resData?.location}</p>
          </Col>
        </Row>
        <Divider style={{ fontSize: "2em" }}>Review</Divider>
        <Form submitHandler={onSubmit}>
          <Row justify={"center"} align={"middle"}>
            <Col>
              <Col
                className="gutter-row"
                span={32}
                style={{
                  marginBottom: "10px",
                  margin: "0px 10px",
                }}
              >
                <FormInput type="text" name="review" size="large" label="" />
              </Col>
            </Col>
            <Button type="primary" htmlType="submit">
              <SendOutlined />
            </Button>
          </Row>
        </Form>
        <div>
          <List
            style={{ margin: "20px", fontSize: "20px" }}
            header={<div>Header</div>}
            footer={<div>Footer</div>}
            bordered
            dataSource={resData?.reviews}
            renderItem={(item: any) => (
              <List.Item>
                <Typography.Text mark>
                  <ArrowRightOutlined />
                </Typography.Text>{" "}
                {item.review}
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
