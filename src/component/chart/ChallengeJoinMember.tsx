import React, { useState, useEffect } from "react";
import { Bar } from "@ant-design/charts";
import pandect from "@/util/backend/analytics";
import { call } from "@/util/client";
import style from "@/component/chart/default.css";
import Loading from "@/component/layout/Loading";

interface ChallengeJoinMemberProps {
  isMonthReport?: boolean;
  begin: string;
  end: string;
}

export default function ChallengeJoinMember(props: ChallengeJoinMemberProps) {
  const [loading, setLoading] = useState(true);
  let [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    asyncFetch();
  }, [props.begin]);

  const asyncFetch = () => {
    if (props.begin && props.end) {
      call(pandect.ChallengeData, {
        begin: props.begin,
        end: props.end,
      }).then((r) => {
        // @ts-ignore
        setData(r.各级别参与挑战用户数);
        if (data) setLoading(false);
      });
    }
  };

  return (
    <div className={props.isMonthReport ? "chart-card-ppt" : "chart-card"}>
      <div className={props.isMonthReport ? "chart-title-ppt" : "card-title"}>
        各级别参与挑战用户
      </div>
      {loading ? (
        <Loading />
      ) : (
        <Bar
          height={240}
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
