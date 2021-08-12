// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Bar } from "@ant-design/charts";
import pandect from "@/util/backend/analytics";
import { call } from "@/util/client";
import style from "@/component/chart/default.css";
import Loading from "@/component/layout/Loading";

interface InviteGroupLikesProps {
  isMonthReport?: boolean;
  begin: string;
  end: string;
}

export default function InviteGroupLikes(props: InviteGroupLikesProps) {
  const [loading, setLoading] = useState(true);
  let [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    asyncFetch();
  }, [props.begin, props.end]);

  const asyncFetch = () => {
    if (props.begin && props.end) {
      call(pandect.InviteGroupLikes, {
        stage: "",
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
        特邀影家点赞数
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
                : data.slice(0).sort((a, b) => b.data - a.data)[0].data +
                  Math.pow(
                    10,
                    Number.parseInt(
                      String(
                        Math.log10(
                          data?.slice(0).sort((a, b) => b.data - a.data)[0].data
                        )
                      )
                    ) - 1
                  ),
          }}
          height={320}
          data={data}
          yField={"name"}
          xField={"data"}
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
