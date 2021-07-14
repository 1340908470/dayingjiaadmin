import React, { useState, useEffect } from "react";
import { Bar } from "@ant-design/charts";
import pandect from "@/util/backend/analytics";
import { call } from "@/util/client";
import style from "@/component/chart/default.css";

interface InviteGroupPhotosProps {
  begin: string;
  end: string;
}

export default function InviteGroupPhotos(props: InviteGroupPhotosProps) {
  let [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, [props]);

  const asyncFetch = () => {
    call(pandect.InviteGroupPhotos, {
      stage: "",
      begin: props.begin,
      end: props.end,
    }).then((r) => {
      // @ts-ignore
      setData(r);
    });
  };

  return (
    <div className={"chart-card"}>
      <div className={"card-title"}>圈子内新作品数</div>
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
        scrollbar={{ type: "vertical" }}
      />
    </div>
  );
}
