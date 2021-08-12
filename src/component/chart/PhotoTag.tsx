// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Bar } from "@ant-design/charts";
import pandect from "@/util/backend/analytics";
import { call } from "@/util/client";
import style from "@/component/chart/default.css";
import Loading from "@/component/layout/Loading";

interface PhotoTypeProps {
  nowPage?: boolean;
  isMonthReport?: boolean;
  begin: string;
  end: string;
}

export default function PhotoTag(props: PhotoTypeProps) {
  let [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    asyncFetch();
  }, [props.begin, props.end]);

  const asyncFetch = () => {
    if (props.begin && props.end) {
      call(pandect.PhotoTag, {
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
      <div
        hidden={props.nowPage}
        className={props.isMonthReport ? "chart-title-ppt" : "card-title"}
      >
        不同标签作品数统计
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
            padding={[16, 30, 25, 40]}
            height={400}
            data={data}
            yField={"tag"}
            xField={"amount"}
            yAxis={{
              label: { autoRotate: false },
            }}
            xAxis={{
              tickCount: 5,
              max:
                data?.slice(0).sort((a, b) => b.amount - a.amount)[0].amount +
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
            color={() => {
              return "#FF7474";
            }}
          />
        </div>
      )}
    </div>
  );
}
