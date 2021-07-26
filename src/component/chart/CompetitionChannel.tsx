// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Table, Tag, Space } from "antd";
import { call } from "@/util/client";
import analytics from "@/util/backend/analytics";
import "./default.css";
import style from "./default.css";
import Loading from "@/component/layout/Loading";

interface CompetitionChannelProps {
  nowPage: string;
  name?: string;
  isMonthReport?: boolean;
  id: number;
  category: number;
  begin: string;
  end: string;
}

export default function CompetitionChannel(props: CompetitionChannelProps) {
  const [loading, setLoading] = useState(true);
  let [data, setData] = useState([]);

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
      title: props.category ? "参与数" : "投稿数",
      dataIndex: "投稿数",
      key: "投稿数",
    },
    {
      title: "老用户回归数",
      dataIndex: "老用户回归数",
      key: "老用户回归数",
    },
  ];

  useEffect(() => {
    setLoading(true);
    asyncFetch();
  }, [props.begin, props.id, props.category]);

  const asyncFetch = () => {
    if (props.begin && props.end) {
      call(analytics.CompetitionChannel, {
        category: props.category,
        id: props.id,
        begin: props.begin,
        end: props.end,
      }).then((r) => {
        setData(r);
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
          {props.name ? `"${props.name}" 各推广渠道数据` : "各推广渠道数据"}
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className={props.isMonthReport ? "inside-chart-ppt" : ""}>
            <Table pagination={false} dataSource={data} columns={columns} />
          </div>
        )}
      </div>
    </>
  );
}
