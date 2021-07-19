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
    title: "新用户数",
    dataIndex: "num",
    key: "num",
  },
  {
    title: "1天后",
    dataIndex: "day1",
    key: "day1",
    render: (text: any, row: any, index: number) => {
      return (
        <div style={{ width: "30px" }} key={index}>
          <div
            style={{
              backgroundColor: "rgba(255,62,62," + text + ")",
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              paddingTop: "12%",
              textAlign: "center",
              fontSize: "16px",
            }}
          >
            {text}
          </div>
        </div>
      );
    },
  },
  {
    title: "2天后",
    dataIndex: "day2",
    key: "day2",
    render: (text: any, row: any, index: number) => {
      return (
        <div style={{ width: "30px" }} key={index}>
          <div
            style={{
              backgroundColor: "rgba(255,62,62," + text + ")",
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              paddingTop: "12%",
              textAlign: "center",
              fontSize: "16px",
            }}
          >
            {text}
          </div>
        </div>
      );
    },
  },
  {
    title: "3天后",
    dataIndex: "day3",
    key: "day3",
    render: (text: any, row: any, index: number) => {
      return (
        <div style={{ width: "30px" }} key={index}>
          <div
            style={{
              backgroundColor: "rgba(255,62,62," + text + ")",
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              paddingTop: "12%",
              textAlign: "center",
              fontSize: "16px",
            }}
          >
            {text}
          </div>
        </div>
      );
    },
  },
  {
    title: "4天后",
    dataIndex: "day4",
    key: "day4",
    render: (text: any, row: any, index: number) => {
      return (
        <div style={{ width: "30px" }} key={index}>
          <div
            style={{
              backgroundColor: "rgba(255,62,62," + text + ")",
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              paddingTop: "12%",
              textAlign: "center",
              fontSize: "16px",
            }}
          >
            {text}
          </div>
        </div>
      );
    },
  },
  {
    title: "5天后",
    dataIndex: "day5",
    key: "day5",
    render: (text: any, row: any, index: number) => {
      return (
        <div style={{ width: "30px" }} key={index}>
          <div
            style={{
              backgroundColor: "rgba(255,62,62," + text + ")",
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              paddingTop: "12%",
              textAlign: "center",
              fontSize: "16px",
            }}
          >
            {text}
          </div>
        </div>
      );
    },
  },
  {
    title: "6天后",
    dataIndex: "day6",
    key: "day6",
    render: (text: any, row: any, index: number) => {
      return (
        <div style={{ width: "30px" }} key={index}>
          <div
            style={{
              backgroundColor: "rgba(255,62,62," + text + ")",
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              paddingTop: "12%",
              textAlign: "center",
              fontSize: "16px",
            }}
          >
            {text}
          </div>
        </div>
      );
    },
  },
  {
    title: "7天后",
    dataIndex: "day7",
    key: "day7",
    render: (text: any, row: any, index: number) => {
      return (
        <div style={{ width: "30px" }} key={index}>
          <div
            style={{
              backgroundColor: "rgba(255,62,62," + text + ")",
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              paddingTop: "12%",
              textAlign: "center",
              fontSize: "16px",
            }}
          >
            {text}
          </div>
        </div>
      );
    },
  },
];

interface NewDailyRetainProps {
  isMonthReport?: boolean;
  begin: string;
  end: string;
}

interface VisitUvNew {
  key: number;
  value: number;
}

interface VisitUv {
  key: number;
  value: number;
}

interface DailyRetain {
  ref_date: string; // 日期举例：20210531
  visit_uv_new: VisitUvNew[];
  visit_uv: VisitUv[];
}

export default function NewDailyRetain(props: NewDailyRetainProps) {
  let [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, [props.begin]);

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
    let visit_uv_new_time = [] as string[];
    if (props.begin && props.begin.includes("-")) {
      const timeStrings = props.begin.split("-");
      let time = new Date(
        Number.parseInt(timeStrings[0]),
        Number.parseInt(timeStrings[1]),
        Number.parseInt(timeStrings[2])
      );
      let timeString = convertTime(time);

      const updateStack = (r: DailyRetain) => {
        if (r.visit_uv_new) {
          visit_uv_news.push(r.visit_uv_new);
        }
        if (r.ref_date) {
          visit_uv_new_time.push(r.ref_date);
        }
        time = getPreviousDay(time);
        timeString = convertTime(time);
        return call(analytics.DailyRetain, {
          begin_date: timeString,
          end_date: timeString,
        });
      };

      call(analytics.DailyRetain, {
        begin_date: timeString,
        end_date: timeString,
      })
        .then(updateStack)
        .then(updateStack)
        .then(updateStack)
        .then(updateStack)
        .then(updateStack)
        .then((r) => {
          if (r.visit_uv_new) {
            visit_uv_news.push(r.visit_uv_new);
          }
          if (r.ref_date) {
            visit_uv_new_time.push(r.ref_date);
          }

          // @ts-ignore
          let tmpD = [];
          visit_uv_news.forEach((visit_uv_new, visit_uv_new_index) => {
            tmpD.push({
              key: visit_uv_new_index,
              index: visit_uv_new_index,
              time: visit_uv_new_time[visit_uv_new_index],
              num: visit_uv_new[0] ? visit_uv_new[0].value : "",
              day1: visit_uv_new[1]
                ? (visit_uv_new[1].value / visit_uv_new[0].value).toFixed(2)
                : "",
              day2: visit_uv_new[2]
                ? (visit_uv_new[2].value / visit_uv_new[0].value).toFixed(2)
                : "",
              day3: visit_uv_new[3]
                ? (visit_uv_new[3].value / visit_uv_new[0].value).toFixed(2)
                : "",
              day4: visit_uv_new[4]
                ? (visit_uv_new[4].value / visit_uv_new[0].value).toFixed(2)
                : "",
              day5: visit_uv_new[5]
                ? (visit_uv_new[5].value / visit_uv_new[0].value).toFixed(2)
                : "",
              day6: visit_uv_new[6]
                ? (visit_uv_new[6].value / visit_uv_new[0].value).toFixed(2)
                : "",
              day7: visit_uv_new[7]
                ? (visit_uv_new[7].value / visit_uv_new[0].value).toFixed(2)
                : "",
            });
          });

          // @ts-ignore
          setData(tmpD);
        });
    }
  };

  return (
    <>
      <div className={props.isMonthReport ? "chart-card-ppt" : "chart-card"}>
        <div className={props.isMonthReport ? "chart-title-ppt" : "card-title"}>
          新用户7日留存数据
        </div>
        <div className={props.isMonthReport ? "inside-chart-ppt" : ""}>
          <Table pagination={false} dataSource={data} columns={columns} />
        </div>
      </div>
    </>
  );
}
