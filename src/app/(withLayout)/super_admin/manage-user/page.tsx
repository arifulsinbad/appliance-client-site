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
  useDeleteUserMutation,
  useGetAllUserQuery,
  useUpdateUserMutation,
} from "@/redux/api/features/registerApi";

const CategoryPage = () => {
  const query: Record<string, any> = {};
  const [deleteUser] = useDeleteUserMutation();

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<string>("");
  const [updateUser] = useUpdateUserMutation();

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
  const { data, isLoading } = useGetAllUserQuery({ ...query });
  console.log(data);

  const users = data?.users;
  const meta = data?.meta;
  const updateHandlerA = async (data: any) => {
    const admin = { role: "admin" };
    const res = await updateUser({ id: data.id, body: admin });
    if (res) {
      message.success("Role Update Success");
    }
  };
  const updateHandlerU = async (data: any) => {
    const user = { role: "user" };
    const res = await updateUser({ id: data.id, body: user });
    if (res) {
      message.success("Role Update Success");
    }
  };

  const columns = [
    {
      title: "User Name",
      dataIndex: "name",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: true,
    },
    {
      title: "Role",
      dataIndex: "role",
      sorter: true,
    },

    {
      title: "Number",
      dataIndex: "contactNo",
    },
    {
      title: "Address",
      dataIndex: "address",
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
            {data?.role !== "super_admin" && (
              <>
                {data?.role === "user" ? (
                  <Button
                    style={{
                      margin: "0px 5px",
                    }}
                    onClick={() => updateHandlerA(data)}
                    type="primary"
                  >
                    Admin
                  </Button>
                ) : (
                  <Button
                    style={{
                      margin: "0px 5px",
                    }}
                    onClick={() => updateHandlerU(data)}
                    type="primary"
                  >
                    User
                  </Button>
                )}
              </>
            )}
            <Link href={`/super_admin/manage-user/edit/${data?.id}`}>
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

  const deleteuserHandler = async (id: string) => {
    // console.log(id);
    try {
      const res = await deleteUser(id);
      if (res) {
        message.success("User Successfully Deleted!");
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
      <ActionBar title="Users List">
        <Input
          size="large"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "20%",
          }}
        />
        <div>
          <Link href="manage-user/create">
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
        dataSource={users}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />

      <UMModal
        title="Remove User"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteuserHandler(categoryId)}
      >
        <p className="my-5">Do you want to remove this User?</p>
      </UMModal>
    </div>
  );
};

export default CategoryPage;
