// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Area, Bar } from "@ant-design/charts";
import { call } from "@/util/client";
import analytics from "@/util/backend/analytics";
import Loading from "@/component/layout/Loading";

interface ChallengeWorksTrendProps {
  isMonthReport?: boolean;
  begin: string;
  end: string;
}

export default function ChallengeWorksTrend(props: ChallengeWorksTrendProps) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    asyncFetch();
  }, [props.begin]);
  const asyncFetch = () => {
    if (props.begin && props.end) {
      call(analytics.ChallengeData, {
        begin: props.begin,
        end: props.end,
      }).then((r) => {
        setData(r.挑战作品发布趋势);
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
    xField: "date",
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
          挑战作品发布趋势
        </div>
        {loading ? <Loading /> : <Area {...config} />}
      </div>
    </>
  );
}
