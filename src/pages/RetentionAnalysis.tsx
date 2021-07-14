/*
 * 页面：留存分析
 * */

import "./Default.css";
import { useState } from "react";
import DateRangeFilter, { DateRange } from "@/component/Filter/DateRangeFilter";
import UserPhotos from "@/component/chart/UserPhotos";
import UserAccessTime from "@/component/chart/UserAccessTime";
import UserAccessDepth from "@/component/chart/UserAccessDepth";
import DataSummary from "@/component/chart/DataSummary";
import DailyRetain from "@/component/chart/DailyRetain";

export default function RetentionAnalysis() {
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
      <DateRangeFilter Title={"留存分析"} setDateRange={setDateRange} />
      <DailyRetain begin={date.StartTime} end={date.EndTime} />
    </div>
  );
}
