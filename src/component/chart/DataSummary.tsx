// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Table, Tag, Space } from "antd";
import { call } from "@/util/client";
import analytics from "@/util/backend/analytics";
import "./default.css";
import Loading from "@/component/layout/Loading";

const columns = [
  {
    title: "表项",
    dataIndex: "content",
    key: "content",
  },
  {
    title: "统计",
    dataIndex: "num",
    key: "num",
    align: "right",
    className: "table-data",
  },
];

interface DataSummaryProps {
  isMonthReport?: boolean;
  begin: string;
  end: string;
}

export default function DataSummary(props: DataSummaryProps) {
  const [loading, setLoading] = useState(true);
  let [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    asyncFetch();
  }, [props.begin]);

  const getRowClassName = (record: any, index: number) => {
    let className = "";
    className = index % 2 === 0 ? "table-odd" : "table-even";
    return className;
  };

  const asyncFetch = () => {
    if (props.begin) {
      call(analytics.DataSummary, {
        begin: props.begin,
        end: props.end,
      }).then((r) => {
        // @ts-ignore
        setData([
          {
            // @ts-ignore
            key: "1",
            // @ts-ignore
            content: "访问人数",
            // @ts-ignore
            num: r.访问人数,
          },
          {
            // @ts-ignore
            key: "2",
            // @ts-ignore
            content: "访问次数",
            // @ts-ignore
            num: r.访问次数,
          },
          {
            // @ts-ignore
            key: "3",
            // @ts-ignore
            content: "新注册用户数",
            // @ts-ignore
            num: r.新注册用户数,
          },
          {
            // @ts-ignore
            key: "4",
            // @ts-ignore
            content: "老用户回归数",
            // @ts-ignore
            num: r.老用户回归数,
          },
          {
            // @ts-ignore
            key: "5",
            // @ts-ignore
            content: "新作品数",
            // @ts-ignore
            num: r.新作品数,
          },
          {
            // @ts-ignore
            key: "6",
            // @ts-ignore
            content: "本年度新增注册用户数",
            // @ts-ignore
            num: r.本年度新增注册用户数,
          },
          {
            // @ts-ignore
            key: "7",
            // @ts-ignore
            content: "本年度新增作品数",
            // @ts-ignore
            num: r.本年度新增作品数,
          },
          {
            // @ts-ignore
            key: "8",
            // @ts-ignore
            content: "累计注册用户数",
            // @ts-ignore
            num: r.累计注册用户数,
          },
          {
            // @ts-ignore
            key: "9",
            // @ts-ignore
            content: "累计作品数",
            // @ts-ignore
            num: r.累计作品数,
          },
        ]);
        if (data) setLoading(false);
      });
    }
  };

  return (
    <>
      <div className={props.isMonthReport ? "chart-card-ppt" : "chart-card"}>
        <div className={props.isMonthReport ? "chart-title-ppt" : "card-title"}>
          用户数据概况
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className={props.isMonthReport ? "inside-chart-ppt" : ""}>
            <Table
              rowClassName={getRowClassName}
              pagination={false}
              showHeader={false}
              dataSource={data}
              columns={columns}
            />
          </div>
        )}
      </div>
    </>
  );
}
