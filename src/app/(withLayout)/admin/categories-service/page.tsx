"use client";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { Button, Input, message } from "antd";
import Link from "next/link";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { use, useState } from "react";
import { useDebounced } from "@/redux/hooks";
import UMTable from "@/components/ui/UMTable";

import dayjs from "dayjs";
import UMModal from "@/components/ui/UMModal";
import {
  useBookingDecreamentMutation,
  useBookingIncrementMutation,
  useDeleteRepairingCategoryMutation,
  useRepairingCategoriesQuery,
  useUpdateRepairingCategoryMutation,
} from "@/redux/api/features/repairingCategoryApi";
import { getUserInfo } from "@/services/auth.service";

const CategoryPage = () => {
  const query: Record<string, any> = {};
  const [deleteRepairingCategory] = useDeleteRepairingCategoryMutation();

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<string>("");
  const [updateRepairingCategory] = useUpdateRepairingCategoryMutation();
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
  const updateHandlerF = async (data: any) => {
    const status = { status: false };
    await updateRepairingCategory({ id: data.id, body: status });
  };
  const updateHandlerT = async (data: any) => {
    const status = { status: true };
    await updateRepairingCategory({ id: data.id, body: status });
  };
  const columns = [
    {
      title: "Category Name",
      dataIndex: "title",
      sorter: true,
    },
    {
      title: " Booking Count",
      dataIndex: " bookingCount",
      sorter: true,
    },

    {
      title: " details",
      dataIndex: " details",
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
            {data?.status ? (
              <Button
                style={{
                  margin: "0px 5px",
                }}
                onClick={() => updateHandlerF(data)}
                type="primary"
              >
                OFF
              </Button>
            ) : (
              <Button
                style={{
                  margin: "0px 5px",
                }}
                onClick={() => updateHandlerT(data)}
                type="primary"
              >
                ON
              </Button>
            )}
            <Link href={`/admin/categories-service/edit/${data?.id}`}>
              <Button
                style={{
                  margin: "0px 5px",
                }}
                onClick={() => console.log(data?.id)}
                type="primary"
              >
                <EditOutlined />
              </Button>
            </Link>
            <Button
              type="primary"
              onClick={() => {
                setOpen(true);
                setCategoryId(data?.id);
              }}
              danger
              style={{ marginLeft: "3px" }}
            >
              <DeleteOutlined />
            </Button>
            <Link href={`/admin/booking-list/${data?.id}`}>
              <Button>See Booked</Button>
            </Link>
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
      <ActionBar title="Repairing Category List">
        <Input
          size="large"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "20%",
          }}
        />
        <div>
          <Link href="categories-service/create">
            <Button type="primary">Create</Button>
          </Link>
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
        title="Remove Category"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteCategoryHandler(categoryId)}
      >
        <p className="my-5">Do you want to remove this Category?</p>
      </UMModal>
    </div>
  );
};

export default CategoryPage;
