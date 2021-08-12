// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Area, Bar } from "@ant-design/charts";
import { call } from "@/util/client";
import auth from "@/util/backend/auth";
import analytics from "@/util/backend/analytics";
import style from "@/component/chart/default.css";
import Loading from "@/component/layout/Loading";

interface NewUserRegisterProps {
  nowPage: string;
  category: number;
  name?: string;
  isMonthReport?: boolean;
  id: number;
  begin: string;
  end: string;
}

export default function NewUserRegister(props: NewUserRegisterProps) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    setLoading(true);
    asyncFetch();
  }, [props.begin, props.end, props.id]);
  const asyncFetch = () => {
    if (props.begin && props.end) {
      call(analytics.CompetitionRegister, {
        category: props.category,
        id: props.id,
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
        <div
          hidden={props.nowPage}
          className={props.isMonthReport ? "chart-title-ppt" : "card-title"}
        >
          {props.category === 1
            ? props.name
              ? `"${props.name}" 新增注册用户`
              : "新增注册用户"
            : props.name
            ? `"${props.name}" 新增注册用户`
            : "新增注册用户"}
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
