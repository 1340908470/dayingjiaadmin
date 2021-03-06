// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Bar } from "@ant-design/charts";
import analytics from "@/util/backend/analytics";
import { call } from "@/util/client";
import style from "@/component/chart/default.css";
import Loading from "@/component/layout/Loading";

interface FreeCourseAccessProps {
  nowPage?: boolean;
  isMonthReport?: boolean;
  begin: string;
  end: string;
}

export default function FreeCourseAccess(props: FreeCourseAccessProps) {
  const [loading, setLoading] = useState(true);
  let [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    asyncFetch();
  }, [props.begin, props.end]);

  const asyncFetch = () => {
    if (props.begin && props.end) {
      call(analytics.Shop, {
        begin: props.begin,
        end: props.end,
      }).then((r) => {
        // @ts-ignore
        setData(r.免费课程访问数);

        // @ts-ignore
        setData(
          r.免费课程访问数.map((value) => {
            let { name, amount } = value;
            return {
              name: name,
              amount: Number.parseInt(amount),
            };
          })
        );

        if (data) setLoading(false);
      });
    }
  };

  return (
    <div className={props.isMonthReport ? "chart-card-ppt" : "chart-card"}>
      <div
        hidden={props.nowPage}
        className={props.isMonthReport ? "chart-title-ppt" : "card-title"}
      >
        免费课程访问数Top10
      </div>

      {loading ? (
        <Loading />
      ) : (
        <Bar
          animation={false}
          label={{
            position: "right",
            offset: 4,
          }}
          xAxis={{
            tickCount: 5,
            max:
              data.length == 0
                ? 0
                : data.slice(0).sort((a, b) => b.amount - a.amount)[0].amount +
                  Math.pow(
                    10,
                    Number.parseInt(
                      String(
                        Math.log10(
                          data?.slice(0).sort((a, b) => b.amount - a.amount)[0]
                            .amount
                        )
                      )
                    ) - 1
                  ),
          }}
          height={400}
          data={data}
          yField={"name"}
          xField={"amount"}
          yAxis={{
            label: { autoRotate: false },
          }}
          color={() => {
            return "#FF7474";
          }}
        />
      )}
    </div>
  );
}
