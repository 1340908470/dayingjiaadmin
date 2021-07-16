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
import DateRangeMonthlyFilter from "@/component/filter/DateRangeMonthlyFilter";
import InvitedKPI from "@/component/chart/InvitedKPI";

interface MonthlyReportProps {
  nowPage: string;
  resetPage: () => void;
}

export default function MonthlyReport(props: MonthlyReportProps) {
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

  if (props.nowPage === "月报") {
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
      <DateRangeMonthlyFilter Title={"月报"} setDateRange={setDateRange} />
      <WeeklyDataSummary begin={date.StartTime} end={date.EndTime} />
      <UserJoinCompetition begin={date.StartTime} end={date.EndTime} />
      <WeeklyUserAccessChannel begin={date.StartTime} end={date.EndTime} />
    </div>
  );
}
