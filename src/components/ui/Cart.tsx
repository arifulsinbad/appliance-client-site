"use client";
import { Button, Col } from "antd";
import Image from "next/image";
import Link from "next/link";

import dayjs from "dayjs";
import { getUserInfo } from "@/services/auth.service";
const Cart = ({ items, setCategoryId, setOpen }: any) => {
  const { id } = getUserInfo() as any;
  return (
    <Col xs={24} sm={24} md={12} lg={8} className="gutter-row">
      <div
        style={{
          width: "100%",
          border: "1px solid gray",
          borderRadius: "10px",
          height: "100%",
        }}
      >
        <Link href={`/details/${items.id}`}>
          <Image
            src={items?.image}
            alt="image"
            style={{
              width: "100%",
            }}
            width={500}
            height={300}
          />
          <Col>
            <h1>{items?.title}</h1>
          </Col>
        </Link>
        <div
          style={{ marginTop: "10px", fontWeight: "bold", marginLeft: "10px" }}
        >
          <div style={{ display: "flex" }}>
            <Col>
              <p style={{ marginTop: "10px" }}>Servicer: {items?.user?.name}</p>
              <p style={{ marginTop: "10px" }}>Rating: {items?.rating}</p>
            </Col>
            <Col>
              <p style={{ marginTop: "10px" }}>Location: {items?.location}</p>
            </Col>
          </div>
          <Col>
            {items && (
              <p style={{ marginTop: "10px" }}>
                Date:
                {dayjs(items.createdAt).format("MMM D, YYYY hh:mm A")}
              </p>
            )}
          </Col>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",

              marginTop: "20px",

              margin: "10px 10px",
            }}
          >
            <Link href={`/details/${items?.id}`}>
              <Button onClick={() => console.log(items)} type="primary">
                Details
              </Button>
            </Link>
            {items?.status ? (
              <>
                {!!id ? (
                  <Button
                    type="primary"
                    onClick={() => {
                      setOpen(true);
                      setCategoryId(items?.id);
                    }}
                  >
                    Booking
                  </Button>
                ) : (
                  <Link href={"/login"}>
                    <Button type="primary">Booking</Button>
                  </Link>
                )}
              </>
            ) : (
              <Button danger>Booked</Button>
            )}
          </div>
        </div>
      </div>
    </Col>
  );
};

export default Cart;
