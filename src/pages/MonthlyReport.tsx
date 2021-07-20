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
import MonthActiveUserProvince from "@/component/chart/MonthActiveUserProvince";
import PPTCover from "@/component/chart/PPTCover";

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

  const DataSummaryRefMonth = useRef(null);
  const DataSummaryByMonthRefMonth = useRef(null);
  const RegisteredUserByDayRefMonth = useRef(null);
  const NumbersOfNewUserEveryWeekRefMonth = useRef(null);
  const NumbersOfNewWorkEveryWeekRefMonth = useRef(null);
  const PhotoTypesRefMonth = useRef(null);
  const PhotoTagRefMonth = useRef(null);
  const PhotoTypeByMonthRefMonth = useRef(null);
  const PhotoEquipmentRefMonth = useRef(null);
  const PhotoCompetitionTotalRefMonth = useRef(null);

  const GiftRelatedDataRefMonth = useRef(null);
  const FreeCourseAccessRefMonth = useRef(null);
  const CourseExchangeRefMonth = useRef(null);
  const AvatarExchangeRefMonth = useRef(null);

  const UserAccessByChannelRefMonth = useRef(null);
  const MonthlyChannelRefMonth = useRef(null);
  const FromInviterRefMonth = useRef(null);

  const ActiveUserGenderRefMonth = useRef(null);
  const ActiveUserAgeRefMonth = useRef(null);
  const ActiveUserDeviceRefMonth = useRef(null);
  const MonthActiveUserProvinceRefMonth = useRef(null);

  const ActiveDailyRetainRefMonth = useRef(null);

  const InvitedKPIRefMonth = useRef(null);
  const InviterFocusedRefMonth = useRef(null);

  if (props.nowPage === "月报") {
    exportComponentAsPNG(DataSummaryRefMonth)
      .then(() => {
        return exportComponentAsPNG(PhotoTypeByMonthRefMonth);
      })
      .then(() => {
        return exportComponentAsPNG(PhotoEquipmentRefMonth);
      })
      .then(() => {
        // @ts-ignore
        PhotoCompetitionTotalRefMonth.current.childNodes[0].childNodes.forEach(
          // @ts-ignore
          (value) => {
            // @ts-ignore
            value.childNodes.forEach((card) => {
              exportComponentAsPNG({
                current: card,
              }).then();
            });
          }
        );
      })
      .then(() => {
        return exportComponentAsPNG(GiftRelatedDataRefMonth);
      })
      .then(() => {
        return exportComponentAsPNG(FreeCourseAccessRefMonth);
      })
      .then(() => {
        return exportComponentAsPNG(CourseExchangeRefMonth);
      })
      .then(() => {
        return exportComponentAsPNG(AvatarExchangeRefMonth);
      })
      .then(() => {
        return exportComponentAsPNG(UserAccessByChannelRefMonth);
      })
      .then(() => {
        return exportComponentAsPNG(MonthlyChannelRefMonth);
      })
      .then(() => {
        return exportComponentAsPNG(FromInviterRefMonth);
      })
      .then(() => {
        return exportComponentAsPNG(ActiveUserGenderRefMonth);
      })
      .then(() => {
        return exportComponentAsPNG(ActiveUserAgeRefMonth);
      })
      .then(() => {
        return exportComponentAsPNG(ActiveUserDeviceRefMonth);
      })
      .then(() => {
        return exportComponentAsPNG(MonthActiveUserProvinceRefMonth);
      })
      .then(() => {
        // @ts-ignore
        ActiveDailyRetainRefMonth.current.childNodes.forEach(
          // @ts-ignore
          (value) => {
            // @ts-ignore
            exportComponentAsPNG({
              current: value,
            }).then();
          }
        );
      })
      .then(() => {
        return exportComponentAsPNG(InvitedKPIRefMonth);
      })
      .then(() => {
        return exportComponentAsPNG(InviterFocusedRefMonth);
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

      <div>
        <PPTCover
          nowPage={props.nowPage}
          begin={date.StartTime}
          end={date.EndTime}
          title={"用户访问总览"}
        />
      </div>

      <div ref={DataSummaryRefMonth}>
        <DataSummary
          begin={date.StartTime}
          end={date.EndTime}
          isMonthReport={true}
        />
      </div>
      <div ref={DataSummaryByMonthRefMonth}>
        <DataSummaryByMonth
          begin={date.StartTime}
          end={date.EndTime}
          isMonthReport={true}
        />
      </div>
      <div ref={NumbersOfNewUserEveryWeekRefMonth}>
        <NumbersOfNewUserEveryWeek
          begin={date.StartTime}
          end={date.EndTime}
          isMonthReport={true}
        />
      </div>
      <div ref={NumbersOfNewWorkEveryWeekRefMonth}>
        <NumbersOfNewWorkEveryWeek
          begin={date.StartTime}
          end={date.EndTime}
          isMonthReport={true}
        />
      </div>

      <div>
        <PPTCover
          nowPage={props.nowPage}
          begin={date.StartTime}
          end={date.EndTime}
          title={"发布作品统计"}
        />
      </div>

      <div ref={PhotoTypesRefMonth}>
        <PhotoTypes
          begin={date.StartTime}
          end={date.EndTime}
          isMonthReport={true}
        />
      </div>
      <div ref={PhotoTagRefMonth}>
        <PhotoTag
          begin={date.StartTime}
          end={date.EndTime}
          isMonthReport={true}
        />
      </div>
      <div ref={PhotoTypeByMonthRefMonth}>
        <PhotoTypeByMonth
          begin={date.StartTime}
          end={date.EndTime}
          isMonthReport={true}
        />
      </div>
      <div ref={PhotoEquipmentRefMonth}>
        <PhotoEquipment
          begin={date.StartTime}
          end={date.EndTime}
          isMonthReport={true}
        />
      </div>

      <div ref={PhotoCompetitionTotalRefMonth}>
        <PhotoCompetitionTotal
          nowPage={props.nowPage}
          begin={date.StartTime}
          end={date.EndTime}
          isMonthReport={true}
        />
      </div>

      <div>
        <PPTCover
          nowPage={props.nowPage}
          begin={date.StartTime}
          end={date.EndTime}
          title={"积分商城相关数据"}
        />
      </div>

      <div ref={GiftRelatedDataRefMonth}>
        <GiftRelatedData
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>
      <div ref={FreeCourseAccessRefMonth}>
        <FreeCourseAccess
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>
      <div ref={CourseExchangeRefMonth}>
        <CourseExchange
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>
      <div ref={AvatarExchangeRefMonth}>
        <AvatarExchange
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>

      <div>
        <PPTCover
          nowPage={props.nowPage}
          begin={date.StartTime}
          end={date.EndTime}
          title={"用户来源渠道统计"}
        />
      </div>

      <div ref={UserAccessByChannelRefMonth}>
        <UserAccessByChannel
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>
      <div ref={MonthlyChannelRefMonth}>
        <MonthlyChannel
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>
      <div ref={FromInviterRefMonth}>
        <FromInviter
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>

      <div>
        <PPTCover
          nowPage={props.nowPage}
          begin={date.StartTime}
          end={date.EndTime}
          title={"用户画像分析"}
        />
      </div>

      <div ref={ActiveUserGenderRefMonth}>
        <ActiveUserGender
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>
      <div ref={ActiveUserAgeRefMonth}>
        <ActiveUserAge
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>
      <div ref={ActiveUserDeviceRefMonth}>
        <ActiveUserDevice
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>
      <div ref={MonthActiveUserProvinceRefMonth}>
        <MonthActiveUserProvince
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>

      <div>
        <PPTCover
          nowPage={props.nowPage}
          begin={date.StartTime}
          end={date.EndTime}
          title={"用户留存/行为分析"}
        />
      </div>

      <div ref={ActiveDailyRetainRefMonth}>
        <ActiveDailyRetain
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>

      <div ref={InvitedKPIRefMonth}>
        <InvitedKPI
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>
      <div ref={InviterFocusedRefMonth}>
        <InviterFocused
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>
    </div>
  );
}
