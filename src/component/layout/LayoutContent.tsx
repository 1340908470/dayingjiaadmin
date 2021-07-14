import { Breadcrumb, Layout, Button } from "antd";
import Pandect from "@/pages/Pandect";
import ReactToPrint from "react-to-print";
import { useRef } from "react";
import { DownloadOutlined } from "@ant-design/icons";

const { Content } = Layout;
import "./LayoutContent.css";
import { call } from "@/util/client";
import SourceAnalysis from "@/pages/SourceAnalysis";
import UserPortrait from "@/pages/UserPortrait";
import BehaviorAnalysis from "@/pages/BehaviorAnalysis";
import RetentionAnalysis from "@/pages/RetentionAnalysis";
import Works from "@/pages/Works";
import InvitedPhotographer from "@/pages/InvitedPhotographer";
import Share from "@/pages/Share";
import PageAnalysis from "@/pages/PageAnalysis";

interface LayoutContentProps {
  HeaderNav: string;
  SiderNav: string;
}

export default function LayoutContent(props: LayoutContentProps) {
  const contentRef = useRef(null);
  console.log(props);
  return (
    <>
      <Layout style={{ padding: "0 24px 24px", backgroundColor: "#F5F5F5" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>{props.HeaderNav}</Breadcrumb.Item>
          <Breadcrumb.Item>{props.SiderNav}</Breadcrumb.Item>
          <ReactToPrint
            trigger={() => (
              <Button
                className="print"
                type="primary"
                icon={<DownloadOutlined />}
              >
                打印
              </Button>
            )}
            content={() => contentRef.current}
          />
        </Breadcrumb>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 1200,
          }}
        >
          <div ref={contentRef}>
            <div hidden={props.SiderNav !== "总览"}>
              <Pandect />
            </div>
            <div hidden={props.SiderNav !== "来源分析"}>
              <SourceAnalysis />
            </div>
            <div hidden={props.SiderNav !== "用户画像"}>
              <UserPortrait />
            </div>
            <div hidden={props.SiderNav !== "行为分析"}>
              <BehaviorAnalysis />
            </div>
            <div hidden={props.SiderNav !== "留存分析"}>
              <RetentionAnalysis />
            </div>
            <div hidden={props.SiderNav !== "特邀影家"}>
              <InvitedPhotographer />
            </div>
            <div hidden={props.SiderNav !== "作品"}>
              <Works />
            </div>
            <div hidden={props.SiderNav !== "分享"}>
              <Share />
            </div>
            <div hidden={props.SiderNav !== "页面分析"}>
              <PageAnalysis />
            </div>
          </div>
        </Content>
      </Layout>
    </>
  );
}
