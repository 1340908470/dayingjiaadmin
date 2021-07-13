import React from "react";
import "antd/dist/antd.less";
import LayoutHeaderSider from "./layout/LayoutHeaderSider";
import "./index.less";
import "moment/locale/zh-cn";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN"; // 引入中文包

import { hasLogged } from "@/util/client";
import LayoutLogin from "@/layout/LayoutLogin";

export default function Index() {
  if (hasLogged()) {
    return (
      <ConfigProvider locale={zhCN}>
        <LayoutHeaderSider />
      </ConfigProvider>
    );
  } else {
    return (
      <>
        {" "}
        <LayoutLogin />{" "}
      </>
    );
  }
}
