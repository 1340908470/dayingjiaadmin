import React, { useState, useEffect } from "react";
import { Bar } from "@ant-design/charts";
import pandect from "@/util/backend/analytics";
import { call } from "@/util/client";
import style from "@/component/chart/default.css";

interface PhotoTypeProps {
  begin: string;
  end: string;
}

export default function PhotoTypes(props: PhotoTypeProps) {
  let [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, [props.begin]);

  const asyncFetch = () => {
    if (props.begin && props.end) {
      call(pandect.PhotoTypes, {
        begin: props.begin,
        end: props.end,
      }).then((r) => {
        // @ts-ignore
        setData([
          // @ts-ignore
          { tag: "参赛", amount: r.参赛 },
          // @ts-ignore
          { tag: "挑战", amount: r.挑战 },
          // @ts-ignore
          { tag: "圈子", amount: r.圈子 },
          // @ts-ignore
          { tag: "其它", amount: r.其它 },
        ]);
      });
    }
  };

  return (
    <div className={"chart-card"}>
      <div className={"card-title"}>发布作品类型分布</div>
      <Bar
        height={200}
        color={() => {
          return "#FF3E3E";
        }}
        data={data}
        yField={"tag"}
        xField={"amount"}
        yAxis={{
          label: { autoRotate: false },
        }}
        scrollbar={{ type: "vertical" }}
      />
    </div>
  );
}
