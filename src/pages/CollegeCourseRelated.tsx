/*
 * 页面：青年学院课程相关
 * */

import "./Default.css";
import { useRef, useState } from "react";
import DateRangeFilter, { DateRange } from "@/component/filter/DateRangeFilter";
import UserAccess from "@/component/chart/UserAccess";
import DataSummary from "@/component/chart/DataSummary";
import RegisteredUserByDay from "@/component/chart/RegisteredUserByDay";
import NewPhotoByDay from "@/component/chart/NewPhotoByDay";
import { exportComponentAsPNG } from "react-component-export-image";
import CollegeDataSummary from "@/component/chart/CollegeDataSummary";
import CollegeFinishStudy from "@/component/chart/CollegeFinishStudy";
import CollegeOfflineJoin from "@/component/chart/CollegeOfflineJoin";
import CollegeJoinUV from "@/component/chart/CollegeJoinUV";
import CollegeCourseSummary from "@/component/chart/CollegeCourseSummary";
import CollegeCourseAccess from "@/component/chart/CollegeCourseAccess";
import CollegeCourseHomework from "@/component/chart/CollegeCourseHomework";
import CollegeSubmitHomework from "@/component/chart/CollegeSubmitHomework";
import CollegeCourseDiscuss from "@/component/chart/CollegeCourseDiscuss";
import CollegeClickTrend from "@/component/chart/CollegeClickTrend";
import CollegeRecommendClick from "@/component/chart/CollegeRecommendClick";
import CollegeTeacher from "@/component/chart/CollegeTeacher";

interface PandectProps {
  nowPage: string;
  resetPage: () => void;
}

export default function CollegeCourseRelated(props: PandectProps) {
  const [date, setDate] = useState({} as DateRange);

  function setDateRange(startTime: string, endTime: string) {
    setDate({
      StartTime: startTime,
      EndTime: endTime,
    });
  }

  const [isHide, setIsHide] = useState(false);

  function setIsHideState(isHide: boolean) {
    setIsHide(isHide);
  }

  const CollegeCourseSummaryRef = useRef(null);
  const CollegeCourseAccessRef = useRef(null);
  const CollegeCourseHomeworkRef = useRef(null);
  const CollegeSubmitHomeworkRef = useRef(null);
  const CollegeCourseDiscussRef = useRef(null);
  const CollegeClickTrendRef = useRef(null);
  const CollegeRecommendClickRef = useRef(null);

  if (props.nowPage === "学院课程相关") {
    exportComponentAsPNG(CollegeCourseSummaryRef)
      .then(() => {
        return exportComponentAsPNG(CollegeCourseAccessRef);
      })
      .then(() => {
        return exportComponentAsPNG(CollegeCourseHomeworkRef);
      })
      .then(() => {
        return exportComponentAsPNG(CollegeSubmitHomeworkRef);
      })
      .then(() => {
        return exportComponentAsPNG(CollegeCourseDiscussRef);
      })
      .then(() => {
        return exportComponentAsPNG(CollegeClickTrendRef);
      })
      .then(() => {
        return exportComponentAsPNG(CollegeRecommendClickRef);
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
      <DateRangeFilter
        Title={"课程相关"}
        setDateRange={setDateRange}
        setIsHideState={setIsHideState}
      />

      {isHide ? (
        ""
      ) : (
        <>
          {" "}
          <div ref={CollegeCourseSummaryRef}>
            <CollegeCourseSummary begin={date.StartTime} end={date.EndTime} />
          </div>
          <div ref={CollegeCourseAccessRef}>
            <CollegeCourseAccess begin={date.StartTime} end={date.EndTime} />
          </div>
          <div ref={CollegeCourseHomeworkRef}>
            <CollegeCourseHomework begin={date.StartTime} end={date.EndTime} />
          </div>
          <div ref={CollegeSubmitHomeworkRef}>
            <CollegeSubmitHomework begin={date.StartTime} end={date.EndTime} />
          </div>
          <div ref={CollegeSubmitHomeworkRef}>
            <CollegeCourseDiscuss begin={date.StartTime} end={date.EndTime} />
          </div>
          <div ref={CollegeClickTrendRef}>
            <CollegeClickTrend begin={date.StartTime} end={date.EndTime} />
          </div>
          <div ref={CollegeRecommendClickRef}>
            <CollegeRecommendClick begin={date.StartTime} end={date.EndTime} />
          </div>
          <div ref={CollegeRecommendClickRef}>
            <CollegeTeacher begin={date.StartTime} end={date.EndTime}  category={1} id={1} nowPage={""}/>
          </div>
        </>
      )}
    </div>
  );
}
