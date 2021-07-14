import React, { useState, useEffect } from "react";
import { Bar } from "@ant-design/charts";
import pandect from "@/util/backend/analytics";
import { call } from "@/util/client";
import style from "@/component/chart/default.css";

interface PageVisitPVProps {
  begin: string;
  end: string;
}

export default function PageVisitPV(props: PageVisitPVProps) {
  let [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, [props]);

  const asyncFetch = () => {
    if (props.begin && props.end) {
      console.log(
        props.begin.split("-")[0] +
          props.begin.split("-")[1] +
          props.begin.split("-")[2] +
          ""
      );
      call(pandect.PageVisit, {
        begin:
          props.begin.split("-")[0] +
          props.begin.split("-")[1] +
          props.begin.split("-")[2] +
          "",
        end:
          props.end.split("-")[0] +
          props.end.split("-")[1] +
          props.end.split("-")[2] +
          "",
      }).then((r) => {
        // @ts-ignore
        setData(r.pv);
      });
    }
  };

  return (
    <div className={"chart-card"}>
      <div className={"card-title"}>页面访问人数Top10对比</div>
      <Bar
        data={data}
        yField={"name"}
        xField={"pv"}
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
