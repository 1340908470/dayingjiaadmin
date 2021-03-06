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
            {/*  hidden={props.SiderNav !== "月报"}*/}
            {/*>*/}
            {/*  下载*/}
            {/*</Button>*/}
            <div hidden={props.SiderNav !== "总览"}>
              <Pandect nowPage={nowPage} resetPage={resetPage} />
            </div>
            <div hidden={props.SiderNav !== "来源分析"}>
              <SourceAnalysis nowPage={nowPage} resetPage={resetPage} />
            </div>
            <div hidden={props.SiderNav !== "用户画像"}>
              <UserPortrait nowPage={nowPage} resetPage={resetPage} />
            </div>
            <div hidden={props.SiderNav !== "行为分析"}>
              <BehaviorAnalysis nowPage={nowPage} resetPage={resetPage} />
            </div>
            <div hidden={props.SiderNav !== "留存分析"}>
              <RetentionAnalysis nowPage={nowPage} resetPage={resetPage} />
            </div>
            <div hidden={props.SiderNav !== "特邀影家"}>
              <InvitedPhotographer nowPage={nowPage} resetPage={resetPage} />
            </div>
            <div hidden={props.SiderNav !== "作品"}>
              <Works nowPage={nowPage} resetPage={resetPage} />
            </div>
            <div hidden={props.SiderNav !== "活动比赛"}>
              <PhotoCompetition nowPage={nowPage} resetPage={resetPage} />
            </div>
            <div hidden={props.SiderNav !== "分享"}>
              <Share nowPage={nowPage} resetPage={resetPage} />
            </div>
            <div hidden={props.SiderNav !== "学院总览"}>
              <CollegePandect nowPage={nowPage} resetPage={resetPage} />
            </div>
            <div hidden={props.SiderNav !== "学院课程相关"}>
              <CollegeCourseRelated nowPage={nowPage} resetPage={resetPage} />
            </div>
            <div hidden={props.SiderNav !== "学院线下活动"}>
              <CollegeOfflineCompetition nowPage={nowPage} resetPage={resetPage} />
            </div>
            <div hidden={props.SiderNav !== "页面分析"}>
              <PageAnalysis nowPage={nowPage} resetPage={resetPage} />
            </div>
            <div hidden={props.SiderNav !== "圈子"}>
              <Circle nowPage={nowPage} resetPage={resetPage} />
            </div>
            <div hidden={props.SiderNav !== "挑战"}>
              <Challenge nowPage={nowPage} resetPage={resetPage} />
            </div>
            <div hidden={props.SiderNav !== "积分商城"}>
              <Shop nowPage={nowPage} resetPage={resetPage} />
            </div>
            <div hidden={props.SiderNav !== "我的"}>
              <Mine nowPage={nowPage} resetPage={resetPage} />
            </div>
            <div hidden={props.SiderNav !== "周报"}>
              <WeekReport nowPage={nowPage} resetPage={resetPage} />
            </div>
            <div hidden={props.SiderNav !== "月报"}>
              <MonthlyReport nowPage={nowPage} resetPage={resetPage} />
            </div>
          </div>
        </Content>
        <div className={"footer"}>
          ©️2021水滴云科技（北京）有限公司 版权所有
          <a
            style={{ marginLeft: "10px" }}
            className={"foot-a"}
            href={"https://beian.miit.gov.cn/"}
          >
            京ICP备 11010502037570号
          </a>
        </div>
      </Layout>
    </>
  );
}
