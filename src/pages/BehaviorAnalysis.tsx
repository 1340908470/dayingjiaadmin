/*
 * 页面：来源分析
 * */

import "./Default.css";
import { useRef, useState } from "react";
import DateRangeFilter, { DateRange } from "@/component/filter/DateRangeFilter";
import UserPhotos from "@/component/chart/UserPhotos";
import UserAccessTime from "@/component/chart/UserAccessTime";
import UserAccessDepth from "@/component/chart/UserAccessDepth";
import { exportComponentAsPNG } from "react-component-export-image";

interface BehaviorAnalysisProps {
  nowPage: string;
  resetPage: () => void;
}

export default function BehaviorAnalysis(props: BehaviorAnalysisProps) {
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

  const UserPhotosRef = useRef(null);
  const UserAccessTimeRef = useRef(null);
  const UserAccessDepthRef = useRef(null);

  if (props.nowPage === "行为分析") {
    exportComponentAsPNG(UserPhotosRef)
      .then(() => {
        return exportComponentAsPNG(UserAccessTimeRef);
      })
      .then(() => {
        return exportComponentAsPNG(UserAccessDepthRef);
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
        Title={"行为分析"}
        setDateRange={setDateRange}
        setIsHideState={setIsHideState}
      />
      {isHide ? (
        ""
      ) : (
        <>
          {" "}
          <div ref={UserPhotosRef}>
            <UserPhotos begin={date.StartTime} end={date.EndTime} />
          </div>
          <div ref={UserAccessTimeRef}>
            <UserAccessTime begin={date.StartTime} end={date.EndTime} />
          </div>
          <div ref={UserAccessDepthRef}>
            <UserAccessDepth begin={date.StartTime} end={date.EndTime} />
          </div>
        </>
      )}
    </div>
  );
}
