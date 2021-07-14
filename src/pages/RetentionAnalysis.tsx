/*
 * 页面：留存分析
 * */

import "./Default.css";
import { useState } from "react";
import { DateRange } from "@/component/Filter/DateRangeFilter";
import SingleDateFilter from "@/component/Filter/SingleDateFilter";
import ActiveDailyRetain from "@/component/chart/ActiveDailyRetain";
import NewDailyRetain from "@/component/chart/NewDailyRetain";

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
      <SingleDateFilter Title={"留存分析"} setDateRange={setDateRange} />
      <ActiveDailyRetain begin={date.StartTime} end={date.EndTime} />
      <NewDailyRetain begin={date.StartTime} end={date.EndTime} />
    </div>
  );
}
