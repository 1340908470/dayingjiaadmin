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
    align: "right",
    className: "table-data",
  },
];

interface CompetitionRelatedDataProps {
  category: number;
  nowPage: string;
  name?: string;
  isMonthReport?: boolean;
  id: number;
  begin: string;
  end: string;
}

export default function CompetitionRelatedData(
  props: CompetitionRelatedDataProps
) {
  const [loading, setLoading] = useState(true);
  let [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    asyncFetch();
  }, [props.begin, props.end, props.id, props.category]);

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
        category: props.category,
      }).then((r) => {
        // @ts-ignore
        setData([
          {
            // @ts-ignore
            key: "1",
            // @ts-ignore
            content: props.category == 1 ? "新参与人数" : "新投稿人数",
            // @ts-ignore
            num: props.category == 1 ? r.新参与人数 : r.新投稿人数,
          },
          {
            // @ts-ignore
            key: "2",
            // @ts-ignore
            content: props.category == 1 ? "累计参与人数" : "累计投稿人数",
            // @ts-ignore
            num: props.category == 1 ? r.累计参与人数 : r.累计投稿人数,
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

        if (data) setLoading(false);
      });
    }
  };

  return (
    <>
      <div className={props.isMonthReport ? "chart-card-ppt" : "chart-card"}>
        <div
          hidden={props.nowPage}
          className={props.isMonthReport ? "chart-title-ppt" : "card-title"}
        >
          {props.name ? `"${props.name}" 相关数据` : "比赛相关数据"}
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
