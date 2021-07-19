// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Table, Tag, Space } from "antd";
import { call } from "@/util/client";
import analytics from "@/util/backend/analytics";
import "./default.css";
import style from "./default.css";
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
  },
];

interface WeeklyDataSummaryProps {
  isMonthReport?: boolean;
  begin: string;
  end: string;
}

export default function WeeklyDataSummary(props: WeeklyDataSummaryProps) {
  let [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data.length === 0 && props.begin) asyncFetch();
  }, [props.begin]);

  const getRowClassName = (record: any, index: number) => {
    let className = "";
    className = index % 2 === 0 ? "table-odd" : "table-even";
    return className;
  };

  const asyncFetch = () => {
    if (props.begin && props.end) {
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
            content: "统计周访问人数",
            // @ts-ignore
            num: r.访问人数,
          },
          {
            // @ts-ignore
            key: "2",
            // @ts-ignore
            content: "统计周访问次数",
            // @ts-ignore
            num: r.访问次数,
          },
          {
            // @ts-ignore
            key: "3",
            // @ts-ignore
            content: "统计周新注册用户数",
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
            content: "统计周新作品数",
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
          <Table
            rowClassName={getRowClassName}
            pagination={false}
            showHeader={false}
            dataSource={data}
            columns={columns}
          />
        )}
      </div>
    </>
  );
}
