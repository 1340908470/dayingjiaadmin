/*
 * 页面：来源分析
 * */

import "./Default.css";
import { useRef, useState } from "react";
import DateRangeFilter, { DateRange } from "@/component/Filter/DateRangeFilter";
import UserPhotos from "@/component/chart/UserPhotos";
import UserAccessTime from "@/component/chart/UserAccessTime";
import UserAccessDepth from "@/component/chart/UserAccessDepth";
import KeepAlive, { AliveScope } from "react-activation";
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
      <DateRangeFilter Title={"行为分析"} setDateRange={setDateRange} />
      <div ref={UserPhotosRef}>
        <UserPhotos begin={date.StartTime} end={date.EndTime} />
      </div>
      <div ref={UserAccessTimeRef}>
        <UserAccessTime begin={date.StartTime} end={date.EndTime} />
      </div>
      <div ref={UserAccessDepthRef}>
        <UserAccessDepth begin={date.StartTime} end={date.EndTime} />
      </div>
    </div>
  );
}
