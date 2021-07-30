// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Bar } from "@ant-design/charts";
import pandect from "@/util/backend/analytics";
import { call } from "@/util/client";
import style from "@/component/chart/default.css";
import Loading from "@/component/layout/Loading";

interface PageSharePVProps {
  isMonthReport?: boolean;
  begin: string;
  end: string;
}

export default function PageSharePV(props: PageSharePVProps) {
  let [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    asyncFetch();
  }, [props.begin]);

  const asyncFetch = () => {
    if (props.begin && props.end) {
      call(pandect.PageShare, {
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
        setData(
          r.pv.map((value) => {
            let { name, pv } = value;
            return {
              name: name,
              pv: Number.parseInt(pv),
            };
          })
        );

        if (data) setLoading(false);
      });
    }
  };

  return (
    <div className={props.isMonthReport ? "chart-card-ppt" : "chart-card"}>
      <div className={props.isMonthReport ? "chart-title-ppt" : "card-title"}>
        页面分享次数Top10对比
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className={props.isMonthReport ? "inside-chart-ppt" : ""}>
          <Bar
            label={{
              position: "right",
              offset: 4,
            }}
            xAxis={{
              tickCount: 5,
              max:
                data?.slice(0).sort((a, b) => b.pv - a.pv)[0].pv +
                Math.pow(
                  10,
                  Number.parseInt(
                    String(
                      Math.log10(
                        data?.slice(0).sort((a, b) => b.pv - a.pv)[0].pv
                      )
                    )
                  ) - 1
                ),
            }}
            height={400}
            data={data}
            yField={"name"}
            xField={"pv"}
            yAxis={{
              label: { autoRotate: false },
            }}
            color={() => {
              return "#FF7474";
            }}
          />
        </div>
      )}
    </div>
  );
}
