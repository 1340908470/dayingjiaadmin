import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { call } from "@/util/client";
import analytics, { InviteKPI, InviteKPIMonth } from "@/util/backend/analytics";
import "./default.css";
import Loading from "@/component/layout/Loading";

interface InvitedKPIMonthProps {
  nowPage?: boolean;
  isMonthReport?: boolean;
  begin: string;
  end: string;
}

export default function InvitedKPIMonth(props: InvitedKPIMonthProps) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [kpi, setKpi] = useState([] as InviteKPIMonth[]);

  useEffect(() => {
    setLoading(true);
    asyncFetch();
  }, [props.begin, props.end]);

  const renderCol = (text: any, row: any, index: number) => {
    const base = props.isMonthReport ? 4 : 1;
    if (row.list === "发布作品数") {
      return (
        // <div style={text >= 2 * base ? { color: "red" } : { color: "green" }}>
        //   {text}
        // </div>
        <div style={{}}>{text}</div>
      );
    }
    if (row.list === "圈子作品数") {
      return <div style={{}}>{text}</div>;
    }
    if (row.list === "点赞和评论数") {
      return <div style={{}}>{text}</div>;
    }
    if (row.list === "周KPI未达标次数") {
      return <div style={{}}>{text}</div>;
    }
    if (row.list === "月度KPI是否达标") {
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

      call(analytics.InviteKPIMonth, {
        month: props.begin.split("-")[0] + "-" + props.begin.split("-")[1],
        stage: "202108",
      }).then((r) => {
        setKpi(r);
        let tmpData = [
          {
            list: "发布作品数",
            p0: r[0]?.发布作品数,
            p1: r[1]?.发布作品数,
            p2: r[2]?.发布作品数,
            p3: r[3]?.发布作品数,
            p4: r[4]?.发布作品数,
            p5: r[5]?.发布作品数,
            p6: r[6]?.发布作品数,
            p7: r[7]?.发布作品数,
          },
          {
            list: "圈子作品数",
            p0: r[0]?.圈子作品数,
            p1: r[1]?.圈子作品数,
            p2: r[2]?.圈子作品数,
            p3: r[3]?.圈子作品数,
            p4: r[4]?.圈子作品数,
            p5: r[5]?.圈子作品数,
            p6: r[6]?.圈子作品数,
            p7: r[7]?.圈子作品数,
          },
          {
            list: "点赞和评论数",
            p0: r[0]?.点赞和评论数,
            p1: r[1]?.点赞和评论数,
            p2: r[2]?.点赞和评论数,
            p3: r[3]?.点赞和评论数,
            p4: r[4]?.点赞和评论数,
            p5: r[5]?.点赞和评论数,
            p6: r[6]?.点赞和评论数,
            p7: r[7]?.点赞和评论数,
          },
          {
            list: "周KPI未达标次数",
            p0: r[0]?.周KPI未达标次数,
            p1: r[1]?.周KPI未达标次数,
            p2: r[2]?.周KPI未达标次数,
            p3: r[3]?.周KPI未达标次数,
            p4: r[4]?.周KPI未达标次数,
            p5: r[5]?.周KPI未达标次数,
            p6: r[6]?.周KPI未达标次数,
            p7: r[7]?.周KPI未达标次数,
          },
          {
            list: "月度KPI是否达标",
            p0: r[0]?.月度KPI是否达标 ? "达标" : "未达标",
            p1: r[1]?.月度KPI是否达标 ? "达标" : "未达标",
            p2: r[2]?.月度KPI是否达标 ? "达标" : "未达标",
            p3: r[3]?.月度KPI是否达标 ? "达标" : "未达标",
            p4: r[4]?.月度KPI是否达标 ? "达标" : "未达标",
            p5: r[5]?.月度KPI是否达标 ? "达标" : "未达标",
            p6: r[6]?.月度KPI是否达标 ? "达标" : "未达标",
            p7: r[7]?.月度KPI是否达标 ? "达标" : "未达标",
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
      title: kpi[0]?.姓名,
      dataIndex: "p0",
      key: "p0",
      render: renderCol,
    },
    {
      title: kpi[1]?.姓名,
      dataIndex: "p1",
      key: "p1",
      render: renderCol,
    },
    {
      title: kpi[2]?.姓名,
      dataIndex: "p2",
      key: "p2",
      render: renderCol,
    },
    {
      title: kpi[3]?.姓名,
      dataIndex: "p3",
      key: "p3",
      render: renderCol,
    },
    {
      title: kpi[4]?.姓名,
      dataIndex: "p4",
      key: "p4",
      render: renderCol,
    },
    {
      title: kpi[5]?.姓名,
      dataIndex: "p5",
      key: "p5",
      render: renderCol,
    },
    {
      title: kpi[6]?.姓名,
      dataIndex: "p6",
      key: "p6",
      render: renderCol,
    },
    {
      title: kpi[7]?.姓名,
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
            <Table pagination={false} dataSource={data} columns={columns} />{" "}
            <div
              style={{
                marginTop: "10px",
                color: "grey",
                fontSize: "8px",
                marginBottom: "10px",
              }}
            >
              ■ 特邀影家每月考核达标标准为：周考核未达标次数为”0“
            </div>
          </div>
        )}
      </div>
    </>
  );
}
