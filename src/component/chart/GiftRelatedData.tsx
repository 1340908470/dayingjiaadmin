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

interface GiftRelatedDataProps {
  nowPage?: boolean;
  isMonthReport?: boolean;
  begin: string;
  end: string;
}

export default function GiftRelatedData(props: GiftRelatedDataProps) {
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
          礼品相关数据
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
