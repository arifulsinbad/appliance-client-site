"use client";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { Button, Input, message } from "antd";

import { DeleteOutlined, ReloadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useDebounced } from "@/redux/hooks";
import UMTable from "@/components/ui/UMTable";

import dayjs from "dayjs";
import UMModal from "@/components/ui/UMModal";

import { useRepairingCategoriesQuery } from "@/redux/api/features/repairingCategoryApi";
import { useDeletePaymentMutation } from "@/redux/api/features/paymentApi";
import { getUserInfo } from "@/services/auth.service";

const PaymentPage = () => {
  const query: Record<string, any> = {};
  const [deletePayment] = useDeletePaymentMutation();

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<string>("");
  const { id } = getUserInfo() as any;
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
  const { data, isLoading } = useRepairingCategoriesQuery({ ...query });
  console.log(data);

  const repairingCategories = data?.repairingCategories?.data;
  const meta = data?.meta;

  const columns = [
    {
      title: "User Name",
      dataIndex: "RepairingPayment",
      render: function (data: any) {
        return data?.map((payment: any) => (
          <p key={payment?.id}>{payment?.user?.name}</p>
        ));
      },
    },
    {
      title: "Category",
      dataIndex: "RepairingPayment",
      render: function (data: any) {
        return data?.map((payment: any) => (
          <p key={payment?.id}>{payment?.repairingCategory?.title}</p>
        ));
      },
    },
    {
      title: "Email",
      dataIndex: "RepairingPayment",
      render: function (data: any) {
        return data?.map((payment: any) => (
          <p key={payment?.id}>{payment?.user?.email}</p>
        ));
      },
    },
    {
      title: "Number",
      dataIndex: "RepairingPayment",
      render: function (data: any) {
        return data?.map((payment: any) => (
          <p key={payment?.id}>{payment?.user?.contactNo}</p>
        ));
      },
    },

    {
      title: "Created At",
      dataIndex: "RepairingPayment",
      render: function (data: any) {
        return data?.map((payment: any) => (
          <p key={payment?.id}>
            {dayjs(payment?.createdAt).format("MMM D, YYYY hh:mm A")}
          </p>
        ));
      },
    },

    {
      title: "Action",
      dataIndex: "RepairingPayment",
      render: function (data: any) {
        console.log(data);
        return data?.map((payment: any) => (
          <>
            <Button
              type="primary"
              onClick={() => {
                setOpen(true);
                setCategoryId(payment?.id);
              }}
              danger
              style={{ marginLeft: "3px" }}
            >
              <DeleteOutlined />
            </Button>
          </>
        ));
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

  const deleteuserHandler = async (id: string) => {
    // console.log(id);
    try {
      const res = await deletePayment(id);
      if (res) {
        message.success("Payment Successfully Deleted!");
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
            label: "admin",
            link: "admin",
          },
        ]}
      />
      <ActionBar title="Payment List">
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
        dataSource={repairingCategories}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />

      <UMModal
        title="Remove payment"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteuserHandler(categoryId)}
      >
        <p className="my-5">Do you want to remove this payment?</p>
      </UMModal>
    </div>
  );
};

export default PaymentPage;
