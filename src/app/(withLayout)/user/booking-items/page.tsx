"use client";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { Button, Col, Input, Rate, Row, Tooltip, message } from "antd";
import Link from "next/link";
import { DeleteOutlined, ReloadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useDebounced } from "@/redux/hooks";
import UMTable from "@/components/ui/UMTable";

import dayjs from "dayjs";
import UMModal from "@/components/ui/UMModal";

import {
  useBookingServicesQuery,
  useDeleteBookingMutation,
} from "@/redux/api/features/bookingApi";

import { getUserInfo } from "@/services/auth.service";
import Form from "@/components/Forms/Form";
import { useCategoryRoportMutation } from "@/redux/api/features/repairingCategoryApi";
import FormTextArea from "@/components/Forms/FormTextArea";
import { usePaymentMutation } from "@/redux/api/features/paymentApi";

const CategoryPage = () => {
  const query: Record<string, any> = {};
  const { id } = getUserInfo() as any;

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<string>("");
  const [deleteBooking] = useDeleteBookingMutation();
  const [payment] = usePaymentMutation();
  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  if (!!id) {
    query["userId"] = id;
  }
  const debouncedSearchTerm = useDebounced({
    searchQuary: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }
  const { data, isLoading } = useBookingServicesQuery({ ...query });
  // console.log(data);

  const bookingServices = data?.bookingServices;
  const meta = data?.meta;
  const handlePayment = (data: any) => {
    console.log(data);
    const redData = { repairingCategoryId: data };
    payment(redData);
    message.success("Payment Success");
  };
  const columns = [
    {
      title: "Category Name",

      render: function (data: any) {
        return <p>{data?.repairingCategory?.title}</p>;
      },
    },
    {
      title: "User Servicer",
      render: function (data: any) {
        return <p>{data?.repairingCategory?.user?.name}</p>;
      },
    },
    {
      title: "Number",
      render: function (data: any) {
        return <p>{data?.repairingCategory?.user?.contactNo}</p>;
      },
    },

    {
      title: "Details",
      dataIndex: "details",
    },
    {
      title: "Location",
      render: function (data: any) {
        return <p>{data?.repairingCategory?.location}</p>;
      },
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },

    {
      title: "Action",

      render: function (data: any) {
        console.log(data);
        return (
          <>
            <Tooltip title="Rating" color={"orange"} key={"orange"}>
              <Rate />
            </Tooltip>
            <Button
              style={{
                margin: "0px 5px",
              }}
              onClick={() => handlePayment(data?.repairingCategory?.id)}
              type="primary"
            >
              Payment
            </Button>

            <Button
              type="primary"
              onClick={() => {
                setOpen(true);
                setCategoryId(data?.repairingCategory?.id);
              }}
              danger
              style={{ marginLeft: "3px" }}
            >
              <DeleteOutlined />
            </Button>
          </>
        );
      },
    },
  ];
  const onPaginationChange = (page: number, pageSize: number) => {
    console.log("Page:", page, "PageSize:", pageSize);
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    // console.log(order, field);
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };
  const [categoryRoport] = useCategoryRoportMutation();
  const onSubmit = async (data: any) => {
    data["repairingCategoryId"] = categoryId;
    console.log(data);

    try {
      const res: any = await categoryRoport(data);
      if (!!res.data) {
        message.success("Reported success");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };

  const deleteBookingHandler = async (id: string) => {
    // console.log(id);
    try {
      const res = await deleteBooking(id);
      if (res) {
        message.success("Delete Booking Successfully Deleted!");
        setOpen(false);
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: "user",
            link: "user",
          },
        ]}
      />
      <ActionBar title="Booking List">
        <Input
          size="large"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "20%",
          }}
        />
        <div>
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <Button
              style={{ margin: "0px 5px" }}
              type="primary"
              onClick={resetFilters}
            >
              <ReloadOutlined />
            </Button>
          )}
        </div>
      </ActionBar>

      <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={bookingServices}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />

      <UMModal
        title="Remove Booking"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteBookingHandler(categoryId)}
        okText="Delete"
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
                <FormTextArea name="report" label="Report Text" rows={4} />
              </Col>
            </Row>
          </div>
          <Button htmlType="submit" type="primary">
            Report
          </Button>
        </Form>
      </UMModal>
    </div>
  );
};

export default CategoryPage;
