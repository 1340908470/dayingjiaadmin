import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { call } from "@/util/client";
import analytics, { InviteKPI } from "@/util/backend/analytics";
import "./default.css";
import Loading from "@/component/layout/Loading";

interface MonthlyChannelProps {
  isMonthReport?: boolean;
  begin: string;
  end: string;
}

export default function MonthlyChannel(props: MonthlyChannelProps) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    asyncFetch();
  }, [props.begin]);

  const asyncFetch = () => {
    if (props.begin) {
      const timeString =
        props.begin.split("-")[0] + props.begin.split("-")[1] + "";

      call(analytics.MonthlyChannel, {
        month: props.begin.split("-")[0] + "-" + props.begin.split("-")[1],
      }).then((r) => {
        // @ts-ignore
        setData(r);

        if (data) setLoading(false);
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
      title: "统计月访问次数",
      dataIndex: "统计月访问次数",
      key: "统计月访问次数",
    },
    {
      title: "上次统计访问次数",
      dataIndex: "上次统计访问次数",
      key: "上次统计访问次数",
    },
    {
      title: "环比增长",
      dataIndex: "环比增长",
      key: "环比增长",
      render: (text: any, row: any, index: number) => {
        return (
          <div style={{}}>
            <div style={text > 100 ? { color: "red" } : { color: "green" }}>
              {text}
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
          不同渠道来源用户访问月度对比
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className={props.isMonthReport ? "inside-chart-ppt" : ""}>
            <Table pagination={false} dataSource={data} columns={columns} />
          </div>
        )}
      </div>
    </>
  );
}
