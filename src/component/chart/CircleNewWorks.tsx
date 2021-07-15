import React, { useState, useEffect } from "react";
import { Bar } from "@ant-design/charts";
import pandect from "@/util/backend/analytics";
import { call } from "@/util/client";
import style from "@/component/chart/default.css";

interface CircleNewWorksProps {
  begin: string;
  end: string;
}

export default function CircleNewWorks(props: CircleNewWorksProps) {
  let [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, [props.begin]);

  const asyncFetch = () => {
    if (props.begin && props.end) {
      call(pandect.GroupData, {
        begin: props.begin,
        end: props.end,
      }).then((r) => {
        // @ts-ignore
        setData(r.新增作品数TOP10);
      });
    }
  };

  return (
    <div className={"chart-card"}>
      <div className={"card-title"}>圈子新增作品数TOP10对比</div>
      <Bar
        data={data}
        yField={"name"}
        xField={"amount"}
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
