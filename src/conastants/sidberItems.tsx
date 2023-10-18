"use client";
import { MenuProps } from "antd";
import { TableOutlined, ProfileOutlined } from "@ant-design/icons";
import Link from "next/link";
import { USER_ROLE } from "./role";
export const sidberItems = (role: string) => {
  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: "Profile",
      key: "profile",
      icon: <ProfileOutlined />,
      children: [
        {
          label: <Link href={`/${role}`}>Profile Account</Link>,
          key: `/${role}`,
        },
      ],
    },
  ];
  const AdminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: (
        <Link href={`/${role}/categories-service`}>Categories Service</Link>
      ),
      icon: <TableOutlined />,
      key: `/${role}/categories-service`,
    },

    {
      label: <Link href={`/${role}/payment-list`}>Payment List</Link>,
      icon: <TableOutlined />,
      key: `/${role}/payment-list`,
    },
    {
      label: <Link href={`/${role}/report-list`}>Report List</Link>,
      icon: <TableOutlined />,
      key: `/${role}/report-list`,
    },
  ];
  const UserSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: <Link href={`/${role}/booking-items`}>Booking Items</Link>,
      icon: <TableOutlined />,
      key: `/${role}/booking-items`,
    },
  ];
  const SuperAdminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: <Link href={`/${role}/manage-user`}>Manage User</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-user`,
    },
    {
      label: <Link href={`/${role}/all-payment`}>All Payment</Link>,
      icon: <TableOutlined />,
      key: `/${role}/all-payment`,
    },

    {
      label: <Link href={`/${role}/all-report`}>All Report</Link>,
      icon: <TableOutlined />,
      key: `/${role}/all-report`,
    },
  ];

  if (role === USER_ROLE.SUPER_ADMIN) return SuperAdminSidebarItems;
  else if (role === USER_ROLE.ADMIN) return AdminSidebarItems;
  else if (role === USER_ROLE.USER) return UserSidebarItems;
  else {
    return defaultSidebarItems;
  }
};
