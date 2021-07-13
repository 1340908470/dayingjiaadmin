import { Breadcrumb, Layout, Button } from "antd";
import Pandect from "@/pages/Pandect";
import ReactToPrint from "react-to-print";
import { useRef } from "react";
import { DownloadOutlined } from "@ant-design/icons";

const { Content } = Layout;
import "./LayoutContent.css";
import { call } from "@/util/client";
import SourceAnalysis from "@/pages/SourceAnalysis";

interface LayoutContentProps {
  HeaderNav: string;
  SiderNav: string;
}

export default function LayoutContent(props: LayoutContentProps) {
  const contentRef = useRef(null);
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
          </div>
        </Content>
      </Layout>
    </>
  );
}
