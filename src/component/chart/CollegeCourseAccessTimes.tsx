// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Area, Bar } from "@ant-design/charts";
import { call } from "@/util/client";
import auth from "@/util/backend/auth";
import analytics from "@/util/backend/analytics";
import style from "@/component/chart/default.css";
import Loading from "@/component/layout/Loading";

interface RegisteredUserByDayProps {
  nowPage?: boolean;
  isMonthReport?: boolean;
  begin: string;
  end: string;
}

export default function CollegeCourseAccessTimes(props: RegisteredUserByDayProps) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    asyncFetch();
  }, [props.begin, props.end]);
  const asyncFetch = () => {
    if (props.begin && props.end) {
      call(analytics.RegisteredUserByDay, {
        begin: props.begin,
        end: props.end,
      }).then((r) => {
        // @ts-ignore
        setData(r);

        if (data) setLoading(false);
      });
    }
  };
  let config = {
    point: {
      size: 4,
      color: "#FF3E3E",
    },
    label: {
      style: {
        fill: "black",
        opacity: 0.6,
        fontSize: 14,
      },
      offsetY: -5,
      rotate: false,
    },

    color: "#FF3E3E",
    smooth: true,
    data: data,
    xField: "日期",
    yField: "amount",
    xAxis: {
      tickCount: data.length > 12 ? 12 : 7,
    },
    yAxis: {
      max:
        data.length == 0
          ? 0
          : data?.slice(0).sort((a, b) => b.amount - a.amount)[0].amount +
            Math.pow(
              10,
              Number.parseInt(
                Math.log10(
                  data?.slice(0).sort((a, b) => b.amount - a.amount)[0].amount
                )
              ) - 1
            ),
    },
  };
  return (
    <>
      <div className={props.isMonthReport ? "chart-card-ppt" : "chart-card"}>
        <div
          hidden={props.nowPage}
          className={props.isMonthReport ? "chart-title-ppt" : "card-title"}
        >
          课程访问次数
        </div>

        {loading ? <Loading /> : <Area {...config} />}
      </div>
    </>
  );
}
