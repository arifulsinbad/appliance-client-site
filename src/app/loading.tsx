"use client";

import { Row, Spin } from "antd";

const loading = () => {
  return (
    <div>
      <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
        <Spin tip="Loading" size="large">
          <div className="content" />
        </Spin>
      </Row>
    </div>
  );
};

export default loading;
