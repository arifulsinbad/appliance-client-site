"use client";
import React, { useState } from "react";
import { Layout, Menu } from "antd";
const { Sider } = Layout;

import { sidberItems } from "@/conastants/sidberItems";
import { getUserInfo } from "@/services/auth.service";

const Sidbers = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { role } = getUserInfo() as any;

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={280}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "sticky",
        top: 0,
        bottom: 0,
        left: 0,
      }}
    >
      <div
        style={{
          marginTop: "10px",
          color: "white",
          fontSize: "2rem",
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: "1rem",
        }}
      ></div>
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={sidberItems(role)}
      />
    </Sider>
  );
};

export default Sidbers;
