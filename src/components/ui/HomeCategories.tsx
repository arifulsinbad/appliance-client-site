"use client";

import { Button, Col, Input, List, Row, Typography, message } from "antd";
import Link from "next/link";
import {
  AccountBookOutlined,
  ArrowRightOutlined,
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useDebounced } from "@/redux/hooks";
import UMTable from "@/components/ui/UMTable";

import dayjs from "dayjs";
import UMModal from "@/components/ui/UMModal";
import {
  useDeleteRepairingCategoryMutation,
  useRepairingCategoriesQuery,
} from "@/redux/api/features/repairingCategoryApi";
import Image from "next/image";
import Form from "../Forms/Form";
import FormInput from "../Forms/FormInput";
import FormTextArea from "../Forms/FormTextArea";
import { useBookingServiceMutation } from "@/redux/api/features/bookingApi";

const HomeCategories = () => {
  const query: Record<string, any> = {};
  const [deleteRepairingCategory] = useDeleteRepairingCategoryMutation();

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
  console.log(data);

  const repairingCategories = data?.repairingCategories?.data;
  const meta = data?.meta;

  const columns = [
    {
      title: "",
      dataIndex: "image",
      render: function (data: any) {
        return <Image src={data} alt="image" width={50} height={50} />;
      },
    },
    {
      title: "Servicers",
      dataIndex: "user",
      render: function (data: any) {
        return <h3>{data.name}</h3>;
      },
    },
    {
      title: "Category Name",
      dataIndex: "title",
      sorter: true,
    },

    {
      title: " Rating",
      dataIndex: "rating",
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
        // console.log(data);
        return (
          <>
            <Link href={`/details/${data?.id}`}>
              <Button
                style={{
                  margin: "0px 5px",
                }}
                onClick={() => console.log(data)}
                type="primary"
              >
                Details
              </Button>
            </Link>
            {data?.status ? (
              <Button
                type="primary"
                onClick={() => {
                  setOpen(true);
                  setCategoryId(data?.id);
                }}
                style={{ marginLeft: "3px" }}
              >
                Booking
              </Button>
            ) : (
              <Button danger>Booked</Button>
            )}
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

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };

  const deleteCategoryHandler = async (id: string) => {
    // console.log(id);
    try {
      const res = await deleteRepairingCategory(id);
      if (res) {
        message.success("Repairing Category Successfully Deleted!");
        setOpen(false);
      }
    } catch (error: any) {
      message.error(error.message);
    }
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
          margin: "10px 0px",
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

      <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={repairingCategories}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />

      <UMModal
        title="Booking Details"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteCategoryHandler(categoryId)}
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

export default HomeCategories;
