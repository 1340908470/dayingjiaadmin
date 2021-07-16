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

interface GiftRelatedDataProps {
  isMonthReport?: boolean;
  begin: string;
  end: string;
}

export default function GiftRelatedData(props: GiftRelatedDataProps) {
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
      call(analytics.Shop, {
        begin: props.begin,
        end: props.end,
      }).then((r) => {
        // @ts-ignore
        setData([
          {
            // @ts-ignore
            key: "1",
            // @ts-ignore
            content: "新增免费课程数",
            // @ts-ignore
            num: r.新增免费课程数,
          },
          {
            // @ts-ignore
            key: "2",
            // @ts-ignore
            content: "累计免费课程数",
            // @ts-ignore
            num: r.累计免费课程数,
          },
          {
            // @ts-ignore
            key: "3",
            // @ts-ignore
            content: "新增精品课程数",
            // @ts-ignore
            num: r.新增精品课程数,
          },
          {
            // @ts-ignore
            key: "4",
            // @ts-ignore
            content: "累计精品课程数",
            // @ts-ignore
            num: r.累计精品课程数,
          },
          {
            // @ts-ignore
            key: "5",
            // @ts-ignore
            content: "新增头像挂件数",
            // @ts-ignore
            num: r.新增头像挂件数,
          },
          {
            // @ts-ignore
            key: "6",
            // @ts-ignore
            content: "累计头像挂件数",
            // @ts-ignore
            num: r.累计头像挂件数,
          },
        ]);
      });
    }
  };

  return (
    <>
      <div className={props.isMonthReport ? "chart-card-ppt" : "chart-card"}>
        <div className={props.isMonthReport ? "chart-title-ppt" : "card-title"}>
          礼品相关数据
        </div>
        <Table
          rowClassName={getRowClassName}
          pagination={false}
          showHeader={false}
          dataSource={data}
          columns={columns}
        />
      </div>
    </>
  );
}
