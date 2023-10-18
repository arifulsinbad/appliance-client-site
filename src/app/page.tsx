"use client";
import Carousels from "@/components/ui/Carousels";
import Contents from "@/components/ui/Contents";
import Footers from "@/components/ui/Footers";
import HomeCategories from "@/components/ui/HomeCategories";
import { Divider, Layout } from "antd";

const HomePage = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout>
      <Contents>
        {children}
        <Carousels />
        <Divider style={{ fontSize: "3em", fontWeight: "bold" }} plain>
          Repairing Category
        </Divider>
        <HomeCategories />
      </Contents>
      <Footers />
    </Layout>
  );
};

export default HomePage;
