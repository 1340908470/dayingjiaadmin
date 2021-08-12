// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Bar } from "@ant-design/charts";
import pandect from "@/util/backend/analytics";
import { call } from "@/util/client";
import style from "@/component/chart/default.css";
import Loading from "@/component/layout/Loading";

interface WeeklyUserAccessChannelProps {
  isMonthReport?: boolean;
  begin: string;
  end: string;
}

export default function WeeklyUserAccessChannel(
  props: WeeklyUserAccessChannelProps
) {
  let [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    asyncFetch();
  }, [props.begin, props.end]);

  const asyncFetch = () => {
    if (props.begin && props.end) {
      call(pandect.UserAccessByChannel, {
        begin: props.begin,
        end: props.end,
      }).then((r) => {
        // @ts-ignore
        setData(r);

        if (data) setLoading(false);
      });
    }
  };

  return (
    <div className={props.isMonthReport ? "chart-card-ppt" : "chart-card"}>
      <div className={props.isMonthReport ? "chart-title-ppt" : "card-title"}>
        不同来源用户访问量统计
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
          data={data}
          yField={"来源"}
          xField={"访问次数"}
          yAxis={{
            label: { autoRotate: false },
          }}
          xAxis={{
            tickCount: 5,
            max:
              data.length == 0
                ? 0
                : data.slice(0).sort((a, b) => b.访问次数 - a.访问次数)[0]
                    .访问次数 +
                  Math.pow(
                    10,
                    Number.parseInt(
                      String(
                        Math.log10(
                          data
                            ?.slice(0)
                            .sort((a, b) => b.访问次数 - a.访问次数)[0].访问次数
                        )
                      )
                    ) - 1
                  ),
          }}
          color={() => {
            return "#FF7474";
          }}
        />
      )}
    </div>
  );
}
