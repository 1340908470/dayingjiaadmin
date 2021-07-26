import React, { useState, useEffect } from "react";
import { Bar } from "@ant-design/charts";
import pandect from "@/util/backend/analytics";
import { call } from "@/util/client";
import style from "@/component/chart/default.css";
import Loading from "@/component/layout/Loading";

interface InviteGroupCommentsProps {
  isMonthReport?: boolean;
  begin: string;
  end: string;
}

export default function InviteGroupComments(props: InviteGroupCommentsProps) {
  const [loading, setLoading] = useState(true);
  let [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    asyncFetch();
  }, [props.begin]);

  const asyncFetch = () => {
    if (props.begin && props.end) {
      call(pandect.InviteGroupComments, {
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
        特邀影家评论数
      </div>

      {loading ? (
        <Loading />
      ) : (
        <Bar
          label={{
            position: "right",
            offset: 4,
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
