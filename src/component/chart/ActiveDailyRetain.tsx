import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { call } from "@/util/client";
import analytics from "@/util/backend/analytics";
import "./default.css";
import Loading from "@/component/layout/Loading";

const convertText = (text: string) => {
  const num = Number.parseFloat(text) / 100;
  console.log(num);
  return (num - 1) * (num - 1) * (num - 1) + 1;
};

const columns = [
  {
    title: "时间",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "访问用户数",
    dataIndex: "num",
    key: "num",
  },
  {
    title: "1天后",
    dataIndex: "day1",
    key: "day1",
    render: (text: any, row: any, index: number) => {
      return (
        <div style={{ width: "30px" }}>
          <div
            style={{
              backgroundColor:
                text === "" ? "" : "rgba(255,62,62," + convertText(text) + ")",
              position: "absolute",
              color: text === "" ? "Gainsboro" : "",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              paddingTop: "12%",
              textAlign: "center",
              fontSize: "16px",
            }}
          >
            {text === "" ? "一" : text}
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
        <div style={{ width: "30px" }}>
          <div
            style={{
              backgroundColor:
                text === "" ? "" : "rgba(255,62,62," + convertText(text) + ")",
              position: "absolute",
              color: text === "" ? "Gainsboro" : "",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              paddingTop: "12%",
              textAlign: "center",
              fontSize: "16px",
            }}
          >
            {text === "" ? "一" : text}
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
        <div style={{ width: "30px" }}>
          <div
            style={{
              backgroundColor:
                text === "" ? "" : "rgba(255,62,62," + convertText(text) + ")",
              position: "absolute",
              color: text === "" ? "Gainsboro" : "",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              paddingTop: "12%",
              textAlign: "center",
              fontSize: "16px",
            }}
          >
            {text === "" ? "一" : text}
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
        <div style={{ width: "30px" }}>
          <div
            style={{
              backgroundColor:
                text === "" ? "" : "rgba(255,62,62," + convertText(text) + ")",
              position: "absolute",
              color: text === "" ? "Gainsboro" : "",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              paddingTop: "12%",
              textAlign: "center",
              fontSize: "16px",
            }}
          >
            {text === "" ? "一" : text}
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
        <div style={{ width: "30px" }}>
          <div
            style={{
              backgroundColor:
                text === "" ? "" : "rgba(255,62,62," + convertText(text) + ")",
              position: "absolute",
              color: text === "" ? "Gainsboro" : "",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              paddingTop: "12%",
              textAlign: "center",
              fontSize: "16px",
            }}
          >
            {text === "" ? "一" : text}
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
        <div style={{ width: "30px" }}>
          <div
            style={{
              backgroundColor:
                text === "" ? "" : "rgba(255,62,62," + convertText(text) + ")",
              position: "absolute",
              color: text === "" ? "Gainsboro" : "",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              paddingTop: "12%",
              textAlign: "center",
              fontSize: "16px",
            }}
          >
            {text === "" ? "一" : text}
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
        <div style={{ width: "30px" }}>
          <div
            style={{
              backgroundColor:
                text === "" ? "" : "rgba(255,62,62," + convertText(text) + ")",
              position: "absolute",
              color: text === "" ? "Gainsboro" : "",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              paddingTop: "12%",
              textAlign: "center",
              fontSize: "16px",
            }}
          >
            {text === "" ? "一" : text}
          </div>
        </div>
      );
    },
  },
];

interface ActiveDailyRetainProps {
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

export default function ActiveDailyRetain(props: ActiveDailyRetainProps) {
  let [data, setData] = useState([]);
  let [len, setLen] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(data);

  useEffect(() => {
    setLoading(true);
    console.log(props);
    asyncFetch();
  }, [props]);

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
    console.log(props);

    let visit_uvs = [] as VisitUvNew[][];
    let visit_uv_time = [] as string[];
    if (props.begin && props.begin.includes("-")) {
      const timeStrings = props.end.split("-");
      let time = new Date(
        Number.parseInt(timeStrings[0]),
        Number.parseInt(timeStrings[1]),
        Number.parseInt(timeStrings[2])
      );
      let timeString = convertTime(time);

      const updateStack = (r: DailyRetain) => {
        if (r.visit_uv) {
          visit_uvs.push(r.visit_uv);
        }
        if (r.ref_date) {
          visit_uv_time.push(r.ref_date);
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
        .then(async (r) => {
          if (props.begin === props.end) {
            for (let i = 0; i < 5; i++) {
              r = await updateStack(r);
            }
          } else {
            while (time.getDate() !== 1) {
              r = await updateStack(r);
            }
          }
          return r;
        })
        .then((r) => {
          if (r.visit_uv) {
            visit_uvs.push(r.visit_uv);
          }
          if (r.ref_date) {
            visit_uv_time.push(r.ref_date);
          }

          // @ts-ignore
          let tmpD = [];
          visit_uvs.forEach((visit_uv, visit_uv_index) => {
            tmpD.push({
              key: visit_uv_index,
              index: visit_uv_index,
              time: visit_uv_time[visit_uv_index],
              num: visit_uv[0] ? visit_uv[0].value : "",
              day1: visit_uv[1]
                ? ((visit_uv[1].value / visit_uv[0].value) * 100).toFixed(2) +
                  "%"
                : "",
              day2: visit_uv[2]
                ? ((visit_uv[2].value / visit_uv[0].value) * 100).toFixed(2) +
                  "%"
                : "",
              day3: visit_uv[3]
                ? ((visit_uv[3].value / visit_uv[0].value) * 100).toFixed(2) +
                  "%"
                : "",
              day4: visit_uv[4]
                ? ((visit_uv[4].value / visit_uv[0].value) * 100).toFixed(2) +
                  "%"
                : "",
              day5: visit_uv[5]
                ? ((visit_uv[5].value / visit_uv[0].value) * 100).toFixed(2) +
                  "%"
                : "",
              day6: visit_uv[6]
                ? ((visit_uv[6].value / visit_uv[0].value) * 100).toFixed(2) +
                  "%"
                : "",
              day7: visit_uv[7]
                ? ((visit_uv[7].value / visit_uv[0].value) * 100).toFixed(2) +
                  "%"
                : "",
            });
          });

          // @ts-ignore
          setData(tmpD);

          let tmpLen = [];
          for (let i = 0; i < tmpD.length / 10; i++) {
            tmpLen.push(i);
          }
          // @ts-ignore
          setLen(tmpLen);

          if (data) setLoading(false);
        });
    }
  };

  return (
    <>
      <div
        hidden={!loading}
        className={props.isMonthReport ? "chart-card-ppt" : "chart-card"}
      >
        <div className={props.isMonthReport ? "chart-title-ppt" : "card-title"}>
          {props.isMonthReport ? "访问用户留存数据" : "访问用户7日留存数据"}
        </div>
        {loading ? <Loading /> : ""}
      </div>
      {len.map((value, index) => (
        <div
          hidden={loading && !props.isMonthReport}
          key={index}
          className={props.isMonthReport ? "chart-card-ppt" : "chart-card"}
        >
          <div
            className={props.isMonthReport ? "chart-title-ppt" : "card-title"}
          >
            {props.isMonthReport ? "访问用户留存数据" : "访问用户7日留存数据"}
          </div>
          {props.isMonthReport ? (
            <div className={props.isMonthReport ? "inside-chart-ppt" : ""}>
              {loading ? (
                <Loading />
              ) : (
                <Table
                  pagination={false}
                  dataSource={data.slice(
                    value * 10,
                    (value + 1) * 10 > data.length
                      ? data.length
                      : (value + 1) * 10
                  )}
                  columns={columns}
                />
              )}
            </div>
          ) : (
            <Table
              pagination={false}
              dataSource={data.slice(
                value * 10,
                (value + 1) * 10 > data.length ? data.length : (value + 1) * 10
              )}
              columns={columns}
            />
          )}
        </div>
      ))}
    </>
  );
}
