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

export default function CollegeTeacher(props: CompetitionChannelProps) {
  const [loading, setLoading] = useState(true);
  let [data, setData] = useState([]);

  const columns = [
    {
      title: "评分老师",
      dataIndex: "推广渠道",
      key: "推广渠道",
    },
    {
      title: "新增评分作品数",
      dataIndex: "注册人数",
      key: "注册人数",
    },
    {
      title: "评分作品及格率",
      dataIndex: "访问次数",
      key: "访问次数",
    },
    {
      title: "新增点评作品数",
      dataIndex: "访问人数",
      key: "访问人数",
    },
    {
      title: "评分作品点评率",
      dataIndex: "老用户回归数",
      key: "老用户回归数",
    },
  ];

  useEffect(() => {
    setLoading(true);
    asyncFetch();
  }, [props.begin, props.end, props.id, props.category]);

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
         评分老师相关统计
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
