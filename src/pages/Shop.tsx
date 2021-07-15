/*
 * 页面：来源分析
 * */

import "./Default.css";
import { useRef, useState } from "react";
import DateRangeFilter, { DateRange } from "@/component/filter/DateRangeFilter";
import CircleRelatedData from "@/component/chart/CircleRelatedData";
import { exportComponentAsPNG } from "react-component-export-image";
import CircleTrend from "@/component/chart/CircleTrend";
import CircleNewMember from "@/component/chart/CircleNewMember";
import CircleNewWorks from "@/component/chart/CircleNewWorks";
import CircleMember from "@/component/chart/CircleMember";
import ChallengeRelatedData from "@/component/chart/ChallengeRelatedData";
import ChallengeWorksTrend from "@/component/chart/ChallengeWorksTrend";
import ChallengeJoinMember from "@/component/chart/ChallengeJoinMember";
import ChallengeHonor from "@/component/chart/ChallengeHonor";
import ChallengeJoinWorks from "@/component/chart/ChallengeJoinWorks";
import ChallengeSuccessWorks from "@/component/chart/ChallengeSuccessWorks";
import GiftRelatedData from "@/component/chart/GiftRelatedData";
import FreeCourseAccess from "@/component/chart/FreeCourseAccess";
import CourseExchange from "@/component/chart/CourseExchange";
import AvatarExchange from "@/component/chart/AvatarExchange";

interface ShopProps {
  nowPage: string;
  resetPage: () => void;
}

export default function Shop(props: ShopProps) {
  const [date, setDate] = useState({} as DateRange);

  function setDateRange(startTime: string, endTime: string) {
    setDate({
      StartTime: startTime,
      EndTime: endTime,
    });
  }

  const GiftRelatedDataRef = useRef(null);
  const FreeCourseAccessRef = useRef(null);
  const CourseExchangeRef = useRef(null);
  const AvatarExchangeRef = useRef(null);

  if (props.nowPage === "积分商城") {
    exportComponentAsPNG(GiftRelatedDataRef)
      .then(() => {
        return exportComponentAsPNG(FreeCourseAccessRef);
      })
      .then(() => {
        return exportComponentAsPNG(CourseExchangeRef);
      })
      .then(() => {
        return exportComponentAsPNG(AvatarExchangeRef);
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
      <DateRangeFilter Title={"积分商城"} setDateRange={setDateRange} />

      <div ref={GiftRelatedDataRef}>
        <GiftRelatedData begin={date.StartTime} end={date.EndTime} />
      </div>
      <div ref={FreeCourseAccessRef}>
        <FreeCourseAccess begin={date.StartTime} end={date.EndTime} />
      </div>
      <div ref={CourseExchangeRef}>
        <CourseExchange begin={date.StartTime} end={date.EndTime} />
      </div>
      <div ref={AvatarExchangeRef}>
        <AvatarExchange begin={date.StartTime} end={date.EndTime} />
      </div>
    </div>
  );
}
