import React, { useState, useEffect } from "react";
import { Bar } from "@ant-design/charts";
import pandect from "@/util/backend/analytics";
import { call } from "@/util/client";
import style from "@/component/chart/default.css";

interface PhotoTypeProps {
  isMonthReport?: boolean;
  begin: string;
  end: string;
}

export default function PhotoTag(props: PhotoTypeProps) {
  let [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, [props.begin]);

  const asyncFetch = () => {
    if (props.begin && props.end) {
      call(pandect.PhotoTag, {
        begin: props.begin,
        end: props.end,
      }).then((r) => {
        // @ts-ignore
        setData(r);
      });
    }
  };

  return (
    <div className={props.isMonthReport ? "chart-card-ppt" : "chart-card"}>
      <div className={props.isMonthReport ? "chart-title-ppt" : "card-title"}>
        不同标签作品数统计
      </div>
      <div className={props.isMonthReport ? "inside-chart-ppt" : ""}>
        <Bar
          height={400}
          data={data}
          yField={"tag"}
          xField={"amount"}
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
