// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Area, Bar } from "@ant-design/charts";
import { call } from "@/util/client";
import auth from "@/util/backend/auth";
import analytics from "@/util/backend/analytics";
import style from "@/component/chart/default.css";

interface CircleTrendProps {
  begin: string;
  end: string;
}

export default function CircleTrend(props: CircleTrendProps) {
  const [data, setData] = useState([]);
  useEffect(() => {
    asyncFetch();
  }, [props]);
  const asyncFetch = () => {
    if (props.begin && props.end) {
      call(analytics.GroupData, {
        begin: props.begin,
        end: props.end,
      }).then((r) => {
        setData(r.圈子作品发布趋势);
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
    xField: "date",
    yField: "amount",
    xAxis: { tickCount: 5 },
  };
  return (
    <>
      <div className={"chart-card"}>
        <div className={"card-title"}>圈子作品发布趋势</div>
        <Area {...config} />
      </div>
    </>
  );
}
