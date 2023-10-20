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

import {
  useDeleteReportMutation,
  useRepairingCategoriesQuery,
} from "@/redux/api/features/repairingCategoryApi";

const ReportPage = () => {
  const query: Record<string, any> = {};
  const [deleteReport] = useDeleteReportMutation();

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
      title: "User Name",
      dataIndex: "reportServices",
      render: function (data: any) {
        return data?.map((report: any) => (
          <p key={report?.id}>{report?.user?.name}</p>
        ));
      },
    },
    {
      title: "Email",
      dataIndex: "reportServices",
      render: function (data: any) {
        return data?.map((report: any) => (
          <p key={report?.id}>{report?.user?.email}</p>
        ));
      },
    },
    {
      title: "Number",
      dataIndex: "reportServices",
      render: function (data: any) {
        return data?.map((report: any) => (
          <p key={report?.id}>{report?.user?.contactNo}</p>
        ));
      },
    },
    {
      title: "Report",
      dataIndex: "reportServices",
      render: function (data: any) {
        return data?.map((report: any) => (
          <p key={report?.id}>{report?.report}</p>
        ));
      },
    },
    {
      title: "Created At",
      dataIndex: "reportServices",
      render: function (data: any) {
        return data?.map((report: any) => (
          <p key={report?.id}>
            {dayjs(report?.createdAt).format("MMM D, YYYY hh:mm A")}
          </p>
        ));
      },
    },

    {
      title: "Action",
      dataIndex: "reportServices",
      render: function (data: any) {
        console.log(data);
        return data?.map((report: any) => (
          <>
            <Button
              type="primary"
              onClick={() => {
                setOpen(true);
                setCategoryId(report?.id);
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
      const res = await deleteReport(id);
      if (res) {
        message.success("Report Successfully Deleted!");
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
            label: "super_admin",
            link: "super_admin",
          },
        ]}
      />
      <ActionBar title="Report List">
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
        title="Remove Report"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteuserHandler(categoryId)}
      >
        <p className="my-5">Do you want to remove this Report?</p>
      </UMModal>
    </div>
  );
};

export default ReportPage;
