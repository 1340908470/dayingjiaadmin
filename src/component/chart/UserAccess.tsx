// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Area, Bar } from "@ant-design/charts";
import { call } from "@/util/client";
import auth from "@/util/backend/auth";
import analytics from "@/util/backend/analytics";
import style from "@/component/chart/default.css";
import Loading from "@/component/layout/Loading";

interface UserAccessProps {
  isMonthReport?: boolean;
  begin: string;
  end: string;
}

export default function UserAccess(props: UserAccessProps) {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);
  useEffect(() => {
    setLoading(true);
    asyncFetch();
  }, [props.begin]);
  const asyncFetch = () => {
    if (props.begin && props.end) {
      call(analytics.UserAccess, {
        begin: props.begin,
        end: props.end,
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
    xField: "日期",
    yField: "amount",
    xAxis: { tickCount: data.length > 12 ? 12 : 7 },
  };
  return (
    <>
      <div className={props.isMonthReport ? "chart-card-ppt" : "chart-card"}>
        <div className={props.isMonthReport ? "chart-title-ppt" : "card-title"}>
          用户访问次数
        </div>
        {loading ? <Loading /> : <Area {...config} />}
      </div>
    </>
  );
}
