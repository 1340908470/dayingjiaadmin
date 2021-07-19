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
  },
];

interface ChallengeRelatedDataProps {
  isMonthReport?: boolean;
  begin: string;
  end: string;
}

export default function ChallengeRelatedData(props: ChallengeRelatedDataProps) {
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
      call(analytics.ChallengeData, {
        begin: props.begin,
        end: props.end,
      }).then((r) => {
        // @ts-ignore
        setData([
          {
            // @ts-ignore
            key: "1",
            // @ts-ignore
            content: "新增挑战作品数",
            // @ts-ignore
            num: r.挑战相关数据[0].新增挑战作品数,
          },
          {
            // @ts-ignore
            key: "2",
            // @ts-ignore
            content: "新增挑战成功作品数",
            // @ts-ignore
            num: r.挑战相关数据[0].新增挑战成功作品数,
          },
          {
            // @ts-ignore
            key: "3",
            // @ts-ignore
            content: "新增获取头衔用户数",
            // @ts-ignore
            num: r.挑战相关数据[0].新增获取头衔用户数,
          },
          {
            // @ts-ignore
            key: "4",
            // @ts-ignore
            content: "累计挑战通关用户数",
            // @ts-ignore
            num: r.挑战相关数据[0].累计挑战通关用户数,
          },
          {
            // @ts-ignore
            key: "5",
            // @ts-ignore
            content: "累计挑战作品数",
            // @ts-ignore
            num: r.挑战相关数据[0].累计挑战作品数,
          },
          {
            // @ts-ignore
            key: "6",
            // @ts-ignore
            content: "累计挑战成功作品数",
            // @ts-ignore
            num: r.挑战相关数据[0].累计挑战成功作品数,
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
          挑战相关数据
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
