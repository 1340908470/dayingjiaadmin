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
import InvitePhotos from "@/component/chart/InvitePhotos";
import InviteGroupPhotos from "@/component/chart/InviteGroupPhotos";
import InviteGroupComments from "@/component/chart/InviteGroupComments";
import InviteGroupLikes from "@/component/chart/InviteGroupLikes";

export default function InvitedPhotographer() {
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
      <DateRangeFilter Title={"特邀影家"} setDateRange={setDateRange} />
      <InvitePhotos begin={date.StartTime} end={date.EndTime} />
      <InviteGroupPhotos begin={date.StartTime} end={date.EndTime} />
      <InviteGroupComments begin={date.StartTime} end={date.EndTime} />
      <InviteGroupLikes begin={date.StartTime} end={date.EndTime} />
    </div>
  );
}
