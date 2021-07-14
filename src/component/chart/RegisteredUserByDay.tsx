import React, { useState, useEffect } from "react";
import { Area, Bar } from "@ant-design/charts";
import { call } from "@/util/client";
import auth from "@/util/backend/auth";
import analytics from "@/util/backend/analytics";
import style from "@/component/chart/default.css";

interface RegisteredUserByDayProps {
  begin: string;
  end: string;
}

export default function RegisteredUserByDay(props: RegisteredUserByDayProps) {
  const [data, setData] = useState([]);
  useEffect(() => {
    asyncFetch();
  }, [props]);
  const asyncFetch = () => {
    if (props.begin && props.end) {
      call(analytics.RegisteredUserByDay, {
        begin: props.begin,
        end: props.end,
      }).then((r) => {
        // @ts-ignore
        setData(r);
        // if (data.length === 0) {
        //     // @ts-ignore
        //     setData(r)
        // }
      });
    }
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
        <div className={"card-title"}>新增用户注册数</div>
        <Area {...config} />
      </div>
    </>
  );
}
