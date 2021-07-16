import React, { useState, useEffect } from "react";
import { Bar } from "@ant-design/charts";
import pandect from "@/util/backend/analytics";
import { call } from "@/util/client";
import style from "@/component/chart/default.css";

interface InviteGroupPhotosProps {
  isMonthReport?: boolean;
  begin: string;
  end: string;
}

export default function InviteGroupPhotos(props: InviteGroupPhotosProps) {
  let [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, [props.begin]);

  const asyncFetch = () => {
    if (props.begin && props.end) {
      call(pandect.InviteGroupPhotos, {
        stage: "",
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
        圈子内新作品数
      </div>
      <Bar
        data={data}
        yField={"name"}
        xField={"data"}
        yAxis={{
          label: { autoRotate: false },
        }}
        color={() => {
          return "#FF3E3E";
        }}
      />
    </div>
  );
}
