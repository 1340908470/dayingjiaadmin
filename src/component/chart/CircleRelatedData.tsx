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

interface DataSummaryProps {
  begin: string;
  end: string;
}

export default function CircleRelatedData(props: DataSummaryProps) {
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
      call(analytics.GroupData, {
        begin: props.begin,
        end: props.end,
      }).then((r) => {
        // @ts-ignore
        setData([
          {
            // @ts-ignore
            key: "1",
            // @ts-ignore
            content: "新增圈子数",
            // @ts-ignore
            num: r.新增圈子数,
          },
          {
            // @ts-ignore
            key: "2",
            // @ts-ignore
            content: "累计圈子数",
            // @ts-ignore
            num: r.累计圈子数,
          },
          {
            // @ts-ignore
            key: "3",
            // @ts-ignore
            content: "新增分享至圈子的作品数",
            // @ts-ignore
            num: r.新增分享至圈子的作品数,
          },
          {
            // @ts-ignore
            key: "4",
            // @ts-ignore
            content: "累计分享至圈子的作品数",
            // @ts-ignore
            num: r.累计分享至圈子的作品数,
          },
          {
            // @ts-ignore
            key: "5",
            // @ts-ignore
            content: "新增加入圈子的人数",
            // @ts-ignore
            num: r.累计加入圈子的人数,
          },
          {
            // @ts-ignore
            key: "6",
            // @ts-ignore
            content: "累计加入圈子的人数",
            // @ts-ignore
            num: r.累计加入圈子的人数,
          },
        ]);
      });
    }
  };

  return (
    <>
      <div className={"chart-card"}>
        <div className={"card-title"}>圈子相关数据</div>
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
