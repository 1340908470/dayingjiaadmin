import { Layout, Menu } from "antd";
import {
  AreaChartOutlined,
  PictureOutlined,
  NotificationOutlined,
  BarChartOutlined,
  ShareAltOutlined,
  UserOutlined,
  FileImageOutlined,
  UsergroupDeleteOutlined,
} from "@ant-design/icons";
import "./LayoutSider.css";
import { useState } from "react";
import LayoutContent from "@/component/layout/LayoutContent";

const { SubMenu } = Menu;
const { Sider } = Layout;

interface LayoutSiderProps {
  HeaderNav: string;
  HandleNavState: (navState: string) => void;
  SiderNav: string;
}

export default function LayoutSider(props: LayoutSiderProps) {
  const [siderNav, setSiderNav] = useState(props.SiderNav);

  return (
    <>
      <Layout style={{ backgroundColor: "red" }}>
        <Sider width={200}>
          <Menu
            hidden={props.HeaderNav !== "数据统计"}
            mode="inline"
            defaultSelectedKeys={["总览"]}
            defaultOpenKeys={["用户"]}
            className="menu"
            onClick={(e) => {
              setSiderNav(e.key);
              props.HandleNavState(e.key);
            }}
          >
            <Menu.Item key="总览" icon={<AreaChartOutlined />}>
              总览
            </Menu.Item>
            <SubMenu key="用户" icon={<UserOutlined />} title="用户">
              <Menu.Item key="来源分析">来源分析</Menu.Item>
              <Menu.Item key="用户画像">用户画像</Menu.Item>
              <Menu.Item key="行为分析">行为分析</Menu.Item>
              <Menu.Item key="留存分析">留存分析</Menu.Item>
              {/*<Menu.Item key="摄影设备">摄影设备</Menu.Item>*/}
              <Menu.Item key="特邀影家">特邀影家</Menu.Item>
            </SubMenu>
            <Menu.Item key="作品" icon={<PictureOutlined />}>
              作品
            </Menu.Item>

            <Menu.Item key="活动比赛" icon={<UsergroupDeleteOutlined />}>
              活动比赛
            </Menu.Item>

            <Menu.Item key="分享" icon={<ShareAltOutlined />}>
              分享
            </Menu.Item>
            <SubMenu key="页面" icon={<FileImageOutlined />} title="页面">
              <Menu.Item key="页面分析">页面分析</Menu.Item>
              <Menu.Item key="圈子">圈子</Menu.Item>
              <Menu.Item key="挑战">挑战</Menu.Item>
              <Menu.Item key="积分商城">积分商城</Menu.Item>
              <Menu.Item key="我的">我的</Menu.Item>
            </SubMenu>
            <SubMenu
              key="周期报告"
              icon={<BarChartOutlined />}
              title="周期报告"
            >
              <Menu.Item key="周报">周报</Menu.Item>
              <Menu.Item key="月报">月报</Menu.Item>
            </SubMenu>
          </Menu>
          <Menu
            hidden={props.HeaderNav !== "nav2"}
            mode="inline"
            defaultSelectedKeys={["subNav2"]}
            defaultOpenKeys={["subNav2"]}
            className="menu"
          >
            <Menu.Item key="subNav2" icon={<UserOutlined />}>
              subNav2
            </Menu.Item>
          </Menu>
          <Menu
            hidden={props.HeaderNav !== "nav3"}
            mode="inline"
            defaultSelectedKeys={["subNav3"]}
            defaultOpenKeys={["subNav3"]}
            className="menu"
          >
            <Menu.Item key="subNav3" icon={<UserOutlined />}>
              subNav3
            </Menu.Item>
          </Menu>
        </Sider>
        <LayoutContent HeaderNav={props.HeaderNav} SiderNav={props.SiderNav} />
      </Layout>
    </>
  );
}
