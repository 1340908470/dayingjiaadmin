import React, { useState, useEffect } from "react";
import { Table, Tag, Space } from "antd";
import { call } from "@/util/client";
import analytics from "@/util/backend/analytics";
import "./default.css";
import style from "./default.css";

const columns = [
  {
    title: "特邀影家",
    dataIndex: "特邀影家",
    key: "特邀影家",
  },
  {
    title: "新增注册用户数",
    dataIndex: "新增注册用户数",
    key: "新增注册用户数",
  },
  {
    title: "新增圈子成员数",
    dataIndex: "新增圈子成员数",
    key: "新增圈子成员数",
  },
  {
    title: "新增圈子作品数",
    dataIndex: "新增圈子作品数",
    key: "新增圈子作品数",
  },
  {
    title: "新增作品获赞数",
    dataIndex: "新增作品获赞数",
    key: "新增作品获赞数",
  },
  {
    title: "新增作品被评论数",
    dataIndex: "新增作品被评论数",
    key: "新增作品被评论数",
  },
];

interface InviterFocusedProps {
  isMonthReport?: boolean;
  begin: string;
  end: string;
}

export default function InviterFocused(props: InviterFocusedProps) {
  let [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, [props.begin]);

  const asyncFetch = () => {
    if (props.begin && props.end) {
      call(analytics.InviterFocused, {
        begin: props.begin,
        end: props.end,
        stage: "202104",
      }).then((r) => {
        // @ts-ignore
        setData(r);
      });
    }
  };

  return (
    <>
      <div className={props.isMonthReport ? "chart-card-ppt" : "chart-card"}>
        <div className={props.isMonthReport ? "chart-title-ppt" : "card-title"}>
          特邀影家关注度统计
        </div>
        <div className={props.isMonthReport ? "inside-chart-ppt" : ""}>
          <Table pagination={false} dataSource={data} columns={columns} />
        </div>
      </div>
    </>
  );
}