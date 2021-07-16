import React, { useState, useEffect } from "react";
import { Table, Tag, Space } from "antd";
import { call } from "@/util/client";
import analytics, { WeeklyCompetition } from "@/util/backend/analytics";
import "./default.css";
import style from "./default.css";
import { Competition } from "@/pages/PhotoCompetition";

interface UserJoinCompetitionProps {
  isMonthReport?: boolean;
  begin: string;
  end: string;
}

export default function UserJoinCompetition(props: UserJoinCompetitionProps) {
  let [data, setData] = useState([] as WeeklyCompetition[]);

  useEffect(() => {
    if (data.length === 0 && props.begin) asyncFetch();
  }, [props.begin, data]);

  const asyncFetch = () => {
    call(analytics.TotalCompetition, {
      begin: props.begin,
      end: props.end,
    }).then((r) => {
      let tmpData = [] as WeeklyCompetition[];
      r.forEach((value, index) => {
        call(analytics.WeeklyCompetition, {
          id: value.id,
        }).then((res) => {
          if (
            !data.includes({
              name: res.name,
              lastweek: res.lastweek,
              total: res.total,
            })
          ) {
            tmpData = [
              ...tmpData,
              {
                name: res.name,
                lastweek: res.lastweek,
                total: res.total,
              },
            ];
            setData([...tmpData]);
          }
        });
      });
    });
  };

  const columns = [
    {
      title: "进行中的比赛",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "上周投稿人数",
      dataIndex: "lastweek",
      key: "lastweek",
    },
    {
      title: "累计投稿人数",
      dataIndex: "total",
      key: "total",
    },
  ];

  return (
    <>
      <div className={props.isMonthReport ? "chart-card-ppt" : "chart-card"}>
        <div className={props.isMonthReport ? "chart-title-ppt" : "card-title"}>
          用户参赛情况
        </div>
        <Table pagination={false} dataSource={data} columns={columns} />
      </div>
    </>
  );
}
