/*
 * 页面：来源分析
 * */

import "./Default.css";
import { useState } from "react";
import DateRangeFilter, { DateRange } from "@/component/Filter/DateRangeFilter";
import UserPhotos from "@/component/chart/UserPhotos";
import UserAccessTime from "@/component/chart/UserAccessTime";
import UserAccessDepth from "@/component/chart/UserAccessDepth";
import KeepAlive, { AliveScope } from "react-activation";
export default function BehaviorAnalysis() {
  const [date, setDate] = useState({} as DateRange);

  function setDateRange(startTime: string, endTime: string) {
    setDate({
      StartTime: startTime,
      EndTime: endTime,
    });
  }

  return (
    <div
      style={{
        minHeight: "1000px",
      }}
    >
      <DateRangeFilter Title={"行为分析"} setDateRange={setDateRange} />
      <UserPhotos begin={date.StartTime} end={date.EndTime} />
      <UserAccessTime begin={date.StartTime} end={date.EndTime} />
      <UserAccessDepth begin={date.StartTime} end={date.EndTime} />
    </div>
  );
}
