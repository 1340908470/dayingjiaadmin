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

interface DataSummaryProps {
  isMonthReport?: boolean;
  begin: string;
  end: string;
}

export default function CircleRelatedData(props: DataSummaryProps) {
  const [loading, setLoading] = useState(true);
  let [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    asyncFetch();
  }, [props.begin, props.end]);

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
            num: r.新增加入圈子的人数,
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
        if (data) setLoading(false);
      });
    }
  };

  return (
    <>
      <div className={props.isMonthReport ? "chart-card-ppt" : "chart-card"}>
        <div className={props.isMonthReport ? "chart-title-ppt" : "card-title"}>
          圈子相关数据
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
