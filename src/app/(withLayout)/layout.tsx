"use client";
import Contents from "@/components/ui/Contents";
import Sidbers from "@/components/ui/Sidbers";
import { isLoggedIn } from "@/services/auth.service";
import { Layout, Row, Spin } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const islogin = isLoggedIn();
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!islogin) {
      router.push("/login");
    }
    setLoading(true);
  }, [islogin, router]);
  if (!isLoading) {
    return (
      <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
        <Spin tip="Loading..." size="large">
          <div className="content" />
        </Spin>
      </Row>
    );
  }
  return (
    <Layout hasSider>
      <Sidbers />
      <Contents>{children}</Contents>
    </Layout>
  );
};

export default DashboardLayout;
