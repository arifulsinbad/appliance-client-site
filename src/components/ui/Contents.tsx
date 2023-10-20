"use client";

import { Layout } from "antd";

import Header from "./Header";
import { ReactElement, ReactNode } from "react";

const { Content } = Layout;
const Contents = ({ children }: { children: ReactNode | ReactElement }) => {
  return (
    <Content style={{ minHeight: "100vh" }}>
      <Header />

      {children}
    </Content>
  );
};

export default Contents;
