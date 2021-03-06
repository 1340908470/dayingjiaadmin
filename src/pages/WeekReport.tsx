/*
 * 页面：总览
 * */

import "./Default.css";
import { useRef, useState } from "react";
import DateRangeFilter, { DateRange } from "@/component/filter/DateRangeFilter";
import UserAccess from "@/component/chart/UserAccess";
import DataSummary from "@/component/chart/DataSummary";
import RegisteredUserByDay from "@/component/chart/RegisteredUserByDay";
import NewPhotoByDay from "@/component/chart/NewPhotoByDay";
import { exportComponentAsPNG } from "react-component-export-image";
import DateRangeWeeklyFilter from "@/component/filter/DateRangeWeeklyFilter";
import WeeklyDataSummary from "@/component/chart/WeeklyDataSummary";
import UserJoinCompetition from "@/component/chart/UserJoinCompetition";
import WeeklyUserAccessChannel from "@/component/chart/WeeklyUserAccessChannel";
import InvitedKPI from "@/component/chart/InvitedKPI";

interface WeekReportProps {
  nowPage: string;
  resetPage: () => void;
}

export default function WeekReport(props: WeekReportProps) {
  const [date, setDate] = useState({} as DateRange);

  function setDateRange(startTime: string, endTime: string) {
    setDate({
      StartTime: startTime,
      EndTime: endTime,
    });
  }

  const DataSummaryRef = useRef(null);
  const UserAccessRef = useRef(null);
  const RegisteredUserByDayRef = useRef(null);
  const NewPhotoByDayRef = useRef(null);

  if (props.nowPage === "周报") {
    exportComponentAsPNG(DataSummaryRef)
      .then(() => {
        return exportComponentAsPNG(UserAccessRef);
      })
      .then(() => {
        return exportComponentAsPNG(RegisteredUserByDayRef);
      })
      .then(() => {
        return exportComponentAsPNG(NewPhotoByDayRef);
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
      <DateRangeWeeklyFilter Title={"周报"} setDateRange={setDateRange} />
      <WeeklyDataSummary begin={date.StartTime} end={date.EndTime} />
      <UserJoinCompetition begin={date.StartTime} end={date.EndTime} />
      <WeeklyUserAccessChannel begin={date.StartTime} end={date.EndTime} />
      <InvitedKPI begin={date.StartTime} end={date.EndTime} />
    </div>
  );
}
