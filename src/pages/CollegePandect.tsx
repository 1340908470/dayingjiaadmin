/*
 * 页面：青年学院总览
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

interface PandectProps {
  nowPage: string;
  resetPage: () => void;
}

export default function CollegePandect(props: PandectProps) {
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

  const CollegeDataSummaryRef = useRef(null);
  const CollegeFinishStudyRef = useRef(null);
  const CollegeOfflineJoinRef = useRef(null);
  const CollegeJoinUVRef = useRef(null);

  if (props.nowPage === "学院总览") {
    exportComponentAsPNG(CollegeDataSummaryRef)
      .then(() => {
        return exportComponentAsPNG(CollegeFinishStudyRef);
      })
      .then(() => {
        return exportComponentAsPNG(CollegeOfflineJoinRef);
      })
      .then(() => {
        return exportComponentAsPNG(CollegeJoinUVRef);
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
        Title={"学院总览"}
        setDateRange={setDateRange}
        setIsHideState={setIsHideState}
      />

      {isHide ? (
        ""
      ) : (
        <>
          {" "}
          <div ref={CollegeDataSummaryRef}>
            <CollegeDataSummary begin={date.StartTime} end={date.EndTime} />
          </div>
          <div ref={CollegeFinishStudyRef}>
            <CollegeFinishStudy begin={date.StartTime} end={date.EndTime} />
          </div>
          <div ref={CollegeOfflineJoinRef}>
            <CollegeOfflineJoin begin={date.StartTime} end={date.EndTime} />
          </div>
          <div ref={CollegeJoinUVRef}>
            <CollegeJoinUV begin={date.StartTime} end={date.EndTime} />
          </div>
        </>
      )}
    </div>
  );
}
