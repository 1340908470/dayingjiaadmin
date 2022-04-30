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
  nowPage?: boolean;
  isMonthReport?: boolean;
  begin: string;
  end: string;
}

export default function CollegeDataSummary(props: DataSummaryProps) {
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
            content: "加入学院用户数",
            // @ts-ignore
            num: r.访问人数,
          },
          {
            // @ts-ignore
            key: "2",
            // @ts-ignore
            content: "用户提交课程作业数",
            // @ts-ignore
            num: r.访问次数,
          },
          {
            // @ts-ignore
            key: "3",
            // @ts-ignore
            content: "校园巡展活动参与人数",
            // @ts-ignore
            num: r.新注册用户数,
          },
          {
            // @ts-ignore
            key: "4",
            // @ts-ignore
            content: "R-CAMP活动参与人数",
            // @ts-ignore
            num: r.老用户回归数,
          },
          {
            // @ts-ignore
            key: "5",
            // @ts-ignore
            content: "推荐器材用户点击数",
            // @ts-ignore
            num: r.新作品数,
          },
          {
            // @ts-ignore
            key: "6",
            // @ts-ignore
            content: "获得证书用户数",
            // @ts-ignore
            num: r.本年度新增注册用户数,
          },
          {
            // @ts-ignore
            key: "7",
            // @ts-ignore
            content: "累计加入学院用户数",
            // @ts-ignore
            num: r.本年度新增作品数,
          },
          {
            // @ts-ignore
            key: "8",
            // @ts-ignore
            content: "累计获得证书用户数",
            // @ts-ignore
            num: r.累计注册用户数,
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
          EOS青年影像学院数据概况
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
