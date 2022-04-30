// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Area, Bar } from "@ant-design/charts";
import { call } from "@/util/client";
import auth from "@/util/backend/auth";
import analytics from "@/util/backend/analytics";
import style from "@/component/chart/default.css";
import Loading from "@/component/layout/Loading";

interface UserContributionsTrendProps {
  nowPage: string;
  name?: string;
  isMonthReport?: boolean;
  id: number;
  category: number;
  begin: string;
  end: string;
}

export default function CollegeUserRegisterTrend(
  props: UserContributionsTrendProps
) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    asyncFetch();
  }, [props.begin, props.end, props.id, props.category]);

  const asyncFetch = () => {
    if (props.begin) {
      call(analytics.CompetitionParticipate, {
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
              ? `"${props.name}" 用户注册趋势`
              : "用户注册趋势"
            : props.name
            ? `"${props.name}" 用户投稿趋势`
            : "用户投稿趋势"}
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
