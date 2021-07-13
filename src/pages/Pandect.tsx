/*
 * 页面：总览
 * */

import "./Default.css";
import { useState } from "react";
import Filter, { DateRange } from "@/component/Filter";
import UserAccess from "@/component/chart/UserAccess";
import DataSummary from "@/component/chart/DataSummary";
import RegisteredUserByDay from "@/component/chart/RegisteredUserByDay";
import NewPhotoByDay from "@/component/chart/NewPhotoByDay";

export default function Pandect() {
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
      <Filter Title={"总览"} setDateRange={setDateRange} />
      <DataSummary begin={date.StartTime} end={date.EndTime} />
      <UserAccess begin={date.StartTime} end={date.EndTime} />
      <RegisteredUserByDay begin={date.StartTime} end={date.EndTime} />
      <NewPhotoByDay begin={date.StartTime} end={date.EndTime} />
    </div>
  );
}
