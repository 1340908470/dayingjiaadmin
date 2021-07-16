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
import DataSummaryByMonth from "@/component/chart/DataSummaryByMonth";
import NumbersOfNewUserEveryWeek from "@/component/chart/NumbersOfNewUserEveryWeek";
import NumbersOfNewWorkEveryWeek from "@/component/chart/NumbersOfNewWorkEveryWeek";
import PhotoTypes from "@/component/chart/PhotoTypes";
import PhotoTag from "@/component/chart/PhotoTag";
import PhotoTypeByMonth from "@/component/chart/PhotoTypeByMonth";
import PhotoEquipment from "@/component/chart/PhotoEquipment";
import PhotoCompetitionTotal from "@/component/ppt/PhotoCompetitionTotal";
import GiftRelatedData from "@/component/chart/GiftRelatedData";
import FreeCourseAccess from "@/component/chart/FreeCourseAccess";
import CourseExchange from "@/component/chart/CourseExchange";
import AvatarExchange from "@/component/chart/AvatarExchange";
import UserAccessByChannel from "@/component/chart/UserAccessByChannel";
import FromInviter from "@/component/chart/FromInviter";
import MonthlyChannel from "@/component/chart/MonthlyChannel";
import ActiveUserGender from "@/component/chart/ActiveUserGender";
import ActiveUserAge from "@/component/chart/ActiveUserAge";
import ActiveUserProvince from "@/component/chart/ActiveUserProvince";
import ActiveUserDevice from "@/component/chart/ActiveUserDevice";
import ActiveDailyRetain from "@/component/chart/ActiveDailyRetain";
import NewDailyRetain from "@/component/chart/NewDailyRetain";
import InviterFocused from "@/component/chart/InviterFocused";

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
      <div ref={RegisteredUserByDayRef}>
        <DataSummary
          begin={date.StartTime}
          end={date.EndTime}
          isMonthReport={true}
        />
      </div>
      <div ref={RegisteredUserByDayRef}>
        <DataSummaryByMonth
          begin={date.StartTime}
          end={date.EndTime}
          isMonthReport={true}
        />
      </div>
      <div ref={RegisteredUserByDayRef}>
        <NumbersOfNewUserEveryWeek
          begin={date.StartTime}
          end={date.EndTime}
          isMonthReport={true}
        />
      </div>
      <div ref={RegisteredUserByDayRef}>
        <NumbersOfNewWorkEveryWeek
          begin={date.StartTime}
          end={date.EndTime}
          isMonthReport={true}
        />
      </div>
      <div ref={RegisteredUserByDayRef}>
        <PhotoTypes
          begin={date.StartTime}
          end={date.EndTime}
          isMonthReport={true}
        />
      </div>
      <div ref={RegisteredUserByDayRef}>
        <PhotoTag
          begin={date.StartTime}
          end={date.EndTime}
          isMonthReport={true}
        />
      </div>
      <div ref={RegisteredUserByDayRef}>
        <PhotoTypeByMonth
          begin={date.StartTime}
          end={date.EndTime}
          isMonthReport={true}
        />
      </div>
      <div ref={RegisteredUserByDayRef}>
        <PhotoEquipment
          begin={date.StartTime}
          end={date.EndTime}
          isMonthReport={true}
        />
      </div>
      <div ref={RegisteredUserByDayRef}>
        <PhotoCompetitionTotal
          begin={date.StartTime}
          end={date.EndTime}
          isMonthReport={true}
        />
      </div>

      <div ref={RegisteredUserByDayRef}>
        <GiftRelatedData
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>
      <div ref={RegisteredUserByDayRef}>
        <FreeCourseAccess
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>
      <div ref={RegisteredUserByDayRef}>
        <CourseExchange
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>
      <div ref={RegisteredUserByDayRef}>
        <AvatarExchange
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>

      <div ref={RegisteredUserByDayRef}>
        <UserAccessByChannel
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>
      <div ref={RegisteredUserByDayRef}>
        <MonthlyChannel
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>
      <div ref={RegisteredUserByDayRef}>
        <FromInviter
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>

      <div ref={RegisteredUserByDayRef}>
        <ActiveUserGender
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>
      <div ref={RegisteredUserByDayRef}>
        <ActiveUserAge
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>
      <div ref={RegisteredUserByDayRef}>
        <ActiveUserDevice
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>

      <div ref={RegisteredUserByDayRef}>
        <ActiveDailyRetain
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>
      <div ref={RegisteredUserByDayRef}>
        <NewDailyRetain
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>
      <div ref={RegisteredUserByDayRef}>
        <InvitedKPI
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>
      <div ref={RegisteredUserByDayRef}>
        <InviterFocused
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>
    </div>
  );
}
