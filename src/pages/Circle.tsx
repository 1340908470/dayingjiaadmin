/*
 * 页面：来源分析
 * */

import "./Default.css";
import { useRef, useState } from "react";
import DateRangeFilter, { DateRange } from "@/component/Filter/DateRangeFilter";
import CircleRelatedData from "@/component/chart/CircleRelatedData";
import { exportComponentAsPNG } from "react-component-export-image";

interface CircleProps {
  nowPage: string;
  resetPage: () => void;
}

export default function Circle(props: CircleProps) {
  const [date, setDate] = useState({} as DateRange);

  function setDateRange(startTime: string, endTime: string) {
    setDate({
      StartTime: startTime,
      EndTime: endTime,
    });
  }

  // const UserPhotosRef = useRef(null);
  // const UserAccessTimeRef = useRef(null);
  // const UserAccessDepthRef = useRef(null);
  //
  // if (props.nowPage === "总览") {
  //   exportComponentAsPNG(UserPhotosRef)
  //       .then(() => {
  //         return exportComponentAsPNG(UserAccessTimeRef);
  //       })
  //       .then(() => {
  //         return exportComponentAsPNG(UserAccessDepthRef);
  //       })
  //       .then(() => {
  //         props.resetPage();
  //       });
  // }

  return (
    <div
      style={{
        minHeight: "1000px",
      }}
    >
      <DateRangeFilter Title={"圈子"} setDateRange={setDateRange} />
      <CircleRelatedData begin={date.StartTime} end={date.EndTime} />
    </div>
  );
}
