import { useBookingServiceMutation } from "@/redux/api/features/bookingApi";
import { useRepairingCategoriesQuery } from "@/redux/api/features/repairingCategoryApi";
import { useDebounced } from "@/redux/hooks";
import { ReloadOutlined } from "@ant-design/icons";
import { Button, Col, Input, Pagination, Row, Switch, message } from "antd";

import React, { useState } from "react";
import FormTextArea from "../Forms/FormTextArea";
import UMModal from "./UMModal";
import Form from "../Forms/Form";

import Cart from "./Cart";
const CategoryCard = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const debouncedSearchTerm = useDebounced({
    searchQuary: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }
  const { data, isLoading } = useRepairingCategoriesQuery({ ...query });

  const repairingCategories = data?.repairingCategories?.data;
  console.log(repairingCategories);
  const meta = data?.meta;
  const onPaginationChange = (page: number, pageSize: number) => {
    console.log("Page:", page, "PageSize:", pageSize);
    setPage(page);
    setSize(pageSize);
  };
  const onChange = (value: boolean) => {
    // console.log(order, field);
    setSortBy(!!value ? "createdAt" : "createdAt");
    setSortOrder(value ? "asc" : "desc");
  };
  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };
  const [bookingService] = useBookingServiceMutation();
  const onSubmit = async (data: any) => {
    data["repairingCategoryId"] = categoryId;
    console.log(data);

    try {
      const res: any = await bookingService(data);
      if (!!res.data) {
        message.success("Booking Service created successfully!");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",

          margin: "auto",
        }}
      >
        <Input
          size="large"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "30%",
            display: "flex",
            justifyContent: "center",
          }}
        />
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        {(!!sortBy || !!sortOrder || !!searchTerm) && (
          <Button
            style={{ margin: "0px 5px" }}
            type="primary"
            onClick={resetFilters}
          >
            <ReloadOutlined />
          </Button>
        )}
        <Switch defaultChecked onChange={onChange} />
      </div>
      <div
        style={{
          marginBottom: "20px",
          marginTop: "80px",

          width: "90%",
          margin: "70px auto",
        }}
      >
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          {repairingCategories?.map((items: any) => (
            <Cart
              items={items}
              key={items?.id}
              setCategoryId={setCategoryId}
              setOpen={setOpen}
            />
          ))}
        </Row>
      </div>
      <Col
        style={{ display: "flex", justifyContent: "center", margin: "20px" }}
      >
        <Pagination
          showSizeChanger={true}
          onShowSizeChange={onPaginationChange}
          defaultCurrent={page}
          total={meta?.total}
          onChange={onPaginationChange}
        />
      </Col>
      <UMModal
        title="Booking Details"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => setOpen(false)}
      >
        <Form submitHandler={onSubmit}>
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <Row
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
              justify={"center"}
              align={"middle"}
            >
              <Col span={24} style={{ margin: "10px 0" }}>
                <FormTextArea name="location" label="Location" rows={4} />
              </Col>
              <Col span={24} style={{ margin: "10px 0" }}>
                <FormTextArea name="details" label="Datails" rows={4} />
              </Col>
            </Row>
          </div>
          <Button htmlType="submit" type="primary">
            Booking
          </Button>
        </Form>
      </UMModal>
    </div>
  );
};

export default CategoryCard;
