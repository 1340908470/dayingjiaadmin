// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Table, Tag, Space } from "antd";
import { call } from "@/util/client";
import analytics from "@/util/backend/analytics";
import "./default.css";
import style from "./default.css";

const columns = [
  {
    title: "推广渠道",
    dataIndex: "推广渠道",
    key: "推广渠道",
  },
  {
    title: "注册人数",
    dataIndex: "注册人数",
    key: "注册人数",
  },
  {
    title: "访问次数",
    dataIndex: "访问次数",
    key: "访问次数",
  },
  {
    title: "访问人数",
    dataIndex: "访问人数",
    key: "访问人数",
  },
  {
    title: "投稿数",
    dataIndex: "投稿数",
    key: "投稿数",
  },
  {
    title: "老用户回归数",
    dataIndex: "老用户回归数",
    key: "老用户回归数",
  },
];

interface CompetitionChannelProps {
  id: number;
  begin: string;
  end: string;
}

export default function CompetitionChannel(props: CompetitionChannelProps) {
  let [data, setData] = useState([]);

  useEffect(() => {
    if (data.length === 0) asyncFetch();
  }, [props.begin]);

  const asyncFetch = () => {
    if (props.begin && props.end) {
      call(analytics.CompetitionChannel, {
        id: props.id,
        begin: props.begin,
        end: props.end,
      }).then((r) => {
        setData(r);
      });
    }
  };

  return (
    <>
      <div className={"chart-card"}>
        <div className={"card-title"}>各推广渠道数据</div>
        <Table pagination={false} dataSource={data} columns={columns} />
      </div>
    </>
  );
}
