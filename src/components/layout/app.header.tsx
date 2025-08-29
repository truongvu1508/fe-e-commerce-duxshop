import { useState } from "react";
import {
  HomeOutlined,
  LoginOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { Link } from "react-router";
import { useAppContext } from "../../context/app.provider";

type MenuItem = Required<MenuProps>["items"][number];

const AppHeader = () => {
  const { userInfo } = useAppContext();
  let items: MenuItem[];
  if (userInfo.isAuthenticated) {
    items = [
      {
        label: <Link to={"/"}>Trang chủ</Link>,
        key: "home",
        icon: <HomeOutlined />,
      },
      {
        label: <Link to={"/users"}>Users</Link>,
        key: "user",
        icon: <UserOutlined />,
      },
      {
        label: `Welcome ${userInfo.username}`,
        key: "SubMenu",
        icon: <SettingOutlined />,
        children: [{ label: "Logout", key: "logout" }],
      },
    ];
  } else {
    items = [
      {
        label: <Link to={"/"}>Trang chủ</Link>,
        key: "home",
        icon: <HomeOutlined />,
      },
      {
        label: <Link to={"/login"}>Login</Link>,
        key: "login",
        icon: <LoginOutlined />,
      },
    ];
  }

  const [current, setCurrent] = useState("home");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default AppHeader;
