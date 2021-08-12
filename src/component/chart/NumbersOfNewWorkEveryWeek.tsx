// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Area, Bar } from "@ant-design/charts";
import { call } from "@/util/client";
import auth from "@/util/backend/auth";
import analytics from "@/util/backend/analytics";
import style from "@/component/chart/default.css";
import { Table } from "antd";
import Loading from "@/component/layout/Loading";

interface NumbersOfNewWorkEveryWeekProps {
  isMonthReport?: boolean;
  begin: string;
  end: string;
}

export default function NumbersOfNewWorkEveryWeek(
  props: NumbersOfNewWorkEveryWeekProps
) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    setLoading(true);
    asyncFetch();
  }, [props.begin, props.end]);
  const asyncFetch = () => {
    if (props.begin && props.end) {
      call(analytics.PhotosByMonth, {
        month: props.begin.split("-")[0] + "-" + props.begin.split("-")[1],
      }).then((r) => {
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
    xField: "周数",
    yField: "amount",
    yAxis: {
      tickCount: 5,
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
    xAxis: { tickCount: data.length > 12 ? 12 : 7 },
  };
  return (
    <>
      <div className={props.isMonthReport ? "chart-card-ppt" : "chart-card"}>
        <div className={props.isMonthReport ? "chart-title-ppt" : "card-title"}>
          每周新增作品数
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className={props.isMonthReport ? "inside-chart-ppt" : ""}>
            <Area {...config} />
          </div>
        )}
      </div>
    </>
  );
}
