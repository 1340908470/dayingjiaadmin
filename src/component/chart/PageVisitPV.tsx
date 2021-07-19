import React, { useState, useEffect } from "react";
import { Bar } from "@ant-design/charts";
import pandect from "@/util/backend/analytics";
import { call } from "@/util/client";
import style from "@/component/chart/default.css";
import Loading from "@/component/layout/Loading";

interface PageVisitPVProps {
  isMonthReport?: boolean;
  begin: string;
  end: string;
}

export default function PageVisitPV(props: PageVisitPVProps) {
  let [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    asyncFetch();
  }, [props.begin]);

  const asyncFetch = () => {
    if (props.begin && props.end) {
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

        if (data) setLoading(false);
      });
    }
  };

  return (
    <div className={props.isMonthReport ? "chart-card-ppt" : "chart-card"}>
      <div className={props.isMonthReport ? "chart-title-ppt" : "card-title"}>
        页面访问人数Top10对比
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className={props.isMonthReport ? "inside-chart-ppt" : ""}>
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
          />
        </div>
      )}
    </div>
  );
}
