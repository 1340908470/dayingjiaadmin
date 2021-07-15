import React, { useState, useEffect } from "react";
import { Bar } from "@ant-design/charts";
import pandect from "@/util/backend/analytics";
import { call } from "@/util/client";
import style from "@/component/chart/default.css";

interface ChallengeJoinMemberProps {
  begin: string;
  end: string;
}

export default function ChallengeJoinMember(props: ChallengeJoinMemberProps) {
  let [data, setData] = useState([]);

  useEffect(() => {
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
      });
    }
  };

  return (
    <div className={"chart-card"}>
      <div className={"card-title"}>各级别参与挑战用户</div>
      <Bar
        data={data}
        yField={"name"}
        xField={"amount"}
        yAxis={{
          label: { autoRotate: false },
        }}
        color={() => {
          return "#FF3E3E";
        }}
        scrollbar={{ type: "vertical" }}
      />
    </div>
  );
}
