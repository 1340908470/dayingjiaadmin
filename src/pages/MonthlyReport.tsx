/*
 * 页面：总览
 * */

import "./Default.css";
import { useRef, useState } from "react";
import DateRangeFilter, { DateRange } from "@/component/filter/DateRangeFilter";
import DataSummary from "@/component/chart/DataSummary";
import RegisteredUserByDay from "@/component/chart/RegisteredUserByDay";
import NewPhotoByDay from "@/component/chart/NewPhotoByDay";
import { exportComponentAsPNG } from "react-component-export-image";
import DateRangeMonthlyFilter from "@/component/filter/DateRangeMonthlyFilter";
import InvitedKPI from "@/component/chart/InvitedKPI";
import DataSummaryByMonth from "@/component/chart/DataSummaryByMonth";
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
import ActiveUserDevice from "@/component/chart/ActiveUserDevice";
import ActiveDailyRetain from "@/component/chart/ActiveDailyRetain";
import InviterFocused from "@/component/chart/InviterFocused";
import MonthActiveUserProvince from "@/component/chart/MonthActiveUserProvince";
import PPTCover from "@/component/ppt/PPTCover";
import UserPhotos from "@/component/chart/UserPhotos";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

interface MonthlyReportProps {
  nowPage: string;
  resetPage: () => void;
}

export default function MonthlyReport(props: MonthlyReportProps) {
  const [date, setDate] = useState({} as DateRange);

  const [isPrint, setIsPrint] = useState(false);

  function setDateRange(startTime: string, endTime: string) {
    setDate({
      StartTime: startTime,
      EndTime: endTime,
    });
  }

  const DataSummaryRefMonth = useRef(null);
  const DataSummaryByMonthRefMonth = useRef(null);
  const RegisteredUserByDayRefMonth = useRef(null);
  const NewPhotoByDayRefMonth = useRef(null);
  // const NumbersOfNewUserEveryWeekRefMonth = useRef(null);
  // const NumbersOfNewWorkEveryWeekRefMonth = useRef(null);
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
  const UserPhotosRefMonth = useRef(null);

  const InvitedKPIRefMonth = useRef(null);
  const InviterFocusedRefMonth = useRef(null);

  async function setPrint() {
    setIsPrint(true);
  }

  async function exportPNG() {
    await exportComponentAsPNG(DataSummaryRefMonth, {
      fileName: "用户数据概况",
    });
    await exportComponentAsPNG(DataSummaryByMonthRefMonth, {
      fileName: "用户数据月度对比",
    });
    await exportComponentAsPNG(RegisteredUserByDayRefMonth, {
      fileName: "新增用户注册数",
    });
    await exportComponentAsPNG(NewPhotoByDayRefMonth, {
      fileName: "新增作品数",
    });

    await exportComponentAsPNG(PhotoTypesRefMonth, {
      fileName: "发布作品类型分布",
    });
    await exportComponentAsPNG(PhotoTagRefMonth, {
      fileName: "不同标签作品数统计",
    });
    await exportComponentAsPNG(PhotoTypeByMonthRefMonth, {
      fileName: "发布作品类型月度对比",
    });
    await exportComponentAsPNG(PhotoEquipmentRefMonth, {
      fileName: "作品拍摄器材分布",
    });
    // @ts-ignore
    PhotoCompetitionTotalRefMonth.current.childNodes[0].childNodes.forEach(
      // @ts-ignore
      (value) => {
        // @ts-ignore
        value.childNodes.forEach((card) => {
          exportComponentAsPNG(
            {
              current: card,
            },
            { fileName: card.childNodes[0].innerHTML }
          ).then();
        });
      }
    );

    await exportComponentAsPNG(GiftRelatedDataRefMonth, {
      fileName: "礼品相关数据",
    });
    await exportComponentAsPNG(FreeCourseAccessRefMonth, {
      fileName: "免费课程访问数Top10",
    });
    await exportComponentAsPNG(CourseExchangeRefMonth, {
      fileName: "精品课程兑换数Top10",
    });
    await exportComponentAsPNG(AvatarExchangeRefMonth, {
      fileName: "头像挂件兑换数Top10",
    });

    await exportComponentAsPNG(UserAccessByChannelRefMonth, {
      fileName: "不同来源访问人数分布",
    });
    await exportComponentAsPNG(MonthlyChannelRefMonth, {
      fileName: "不同渠道来源用户访问月度对比",
    });
    await exportComponentAsPNG(FromInviterRefMonth, {
      fileName: "来自特邀影家渠道访问详情",
    });

    await exportComponentAsPNG(ActiveUserGenderRefMonth, {
      fileName: "访问用户性别分布",
    });
    await exportComponentAsPNG(ActiveUserAgeRefMonth, {
      fileName: "访问用户年龄分布",
    });
    await exportComponentAsPNG(ActiveUserDeviceRefMonth, {
      fileName: "访问用户终端分布",
    });
    await exportComponentAsPNG(MonthActiveUserProvinceRefMonth, {
      fileName: "访问用户地区分布",
    });

    await exportComponentAsPNG(DataSummaryRefMonth, { fileName: "月报" });

    // @ts-ignore
    ActiveDailyRetainRefMonth.current.childNodes.forEach(
      // @ts-ignore
      (value) => {
        // @ts-ignore
        exportComponentAsPNG(
          {
            current: value,
          },
          {
            fileName: "访问用户留存数据",
          }
        ).then();
      }
    );

    await exportComponentAsPNG(UserPhotosRefMonth, {
      fileName: "用户发布作品数分布",
    });

    await exportComponentAsPNG(InvitedKPIRefMonth, {
      fileName: "特邀影家KPI考核",
    });
    await exportComponentAsPNG(InviterFocusedRefMonth, {
      fileName: "特邀影家关注度统计",
    });
  }

  return (
    <div
      style={{
        minHeight: "1000px",
      }}
    >
      <Button
        className="print"
        danger
        icon={<DownloadOutlined />}
        onClick={() => {
          setPrint()
            .then(() => {
              return exportPNG();
            })
            .then(() => {
              setIsPrint(false);
            });
        }}
      >
        下载
      </Button>
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
          nowPage={isPrint}
          begin={date.StartTime}
          end={date.EndTime}
          isMonthReport={true}
        />
      </div>
      <div ref={DataSummaryByMonthRefMonth}>
        <DataSummaryByMonth
          nowPage={isPrint}
          begin={date.StartTime}
          end={date.EndTime}
          isMonthReport={true}
        />
      </div>
      <div ref={RegisteredUserByDayRefMonth}>
        <RegisteredUserByDay
          nowPage={isPrint}
          begin={date.StartTime}
          end={date.EndTime}
          isMonthReport={true}
        />
      </div>
      <div ref={NewPhotoByDayRefMonth}>
        <NewPhotoByDay
          nowPage={isPrint}
          begin={date.StartTime}
          end={date.EndTime}
          isMonthReport={true}
        />
      </div>

      {/*<div ref={NumbersOfNewUserEveryWeekRefMonth}>*/}
      {/*  <NumbersOfNewUserEveryWeek*/}
      {/*    begin={date.StartTime}*/}
      {/*    end={date.EndTime}*/}
      {/*    isMonthReport={true}*/}
      {/*  />*/}
      {/*</div>*/}
      {/*<div ref={NumbersOfNewWorkEveryWeekRefMonth}>*/}
      {/*  <NumbersOfNewWorkEveryWeek*/}
      {/*    begin={date.StartTime}*/}
      {/*    end={date.EndTime}*/}
      {/*    isMonthReport={true}*/}
      {/*  />*/}
      {/*</div>*/}

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
          nowPage={isPrint}
          begin={date.StartTime}
          end={date.EndTime}
          isMonthReport={true}
        />
      </div>
      <div ref={PhotoTagRefMonth}>
        <PhotoTag
          nowPage={isPrint}
          begin={date.StartTime}
          end={date.EndTime}
          isMonthReport={true}
        />
      </div>
      <div ref={PhotoTypeByMonthRefMonth}>
        <PhotoTypeByMonth
          nowPage={isPrint}
          begin={date.StartTime}
          end={date.EndTime}
          isMonthReport={true}
        />
      </div>
      <div ref={PhotoEquipmentRefMonth}>
        <PhotoEquipment
          nowPage={isPrint}
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
          nowPage={isPrint}
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>
      <div ref={FreeCourseAccessRefMonth}>
        <FreeCourseAccess
          nowPage={isPrint}
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>
      <div ref={CourseExchangeRefMonth}>
        <CourseExchange
          nowPage={isPrint}
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>
      <div ref={AvatarExchangeRefMonth}>
        <AvatarExchange
          nowPage={isPrint}
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
          nowPage={isPrint}
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>
      <div ref={MonthlyChannelRefMonth}>
        <MonthlyChannel
          nowPage={isPrint}
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>
      <div ref={FromInviterRefMonth}>
        <FromInviter
          nowPage={isPrint}
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
          nowPage={isPrint}
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>
      <div ref={ActiveUserAgeRefMonth}>
        <ActiveUserAge
          nowPage={isPrint}
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>
      <div ref={ActiveUserDeviceRefMonth}>
        <ActiveUserDevice
          nowPage={isPrint}
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>
      <div ref={MonthActiveUserProvinceRefMonth}>
        <MonthActiveUserProvince
          nowPage={isPrint}
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
          nowPage={isPrint}
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>
      <div ref={UserPhotosRefMonth}>
        <UserPhotos
          nowPage={isPrint}
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
          title={"特邀影家"}
        />
      </div>

      <div ref={InvitedKPIRefMonth}>
        <InvitedKPI
          nowPage={isPrint}
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>
      <div ref={InviterFocusedRefMonth}>
        <InviterFocused
          nowPage={isPrint}
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>
    </div>
  );
}
