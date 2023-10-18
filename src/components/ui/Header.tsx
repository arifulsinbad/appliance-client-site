// import type { MenuProps } from "antd";
import { authKey } from "@/conastants/authkey";
import { getUserInfo } from "@/services/auth.service";
import { logoutUser } from "@/utills/local-storage";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, MenuProps, Row, Space } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";

const { Header: AntHeader } = Layout;

const Header = () => {
  const router = useRouter();
  const { role } = getUserInfo() as any;
  const logout = () => {
    logoutUser(authKey);
    router.push("/");
  };

  const items: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <Link href={"/"}>
          <Button>Home</Button>
        </Link>
      ),
    },
    {
      key: "1",
      label: (
        <>
          {!!role ? (
            <Link href={"/profile"}>
              <Button>Dashboard</Button>
            </Link>
          ) : (
            <Link href={"/login"}>
              <Button>Dashboard</Button>
            </Link>
          )}
        </>
      ),
    },
    {
      key: "2",
      label: (
        <Link href={"/register"}>
          <Button>Register</Button>
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <>
          {!!role ? (
            <Button onClick={() => logout()} type="text" danger>
              LogOut
            </Button>
          ) : (
            <Link href={"/login"}>
              <Button>Login</Button>
            </Link>
          )}
        </>
      ),
    },
  ];
  return (
    <AntHeader style={{ backgroundColor: "white" }}>
      <Row justify={"end"} align={"middle"}>
        <Link
          href={"/"}
          style={{
            fontSize: "1.5em",
            fontWeight: "bold",
            position: "absolute",
            left: "10px",
          }}
        >
          Appliance Servicing
        </Link>
        <Dropdown menu={{ items }}>
          <a href="">
            <Space wrap size={16}>
              <Avatar icon={<UserOutlined />} />
            </Space>
          </a>
        </Dropdown>
      </Row>
    </AntHeader>
  );
};

export default Header;
