/*
 * 页面：来源分析
 * */

import "./Default.css";
import { useRef, useState } from "react";
import DateRangeFilter, { DateRange } from "@/component/Filter/DateRangeFilter";
import CircleRelatedData from "@/component/chart/CircleRelatedData";
import { exportComponentAsPNG } from "react-component-export-image";
import CircleTrend from "@/component/chart/CircleTrend";
import CircleNewMember from "@/component/chart/CircleNewMember";
import CircleNewWorks from "@/component/chart/CircleNewWorks";
import CircleMember from "@/component/chart/CircleMember";
import UserCheckIn from "@/component/chart/UserCheckIn";
import UserPoints from "@/component/chart/UserPoints";

interface MineProps {
  nowPage: string;
  resetPage: () => void;
}

export default function Mine(props: MineProps) {
  const [date, setDate] = useState({} as DateRange);

  function setDateRange(startTime: string, endTime: string) {
    setDate({
      StartTime: startTime,
      EndTime: endTime,
    });
  }

  const UserCheckInRef = useRef(null);
  const UserPointsRef = useRef(null);

  if (props.nowPage === "我的") {
    exportComponentAsPNG(UserCheckInRef)
      .then(() => {
        return exportComponentAsPNG(UserPointsRef);
      })
      .then(() => {
        props.resetPage();
      });
  }

  return (
    <div
      style={{
        minHeight: "1000px",
      }}
    >
      <DateRangeFilter Title={"我的"} setDateRange={setDateRange} />

      <div ref={UserCheckInRef}>
        <UserCheckIn begin={date.StartTime} end={date.EndTime} />
      </div>
      <div ref={UserPointsRef}>
        <UserPoints begin={date.StartTime} end={date.EndTime} />
      </div>
    </div>
  );
}
