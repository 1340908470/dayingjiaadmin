// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Area, Bar } from "@ant-design/charts";
import { call } from "@/util/client";
import auth from "@/util/backend/auth";
import analytics from "@/util/backend/analytics";
import style from "@/component/chart/default.css";
import { Table } from "antd";

interface NumbersOfNewUserEveryWeekProps {
  isMonthReport?: boolean;
  begin: string;
  end: string;
}

export default function NumbersOfNewUserEveryWeek(
  props: NumbersOfNewUserEveryWeekProps
) {
  const [data, setData] = useState([]);
  useEffect(() => {
    asyncFetch();
  }, [props.begin]);
  const asyncFetch = () => {
    if (props.begin && props.end) {
      call(analytics.RegisteredUserByMonth, {
        month: props.begin.split("-")[0] + "-" + props.begin.split("-")[1],
      }).then((r) => {
        setData(r);
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
    xField: "周数",
    yField: "amount",
    xAxis: { tickCount: 5 },
  };
  return (
    <>
      <div className={props.isMonthReport ? "chart-card-ppt" : "chart-card"}>
        <div className={props.isMonthReport ? "chart-title-ppt" : "card-title"}>
          每周新增注册用户数
        </div>{" "}
        <div className={props.isMonthReport ? "inside-chart-ppt" : ""}>
          <Area {...config} />
        </div>
      </div>
    </>
  );
}