import React, { useState, useEffect } from "react";
import { Table, Tag, Space } from "antd";
import { call } from "@/util/client";
import analytics from "@/util/backend/analytics";
import "./default.css";
import style from "./default.css";

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

interface CompetitionRelatedDataProps {
  isMonthReport?: boolean;
  id: number;
  begin: string;
  end: string;
}

export default function CompetitionRelatedData(
  props: CompetitionRelatedDataProps
) {
  let [data, setData] = useState([]);

  useEffect(() => {
    if (data.length === 0) asyncFetch();
  }, [props.begin]);

  const getRowClassName = (record: any, index: number) => {
    let className = "";
    className = index % 2 === 0 ? "table-odd" : "table-even";
    return className;
  };

  const asyncFetch = () => {
    if (props.begin && props.end) {
      call(analytics.CompetitionData, {
        id: props.id,
        begin: props.begin,
        end: props.end,
      }).then((r) => {
        // @ts-ignore
        setData([
          {
            // @ts-ignore
            key: "1",
            // @ts-ignore
            content: "新投稿人数",
            // @ts-ignore
            num: r.新投稿人数,
          },
          {
            // @ts-ignore
            key: "2",
            // @ts-ignore
            content: "累计投稿人数",
            // @ts-ignore
            num: r.累计投稿人数,
          },
          {
            // @ts-ignore
            key: "3",
            // @ts-ignore
            content: "比赛推广新增注册人数",
            // @ts-ignore
            num: r.比赛推广新增注册人数,
          },
          {
            // @ts-ignore
            key: "4",
            // @ts-ignore
            content: "比赛推广累计注册人数",
            // @ts-ignore
            num: r.比赛推广累计注册人数,
          },
          {
            // @ts-ignore
            key: "5",
            // @ts-ignore
            content: "比赛推广新增访问次数",
            // @ts-ignore
            num: r.比赛推广新增访问次数,
          },
          {
            // @ts-ignore
            key: "6",
            // @ts-ignore
            content: "比赛推广累计访问次数",
            // @ts-ignore
            num: r.比赛推广累计访问次数,
          },
        ]);
      });
    }
  };

  return (
    <>
      <div className={props.isMonthReport ? "chart-card-ppt" : "chart-card"}>
        <div className={props.isMonthReport ? "chart-title-ppt" : "card-title"}>
          比赛相关数据
        </div>
        <div className={props.isMonthReport ? "inside-chart-ppt" : ""}>
          <Table
            rowClassName={getRowClassName}
            pagination={false}
            showHeader={false}
            dataSource={data}
            columns={columns}
          />
        </div>
      </div>
    </>
  );
}
