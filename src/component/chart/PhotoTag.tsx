import React, { useState, useEffect } from "react";
import { Bar } from "@ant-design/charts";
import pandect from "@/util/backend/analytics";
import { call } from "@/util/client";
import style from "@/component/chart/default.css";

interface PhotoTypeProps {
  begin: string;
  end: string;
}

export default function PhotoTag(props: PhotoTypeProps) {
  let [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, [props]);

  const asyncFetch = () => {
    call(pandect.PhotoTag, {
      begin: props.begin,
      end: props.end,
    }).then((r) => {
      // @ts-ignore
      setData(r);
    });
  };

  return (
    <div className={"chart-card"}>
      <Bar
        data={data}
        yField={"tag"}
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
