/*
 * 页面：来源分析
 * */

import "./Default.css";
import { useState } from "react";
import Filter, { DateRange } from "@/component/Filter";
import UserAccess from "@/component/chart/UserAccess";
import DataSummary from "@/component/chart/DataSummary";
import RegisteredUserByDay from "@/component/chart/RegisteredUserByDay";
import NewPhotoByDay from "@/component/chart/NewPhotoByDay";
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
      <Filter Title={"行为分析"} setDateRange={setDateRange} />
      <UserAccessByChannel begin={date.StartTime} end={date.EndTime} />
      <FromInviter begin={date.StartTime} end={date.EndTime} />
    </div>
  );
}
