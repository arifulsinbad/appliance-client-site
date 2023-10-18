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
import { useState } from "react";
import { useDebounced } from "@/redux/hooks";
import UMTable from "@/components/ui/UMTable";

import dayjs from "dayjs";
import UMModal from "@/components/ui/UMModal";

import {
  useBookingServicesQuery,
  useDeleteBookingMutation,
} from "@/redux/api/features/bookingApi";
import { useParams } from "next/navigation";

const BookingPage = () => {
  const query: Record<string, any> = {};
  const params = useParams();

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<string>("");
  const [deleteBooking] = useDeleteBookingMutation();
  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  if (!!params?.id) {
    query["repairingCategoryId"] = params?.id;
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

  const columns = [
    {
      title: "Category Name",

      render: function (data: any) {
        return <p>{data?.repairingCategory?.title}</p>;
      },
    },
    {
      title: "User Booked",
      render: function (data: any) {
        return <p>{data?.user?.name}</p>;
      },
    },
    {
      title: "Number",
      render: function (data: any) {
        return <p>{data?.user?.contactNo}</p>;
      },
    },

    {
      title: "Details",
      dataIndex: "details",
    },
    {
      title: "Location",
      dataIndex: "location",
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
            <Link href={`/admin/booking-list/${data?.id}`}>
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
            label: "admin",
            link: "admin",
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
        title="Remove Category"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteBookingHandler(categoryId)}
      >
        <p className="my-5">Do you want to remove this Booking?</p>
      </UMModal>
    </div>
  );
};

export default BookingPage;
