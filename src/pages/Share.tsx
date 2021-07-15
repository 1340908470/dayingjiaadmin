/*
 * 页面：来源分析
 * */

import "./Default.css";
import { useRef, useState } from "react";
import DateRangeFilter, { DateRange } from "@/component/filter/DateRangeFilter";
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
import PageSharePV from "@/component/chart/PageSharePV";
import PageShareUV from "@/component/chart/PageShareUV";
import { exportComponentAsPNG } from "react-component-export-image";
import ActiveDailyRetain from "@/component/chart/ActiveDailyRetain";

interface ShareProps {
  nowPage: string;
  resetPage: () => void;
}

export default function Share(props: ShareProps) {
  const [date, setDate] = useState({} as DateRange);

  function setDateRange(startTime: string, endTime: string) {
    setDate({
      StartTime: startTime,
      EndTime: endTime,
    });
  }

  const PageSharePVRef = useRef(null);
  const PageShareUVRef = useRef(null);

  if (props.nowPage === "分享") {
    exportComponentAsPNG(PageSharePVRef)
      .then(() => {
        return exportComponentAsPNG(PageShareUVRef);
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
      <DateRangeFilter Title={"分享"} setDateRange={setDateRange} />
      <div ref={PageSharePVRef}>
        <PageSharePV begin={date.StartTime} end={date.EndTime} />
      </div>
      <div ref={PageShareUVRef}>
        <PageShareUV begin={date.StartTime} end={date.EndTime} />
      </div>
    </div>
  );
}
