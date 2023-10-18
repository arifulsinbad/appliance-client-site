import React from "react";
import { Carousel } from "antd";
import carouselPic from "@/asserts/carousel.jpg";
import { url } from "inspector";
import Image from "next/image";

const contentStyle: React.CSSProperties = {
  height: "200px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
  fontSize: "5em",
};

const Carousels = () => (
  <Carousel autoplay>
    <div>
      <Image
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "auto",
          width: "100%",
        }}
        src={carouselPic}
        alt=""
        width={500}
        property="relative"
      />
    </div>
    <div>
      <h3 style={contentStyle}>UPCOMING</h3>
    </div>
  </Carousel>
);

export default Carousels;
