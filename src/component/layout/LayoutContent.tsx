import { Breadcrumb, Layout, Button } from "antd";
import Pandect from "@/pages/Pandect";
import { useRef, useState } from "react";
import { DownloadOutlined } from "@ant-design/icons";

const { Content } = Layout;
import "./LayoutContent.css";
import SourceAnalysis from "@/pages/SourceAnalysis";
import UserPortrait from "@/pages/UserPortrait";
import BehaviorAnalysis from "@/pages/BehaviorAnalysis";
import RetentionAnalysis from "@/pages/RetentionAnalysis";
import Works from "@/pages/Works";
import InvitedPhotographer from "@/pages/InvitedPhotographer";
import Share from "@/pages/Share";
import PageAnalysis from "@/pages/PageAnalysis";
import Circle from "@/pages/Circle";
import Challenge from "@/pages/Challenge";
import Shop from "@/pages/Shop";
import Mine from "@/pages/Mine";
import PhotoCompetition from "@/pages/PhotoCompetition";
import WeekReport from "@/pages/WeekReport";
import MonthlyReport from "@/pages/MonthlyReport";
import CollegePandect from "@/pages/CollegePandect";
import CollegeCourseRelated from "@/pages/CollegeCourseRelated";
import CollegeOfflineCompetition from "@/pages/CollegeOfflineCompetition";

interface LayoutContentProps {
  HeaderNav: string;
  SiderNav: string;
}

export default function LayoutContent(props: LayoutContentProps) {
  const contentRef = useRef(null);

  const [nowPage, setNowPage] = useState("");

  const resetPage = () => {
    setNowPage("");
  };

  return (
    <>
      <Layout
        style={{
          overflowY: "hidden",
          overflowX: "hidden",
          padding: "0 24px 24px",
          paddingLeft: "210px",
          backgroundColor: "#F5F5F5",
        }}
      >
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>{props.HeaderNav}</Breadcrumb.Item>
          <Breadcrumb.Item>{props.SiderNav}</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 1200,
          }}
        >
          <div ref={contentRef} className={"sider-content"}>
            {/*<Button*/}
            {/*  className="print"*/}
            {/*  danger*/}
            {/*  icon={<DownloadOutlined />}*/}
            {/*  onClick={() => {*/}
            {/*    setNowPage(props.SiderNav);*/}
            {/*  }}*/}
            {/*  hidden={props.SiderNav !== "??????"}*/}
            {/*>*/}
            {/*  ??????*/}
            {/*</Button>*/}
            <div hidden={props.SiderNav !== "??????"}>
              <Pandect nowPage={nowPage} resetPage={resetPage} />
            </div>
            <div hidden={props.SiderNav !== "????????????"}>
              <SourceAnalysis nowPage={nowPage} resetPage={resetPage} />
            </div>
            <div hidden={props.SiderNav !== "????????????"}>
              <UserPortrait nowPage={nowPage} resetPage={resetPage} />
            </div>
            <div hidden={props.SiderNav !== "????????????"}>
              <BehaviorAnalysis nowPage={nowPage} resetPage={resetPage} />
            </div>
            <div hidden={props.SiderNav !== "????????????"}>
              <RetentionAnalysis nowPage={nowPage} resetPage={resetPage} />
            </div>
            <div hidden={props.SiderNav !== "????????????"}>
              <InvitedPhotographer nowPage={nowPage} resetPage={resetPage} />
            </div>
            <div hidden={props.SiderNav !== "??????"}>
              <Works nowPage={nowPage} resetPage={resetPage} />
            </div>
            <div hidden={props.SiderNav !== "????????????"}>
              <PhotoCompetition nowPage={nowPage} resetPage={resetPage} />
            </div>
            <div hidden={props.SiderNav !== "??????"}>
              <Share nowPage={nowPage} resetPage={resetPage} />
            </div>
            <div hidden={props.SiderNav !== "????????????"}>
              <CollegePandect nowPage={nowPage} resetPage={resetPage} />
            </div>
            <div hidden={props.SiderNav !== "??????????????????"}>
              <CollegeCourseRelated nowPage={nowPage} resetPage={resetPage} />
            </div>
            <div hidden={props.SiderNav !== "??????????????????"}>
              <CollegeOfflineCompetition nowPage={nowPage} resetPage={resetPage} />
            </div>
            <div hidden={props.SiderNav !== "????????????"}>
              <PageAnalysis nowPage={nowPage} resetPage={resetPage} />
            </div>
            <div hidden={props.SiderNav !== "??????"}>
              <Circle nowPage={nowPage} resetPage={resetPage} />
            </div>
            <div hidden={props.SiderNav !== "??????"}>
              <Challenge nowPage={nowPage} resetPage={resetPage} />
            </div>
            <div hidden={props.SiderNav !== "????????????"}>
              <Shop nowPage={nowPage} resetPage={resetPage} />
            </div>
            <div hidden={props.SiderNav !== "??????"}>
              <Mine nowPage={nowPage} resetPage={resetPage} />
            </div>
            <div hidden={props.SiderNav !== "??????"}>
              <WeekReport nowPage={nowPage} resetPage={resetPage} />
            </div>
            <div hidden={props.SiderNav !== "??????"}>
              <MonthlyReport nowPage={nowPage} resetPage={resetPage} />
            </div>
          </div>
        </Content>
        <div className={"footer"}>
          ?????2021??????????????????????????????????????? ????????????
          <a
            style={{ marginLeft: "10px" }}
            className={"foot-a"}
            href={"https://beian.miit.gov.cn/"}
          >
            ???ICP??? 11010502037570???
          </a>
        </div>
      </Layout>
    </>
  );
}
