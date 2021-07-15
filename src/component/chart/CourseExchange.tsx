import React, { useState, useEffect } from "react";
import { Bar } from "@ant-design/charts";
import analytics from "@/util/backend/analytics";
import { call } from "@/util/client";
import style from "@/component/chart/default.css";

interface CourseExchangeProps {
  begin: string;
  end: string;
}

export default function CourseExchange(props: CourseExchangeProps) {
  let [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, [props]);

  const asyncFetch = () => {
    if (props.begin && props.end) {
      call(analytics.Shop, {
        begin: props.begin,
        end: props.end,
      }).then((r) => {
        // @ts-ignore
        setData(r.精品课程兑换数);
      });
    }
  };

  return (
    <div className={"chart-card"}>
      <div className={"card-title"}>精品课程兑换数Top10</div>
      <Bar
        data={data}
        yField={"name"}
        xField={"sales"}
        yAxis={{
          label: { autoRotate: false },
        }}
        color={() => {
          return "#FF3E3E";
        }}
        scrollbar={{ type: "vertical" }}
      />
    </div>
  );
}
