// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Bar } from "@ant-design/charts";
import pandect from "@/util/backend/analytics";
import { call } from "@/util/client";
import style from "@/component/chart/default.css";
import Loading from "@/component/layout/Loading";
import eosanalytics from "@/util/backend/eosanalytics";

interface PageShareUVProps {
  isMonthReport?: boolean;
  begin: string;
  end: string;
}

export default function CollegeJoinUV(props: PageShareUVProps) {
  let [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    asyncFetch();
  }, [props.begin, props.end]);

  const asyncFetch = () => {
    if (props.begin && props.end) {
      call(eosanalytics.Rcamplocation, {
        begin: props.begin,
        end: props.end,
      }).then((r) => {
        // @ts-ignore
        setData(
          r.map((value) => {
            let { city, amount } = value;
            return {
              name: city,
              uv: amount,
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
        R-CAMP活动参与人数Top10对比
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
                data?.slice(0).sort((a, b) => b.uv - a.uv)[0].uv +
                Math.pow(
                  10,
                  Number.parseInt(
                    String(
                      Math.log10(
                        data?.slice(0).sort((a, b) => b.uv - a.uv)[0].uv
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
