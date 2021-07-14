/*
 * 页面：来源分析
 * */

import "./Default.css";
import { useState } from "react";
import DateRangeFilter, { DateRange } from "@/component/Filter/DateRangeFilter";
import UserAccess from "@/component/chart/UserAccess";
import DataSummary from "@/component/chart/DataSummary";
import RegisteredUserByDay from "@/component/chart/RegisteredUserByDay";
import NewPhotoByDay from "@/component/chart/NewPhotoByDay";
import UserAccessByChannel from "@/component/chart/UserAccessByChannel";
import FromInviter from "@/component/chart/FromInviter";
import PhotoTypes from "@/component/chart/PhotoTypes";
import PhotoTag from "@/component/chart/PhotoTag";
import PhotoEquipment from "@/component/chart/PhotoEquipment";

export default function Works() {
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
      <DateRangeFilter Title={"作品"} setDateRange={setDateRange} />
      <PhotoTypes begin={date.StartTime} end={date.EndTime} />
      <PhotoTag begin={date.StartTime} end={date.EndTime} />
      <PhotoEquipment begin={date.StartTime} end={date.EndTime} />
    </div>
  );
}
