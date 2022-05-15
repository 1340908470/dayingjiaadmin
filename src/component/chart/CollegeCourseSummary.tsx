// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Table, Tag, Space } from "antd";
import { call } from "@/util/client";
import analytics from "@/util/backend/analytics";
import "./default.css";
import Loading from "@/component/layout/Loading";
import eosanalytics from "@/util/backend/eosanalytics";

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

export default function CollegeCourseSummary(props: DataSummaryProps) {
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
      call(eosanalytics.DataSummary, {
        begin: props.begin,
        end: props.end,
      }).then((r) => {
        // @ts-ignore
        setData([
          {
            // @ts-ignore
            key: "1",
            // @ts-ignore
            content: "学院课程总数",
            // @ts-ignore
            num: r.学院课程总数,
          },
          {
            // @ts-ignore
            key: "2",
            // @ts-ignore
            content: "课程访问人数",
            // @ts-ignore
            num: r.课程访问人数,
          },
          {
            // @ts-ignore
            key: "3",
            // @ts-ignore
            content: "用户提交作业数",
            // @ts-ignore
            num: r.用户提交作业数,
          },
          {
            // @ts-ignore
            key: "4",
            // @ts-ignore
            content: "待评分作业数",
            // @ts-ignore
            num: r.待评分作业数,
          },
          {
            // @ts-ignore
            key: "5",
            // @ts-ignore
            content: "基础知识课程测试人数",
            // @ts-ignore
            num: r.基础知识课程测试人数,
          },
          {
            // @ts-ignore
            key: "6",
            // @ts-ignore
            content: "推荐器材点击次数",
            // @ts-ignore
            num: r.推荐器材点击次数,
          },
          {
            // @ts-ignore
            key: "7",
            // @ts-ignore
            content: "用户累计提交作业数",
            // @ts-ignore
            num: r.用户累计提交作业数,
          },
          {
            // @ts-ignore
            key: "8",
            // @ts-ignore
            content: "已评分作业累计合格率",
            // @ts-ignore
            num: r.已评分作业累计合格率,
          },
          {
            // @ts-ignore
            key: "9",
            // @ts-ignore
            content: "基础知识课程累计测试人数",
            // @ts-ignore
            num: r.基础知识课程累计测试人数,
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
          学院课程概况
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
