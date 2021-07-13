import React, { useState, useEffect } from "react";
import { Bar } from "@ant-design/charts";
import pandect from "@/util/backend/analytics";
import { call } from "@/util/client";

interface PhotoTypeProps {
  begin: string;
  end: string;
}

export default function PhotoTypes(props: PhotoTypeProps) {
  let [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, [data]);

  console.log(data);

  const asyncFetch = () => {
    call(pandect.PhotoTypes, {
      begin: props.begin,
      end: props.end,
    }).then((r) => {
      // @ts-ignore
      setData([
        { tag: "参赛", amount: r.参赛 },
        { tag: "挑战", amount: r.挑战 },
        { tag: "圈子", amount: r.圈子 },
        { tag: "其它", amount: r.其它 },
      ]);
    });
  };

  return (
    <div className={"card"}>
      <Bar
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
