// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Area, Bar } from "@ant-design/charts";
import { call } from "@/util/client";
import auth from "@/util/backend/auth";
import analytics from "@/util/backend/analytics";
import style from "@/component/chart/default.css";

interface UserAccessProps {
  begin: string;
  end: string;
}

export default function UserAccess(props: UserAccessProps) {
  const [data, setData] = useState([]);
  useEffect(() => {
    asyncFetch();
  }, [props]);
  const asyncFetch = () => {
    call(analytics.UserAccess, {
      begin: props.begin,
      end: props.end,
    }).then((r) => {
      setData(r);
      // if (data.length === 0) {
      //     setData(r)
      // }
    });
  };
  let config = {
    color: "#FF3E3E",
    smooth: true,
    data: data,
    xField: "日期",
    yField: "amount",
    xAxis: { tickCount: 5 },
  };
  return (
    <>
      <div className={"chart-card"}>
        <div className={"card-title"}>用户访问次数</div>
        <Area {...config} />
      </div>
    </>
  );
}
