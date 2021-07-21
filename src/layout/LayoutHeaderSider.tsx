import { Layout } from "antd";

import LayoutHeader from "../component/layout/LayoutHeader";
import { useState } from "react";
import LayoutSider from "../component/layout/LayoutSider";

export const defaultSiderMap = new Map([
  ["数据统计", "总览"],
  ["nav2", "subNav2"],
  ["nav3", "subNav3"],
]);

export default function LayoutHeaderSider() {
  const [headerNav, setHeaderNav] = useState("数据统计");
  const [siderNav, setSiderNav] = useState(defaultSiderMap.get(headerNav));

  return (
    <>
      <Layout style={{ overflowX: "hidden" }}>
        <LayoutHeader
          HandleNavState={(navState: string) => {
            setHeaderNav(navState);
            setSiderNav(defaultSiderMap.get(navState));
          }}
        />
        <LayoutSider
          HeaderNav={headerNav}
          HandleNavState={(navState: string) => {
            setSiderNav(navState);
          }}
          SiderNav={siderNav || ""}
        />
      </Layout>
    </>
  );
}
