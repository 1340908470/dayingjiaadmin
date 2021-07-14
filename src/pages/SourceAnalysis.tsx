/*
 * 页面：来源分析
 * */

import "./Default.css";
import { useState } from "react";
import DateRangeFilter, { DateRange } from "@/component/Filter/DateRangeFilter";
import UserAccessByChannel from "@/component/chart/UserAccessByChannel";
import FromInviter from "@/component/chart/FromInviter";

export default function SourceAnalysis() {
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
      <DateRangeFilter Title={"来源分析"} setDateRange={setDateRange} />
      <UserAccessByChannel begin={date.StartTime} end={date.EndTime} />
      <FromInviter begin={date.StartTime} end={date.EndTime} />
    </div>
  );
}
