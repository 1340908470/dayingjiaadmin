// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Bar } from "@ant-design/charts";
import analytics from "@/util/backend/analytics";
import { call } from "@/util/client";
import style from "@/component/chart/default.css";
import Loading from "@/component/layout/Loading";

interface AvatarExchangeProps {
  nowPage?: boolean;
  isMonthReport?: boolean;
  begin: string;
  end: string;
}

export default function AvatarExchange(props: AvatarExchangeProps) {
  const [loading, setLoading] = useState(true);
  let [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, [props.begin, props.end]);

  const asyncFetch = () => {
    if (props.begin && props.end) {
      call(analytics.Shop, {
        begin: props.begin,
        end: props.end,
      }).then((r) => {
        // @ts-ignore
        setData(r.头像挂件兑换数);

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
        头像挂件兑换数Top10
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
            height={400}
            data={data}
            yField={"name"}
            xField={"sales"}
            yAxis={{
              label: { autoRotate: false },
            }}
            xAxis={{
              tickCount: 5,
              max:
                data?.slice(0).sort((a, b) => b.sales - a.sales)[0].sales +
                Math.pow(
                  10,
                  Number.parseInt(
                    String(
                      Math.log10(
                        data?.slice(0).sort((a, b) => b.sales - a.sales)[0]
                          .sales
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
