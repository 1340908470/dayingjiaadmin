import React, { useState, useEffect } from "react";
import { Bar } from "@ant-design/charts";
import pandect from "@/util/backend/analytics";
import { call } from "@/util/client";
import style from "@/component/chart/default.css";

interface InviteGroupCommentsProps {
  begin: string;
  end: string;
}

export default function InviteGroupComments(props: InviteGroupCommentsProps) {
  let [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, [props]);

  const asyncFetch = () => {
    call(pandect.InviteGroupComments, {
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
      <div className={"card-title"}>特邀影家评论数</div>
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
