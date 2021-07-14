import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { call } from "@/util/client";
import analytics from "@/util/backend/analytics";
import "./default.css";

const columns = [
  {
    title: "时间",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "活跃用户数",
    dataIndex: "num",
    key: "num",
  },
  {
    title: "1天后",
    dataIndex: "day1",
    key: "day1",
  },
  {
    title: "2天后",
    dataIndex: "day2",
    key: "day2",
  },
  {
    title: "3天后",
    dataIndex: "day3",
    key: "day3",
  },
  {
    title: "4天后",
    dataIndex: "day4",
    key: "day4",
  },
  {
    title: "5天后",
    dataIndex: "day5",
    key: "day5",
  },
  {
    title: "6天后",
    dataIndex: "day6",
    key: "day6",
  },
  {
    title: "7天后",
    dataIndex: "day7",
    key: "day7",
  },
];

interface NewDailyRetainProps {
  begin: string;
  end: string;
}

interface VisitUvNew {
  key: number;
  value: number;
}

export default function NewDailyRetain(props: NewDailyRetainProps) {
  let [data, setData] = useState([]);

  useEffect(() => {
    if (data.length === 0) asyncFetch();
  }, [props]);

  const getRowClassName = (record: any, index: number) => {
    let className = "";
    className = index % 2 === 0 ? "table-odd" : "table-even";
    return className;
  };

  const convertTime = (date: Date) => {
    return (
      date.getFullYear() +
      "" +
      ("0" + date.getMonth()).slice(-2) +
      "" +
      ("0" + date.getDate()).slice(-2)
    );
  };

  const getPreviousDay = (date: Date) => {
    //格式化
    return new Date(date.getTime() - 1000 * 60 * 60 * 24);
  };

  const asyncFetch = () => {
    let visit_uv_news = [] as VisitUvNew[][];
    if (props.begin && props.begin.includes("-")) {
      const timeStrings = props.begin.split("-");
      let time = new Date(
        Number.parseInt(timeStrings[0]),
        Number.parseInt(timeStrings[1]),
        Number.parseInt(timeStrings[2])
      );
      let timeString = convertTime(time);
      call(analytics.DailyRetain, {
        begin_date: timeString,
        end_date: timeString,
      })
        .then((r) => {
          if (r.visit_uv_new) {
            visit_uv_news.push(r.visit_uv_new);
          }
          time = getPreviousDay(time);
          timeString = convertTime(time);
          return call(analytics.DailyRetain, {
            begin_date: timeString,
            end_date: timeString,
          });
        })
        .then((r) => {
          if (r.visit_uv_new) {
            visit_uv_news.push(r.visit_uv_new);
          }
          time = getPreviousDay(time);
          timeString = convertTime(time);
          return call(analytics.DailyRetain, {
            begin_date: timeString,
            end_date: timeString,
          });
        })
        .then((r) => {
          if (r.visit_uv_new) {
            visit_uv_news.push(r.visit_uv_new);
          }
          time = getPreviousDay(time);
          timeString = convertTime(time);
          return call(analytics.DailyRetain, {
            begin_date: timeString,
            end_date: timeString,
          });
        })
        .then((r) => {
          if (r.visit_uv_new) {
            visit_uv_news.push(r.visit_uv_new);
          }
          time = getPreviousDay(time);
          timeString = convertTime(time);
          return call(analytics.DailyRetain, {
            begin_date: timeString,
            end_date: timeString,
          });
        })
        .then((r) => {
          if (r.visit_uv_new) {
            visit_uv_news.push(r.visit_uv_new);
          }
          time = getPreviousDay(time);
          timeString = convertTime(time);
          return call(analytics.DailyRetain, {
            begin_date: timeString,
            end_date: timeString,
          });
        })
        .then((r) => {
          if (r.visit_uv_new) {
            visit_uv_news.push(r.visit_uv_new);
          }
          time = getPreviousDay(time);
          timeString = convertTime(time);
          return call(analytics.DailyRetain, {
            begin_date: timeString,
            end_date: timeString,
          });
        })
        .then(() => {
          console.log(visit_uv_news);
        });
    }
  };

  return (
    <>
      <div className={"chart-card"}>
        <div className={"card-title"}>新用户7日留存数据</div>
        <Table
          rowClassName={getRowClassName}
          pagination={false}
          showHeader={false}
          dataSource={data}
          columns={columns}
        />
      </div>
    </>
  );
}
