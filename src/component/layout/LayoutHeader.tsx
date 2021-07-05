import { Image, Menu } from 'antd';
import { Header } from 'antd/es/layout/layout';
import './LayoutHeader.css';

interface LayoutHeaderProps {
  HandleNavState: (navState: string) => void;
}

export default function LayoutHeader(props: LayoutHeaderProps) {
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
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={['数据统计']}
          onClick={(e) => props.HandleNavState(e.key)}
        >
          <Menu.Item key="数据统计">数据统计</Menu.Item>
          <Menu.Item key="nav2">nav 2</Menu.Item>
          <Menu.Item key="nav3">nav 3</Menu.Item>
        </Menu>
      </Header>
    </>
  );
}
