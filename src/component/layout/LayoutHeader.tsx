import { Image, Menu, Avatar, Dropdown, DatePicker } from "antd";
import { Header } from "antd/es/layout/layout";
import "./LayoutHeader.css";
import { UserOutlined } from "@ant-design/icons";
import { logout } from "@/util/client";
import logo from "@/wwwroot/img/logo2.png";

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
            preview={false}
            height={40}
            width={95}
            style={{ marginTop: "15px", marginLeft: "-10px" }}
            src={logo}
            alt={logo}
          />
        </div>
        <div style={{ float: "right" }}>
          <Dropdown overlay={menu}>
            <div
              style={{ cursor: "pointer" }}
              onClick={(e) => e.preventDefault()}
            >
              <Avatar icon={<UserOutlined />} />
              <div style={{ marginLeft: "10px", float: "right" }}>admin</div>
            </div>
          </Dropdown>
        </div>
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["数据统计"]}
          onClick={(e) => props.HandleNavState(e.key)}
        >
          <Menu.Item style={{ marginLeft: "90px" }} key="数据统计">
            数据统计
          </Menu.Item>
        </Menu>
      </Header>
    </>
  );
}
