import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "antd";
import { call } from "@/util/client";
import analytics, { InviteKPI } from "@/util/backend/analytics";
import "./default.css";
import Loading from "@/component/layout/Loading";

interface InvitedKPIProps {
  nowPage?: boolean;
  isMonthReport?: boolean;
  begin: string;
  end: string;
}

export default function InvitedKPI(props: InvitedKPIProps) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [kpi, setKpi] = useState([] as InviteKPI[]);

  useEffect(() => {
    setLoading(true);
    asyncFetch();
  }, [props.begin]);

  const renderCol = (text: any, row: any, index: number) => {
    const base = props.isMonthReport ? 4 : 1;
    if (row.list === "发布作品数") {
      return (
        <div style={text >= 2 * base ? { color: "red" } : { color: "green" }}>
          {text}
        </div>
      );
    }
    if (row.list === "圈子作品数") {
      return (
        <div style={text >= 20 * base ? { color: "red" } : { color: "green" }}>
          {text}
        </div>
      );
    }
    if (row.list === "评论和点赞数") {
      return (
        <div style={text >= 20 * base ? { color: "red" } : { color: "green" }}>
          {text}
        </div>
      );
    }
    if (row.list === "是否达标") {
      return (
        <div style={text === "达标" ? { color: "red" } : { color: "green" }}>
          {text}
        </div>
      );
    }
  };

  const asyncFetch = () => {
    if (props.begin) {
      const timeString =
        props.begin.split("-")[0] + props.begin.split("-")[1] + "";

      call(analytics.InviteKPI, {
        stage: "202104",
      }).then((r) => {
        setKpi(r);
        let tmpData = [
          {
            list: "发布作品数",
            p0: r[0]?.newphotos,
            p1: r[1]?.newphotos,
            p2: r[2]?.newphotos,
            p3: r[3]?.newphotos,
            p4: r[4]?.newphotos,
            p5: r[5]?.newphotos,
            p6: r[6]?.newphotos,
            p7: r[7]?.newphotos,
          },
          {
            list: "圈子作品数",
            p0: r[0]?.groupphotos,
            p1: r[1]?.groupphotos,
            p2: r[2]?.groupphotos,
            p3: r[3]?.groupphotos,
            p4: r[4]?.groupphotos,
            p5: r[5]?.groupphotos,
            p6: r[6]?.groupphotos,
            p7: r[7]?.groupphotos,
          },
          {
            list: "评论和点赞数",
            p0: r[0]?.groupcomments + r[0]?.grouplikes,
            p1: r[1]?.groupcomments + r[1]?.grouplikes,
            p2: r[2]?.groupcomments + r[2]?.grouplikes,
            p3: r[3]?.groupcomments + r[3]?.grouplikes,
            p4: r[4]?.groupcomments + r[4]?.grouplikes,
            p5: r[5]?.groupcomments + r[5]?.grouplikes,
            p6: r[6]?.groupcomments + r[6]?.grouplikes,
            p7: r[7]?.groupcomments + r[7]?.grouplikes,
          },
          {
            list: "是否达标",
            p0: r[0]?.pass ? "达标" : "未达标",
            p1: r[1]?.pass ? "达标" : "未达标",
            p2: r[2]?.pass ? "达标" : "未达标",
            p3: r[3]?.pass ? "达标" : "未达标",
            p4: r[4]?.pass ? "达标" : "未达标",
            p5: r[5]?.pass ? "达标" : "未达标",
            p6: r[6]?.pass ? "达标" : "未达标",
            p7: r[7]?.pass ? "达标" : "未达标",
          },
        ];
        // @ts-ignore
        setData(tmpData);
        if (data) setLoading(false);
      });
    }
  };

  const columns = [
    {
      title: "",
      dataIndex: "list",
      key: "list",
    },
    {
      title: kpi[0]?.name,
      dataIndex: "p0",
      key: "p0",
      render: renderCol,
    },
    {
      title: kpi[1]?.name,
      dataIndex: "p1",
      key: "p1",
      render: renderCol,
    },
    {
      title: kpi[2]?.name,
      dataIndex: "p2",
      key: "p2",
      render: renderCol,
    },
    {
      title: kpi[3]?.name,
      dataIndex: "p3",
      key: "p3",
      render: renderCol,
    },
    {
      title: kpi[4]?.name,
      dataIndex: "p4",
      key: "p4",
      render: renderCol,
    },
    {
      title: kpi[5]?.name,
      dataIndex: "p5",
      key: "p5",
      render: renderCol,
    },
    {
      title: kpi[6]?.name,
      dataIndex: "p6",
      key: "p6",
      render: renderCol,
    },
    {
      title: kpi[7]?.name,
      dataIndex: "p7",
      key: "p7",
      render: renderCol,
    },
  ];

  return (
    <>
      <div className={props.isMonthReport ? "chart-card-ppt" : "chart-card"}>
        <div
          hidden={props.nowPage}
          className={props.isMonthReport ? "chart-title-ppt" : "card-title"}
        >
          特邀影家KPI考核
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className={props.isMonthReport ? "inside-chart-ppt" : ""}>
            <div style={{ float: "right", marginTop: "20px" }}>
              （每周考核指标：发布作品数≥2，圈子内新作品数≥20，评论或点赞数≥20）
            </div>
            <Table pagination={false} dataSource={data} columns={columns} />
            <Row style={{ marginTop: "15px", fontSize: 16 }}>
              <Col style={{ color: "#FF3E3E" }} flex={"17px"}>
                ■
              </Col>
              <Col style={{ color: "grey", fontSize: 14, marginTop: "2px" }}>
                活跃度达标
              </Col>
              <Col flex={"45px"} />
              <Col style={{ color: "#48A578" }} flex={"17px"}>
                ■
              </Col>
              <Col style={{ color: "grey", fontSize: 14, marginTop: "2px" }}>
                活跃度未达标
              </Col>
            </Row>
          </div>
        )}
      </div>
    </>
  );
}
