"use client";
import Carousels from "@/components/ui/Carousels";
import CategoryCard from "@/components/ui/CategoryCard";
import Contents from "@/components/ui/Contents";
import Footers from "@/components/ui/Footers";

import { Divider, Layout } from "antd";
import { ReactElement, ReactNode } from "react";

const HomePage = ({ children }: any) => {
  return (
    <Layout>
      <Contents>
        {children}
        <Carousels />
        <Divider style={{ fontSize: "3em", fontWeight: "bold" }} plain>
          Repairing Category
        </Divider>
        <CategoryCard />
      </Contents>
      <Footers />
    </Layout>
  );
};

export default HomePage;
