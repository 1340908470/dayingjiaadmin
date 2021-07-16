import React, { useState, useEffect } from "react";
import { Bar } from "@ant-design/charts";
import analytics from "@/util/backend/analytics";
import { call } from "@/util/client";
import style from "@/component/chart/default.css";

interface AvatarExchangeProps {
  isMonthReport?: boolean;
  begin: string;
  end: string;
}

export default function AvatarExchange(props: AvatarExchangeProps) {
  let [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, [props.begin]);

  const asyncFetch = () => {
    if (props.begin && props.end) {
      call(analytics.Shop, {
        begin: props.begin,
        end: props.end,
      }).then((r) => {
        // @ts-ignore
        setData(r.头像挂件兑换数);
      });
    }
  };

  return (
    <div className={props.isMonthReport ? "chart-card-ppt" : "chart-card"}>
      <div className={props.isMonthReport ? "chart-title-ppt" : "card-title"}>
        头像挂件兑换数Top10
      </div>

      <div className={props.isMonthReport ? "inside-chart-ppt" : ""}>
        <Bar
          height={400}
          data={data}
          yField={"name"}
          xField={"sales"}
          yAxis={{
            label: { autoRotate: false },
          }}
          color={() => {
            return "#FF3E3E";
          }}
        />
      </div>
    </div>
  );
}
