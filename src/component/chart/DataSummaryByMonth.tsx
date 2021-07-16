import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { call } from "@/util/client";
import analytics, { InviteKPI } from "@/util/backend/analytics";
import "./default.css";

interface DataSummaryByMonthProps {
  isMonthReport?: boolean;
  begin: string;
  end: string;
}

export default function DataSummaryByMonth(props: DataSummaryByMonthProps) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (data.length === 0) asyncFetch();
  }, [props.begin]);

  const asyncFetch = () => {
    if (props.begin) {
      const timeString =
        props.begin.split("-")[0] + props.begin.split("-")[1] + "";

      call(analytics.DataSummaryByMonth, {
        month: props.begin.split("-")[0] + "-" + props.begin.split("-")[1],
      }).then((r) => {
        console.log(r);
        let tmpData = [
          {
            统计项目: "访问人数",
            统计月: r.统计月.访问人数,
            上次统计: r.上次统计.访问人数,
            环比增长: r.环比增长.访问人数,
          },
          {
            统计项目: "访问次数",
            统计月: r.统计月.访问次数,
            上次统计: r.上次统计.访问次数,
            环比增长: r.环比增长.访问次数,
          },
          {
            统计项目: "新注册用户数",
            统计月: r.统计月.新注册用户数,
            上次统计: r.上次统计.新注册用户数,
            环比增长: r.环比增长.新注册用户数,
          },
          {
            统计项目: "老用户回归数",
            统计月: r.统计月.老用户回归数,
            上次统计: r.上次统计.老用户回归数,
            环比增长: r.环比增长.老用户回归数,
          },
          {
            统计项目: "新作品数",
            统计月: r.统计月.新作品数,
            上次统计: r.上次统计.新作品数,
            环比增长: r.环比增长.新作品数,
          },
        ];
        // @ts-ignore
        setData(tmpData);
      });
    }
  };

  const columns = [
    {
      title: "统计项目",
      dataIndex: "统计项目",
      key: "统计项目",
    },
    {
      title: "统计月",
      dataIndex: "统计月",
      key: "统计月",
    },
    {
      title: "上次统计",
      dataIndex: "上次统计",
      key: "上次统计",
    },
    {
      title: "环比增长",
      dataIndex: "环比增长",
      key: "环比增长",
      render: (text: any, row: any, index: number) => {
        return (
          <div style={{}}>
            <div style={text > 100 ? { color: "red" } : { color: "green" }}>
              {text}%
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className={props.isMonthReport ? "chart-card-ppt" : "chart-card"}>
        <div className={props.isMonthReport ? "chart-title-ppt" : "card-title"}>
          用户数据月度对比
        </div>
        <div className={props.isMonthReport ? "inside-chart-ppt" : ""}>
          <Table pagination={false} dataSource={data} columns={columns} />
        </div>
      </div>
    </>
  );
}
