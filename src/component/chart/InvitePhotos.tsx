import React, { useState, useEffect } from "react";
import { Bar } from "@ant-design/charts";
import pandect from "@/util/backend/analytics";
// @ts-nocheck
import { call } from "@/util/client";

interface PhotoTypeProps {
  begin: string;
  end: string;
}

export default function InvitePhotos(props: PhotoTypeProps) {
  let [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, [props]);

  const asyncFetch = () => {
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
  };

  return (
    <div className={"chart-card"}>
      <Bar
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
