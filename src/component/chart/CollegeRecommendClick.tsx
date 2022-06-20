// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Bar } from "@ant-design/charts";
import pandect from "@/util/backend/analytics";
import { call } from "@/util/client";
import style from "@/component/chart/default.css";
import Loading from "@/component/layout/Loading";

interface PageShareUVProps {
  isMonthReport?: boolean;
  begin: string;
  end: string;
}

export default function CollegeRecommendClick(props: PageShareUVProps) {
  let [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    asyncFetch();
  }, [props.begin, props.end]);

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
          r.uv.map((value) => {
            let { name, uv } = value;
            return {
              name: name,
              uv: Number.parseInt(uv),
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
        推荐器材用户点击数Top10
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className={props.isMonthReport ? "inside-chart-ppt" : ""}>
          <Bar
            animation={false}
            label={{
              position: "right",
              offset: 4,
            }}
            data={data}
            yField={"name"}
            xField={"uv"}
            yAxis={{
              label: { autoRotate: false },
            }}
            xAxis={{
              tickCount: 5,
              max:
                data?.slice(0).sort((a, b) => b.uv - a.uv)[0]?.uv +
                Math.pow(
                  10,
                  Number.parseInt(
                    String(
                      Math.log10(
                        data?.slice(0).sort((a, b) => b.uv - a.uv)[0]?.uv
                      )
                    )
                  ) - 1
                ),
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
