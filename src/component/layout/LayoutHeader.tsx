import { Image, Menu, Avatar, Dropdown, DatePicker } from "antd";
import { Header } from "antd/es/layout/layout";
import "./LayoutHeader.css";
import { UserOutlined } from "@ant-design/icons";
import { logout } from "@/util/client";

interface LayoutHeaderProps {
  HandleNavState: (navState: string) => void;
}

export default function LayoutHeader(props: LayoutHeaderProps) {
  const menu = (
    <Menu>
      <Menu.Item>
        <div style={{ cursor: "pointer" }} onClick={logout}>
          退出登陆
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Header className="header">
        <div className="logo">
          <Image
            className="logo-img"
            preview={false}
            src="https://img1.baidu.com/it/u=917297805,3450343040&fm=26&fmt=auto&gp=0.jpg"
          />
        </div>
        <div style={{ float: "right" }}>
          <Dropdown overlay={menu}>
            <div
              style={{ cursor: "pointer" }}
              onClick={(e) => e.preventDefault()}
            >
              <Avatar icon={<UserOutlined />} />
              <text style={{ marginLeft: "10px" }}>admin</text>
            </div>
          </Dropdown>
        </div>
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["数据统计"]}
          onClick={(e) => props.HandleNavState(e.key)}
        >
          <Menu.Item key="数据统计">数据统计</Menu.Item>
        </Menu>
      </Header>
    </>
  );
}
