/*
 * 页面：留存分析
 * */

import "./Default.css";
import { useRef, useState } from "react";
import { DateRange } from "@/component/filter/DateRangeFilter";
import SingleDateFilter from "@/component/filter/SingleDateFilter";
import ActiveDailyRetain from "@/component/chart/ActiveDailyRetain";
import NewDailyRetain from "@/component/chart/NewDailyRetain";
import { exportComponentAsPNG } from "react-component-export-image";

interface RetentionAnalysisProps {
  nowPage: string;
  resetPage: () => void;
}

export default function RetentionAnalysis(props: RetentionAnalysisProps) {
  const [date, setDate] = useState({} as DateRange);

  function setDateRange(startTime: string, endTime: string) {
    setDate({
      StartTime: startTime,
      EndTime: endTime,
    });
  }

  const ActiveDailyRetainRef = useRef(null);
  const NewDailyRetainRef = useRef(null);

  if (props.nowPage === "留存分析") {
    exportComponentAsPNG(ActiveDailyRetainRef)
      .then(() => {
        return exportComponentAsPNG(NewDailyRetainRef);
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
      <SingleDateFilter Title={"留存分析"} setDateRange={setDateRange} />
      <div ref={ActiveDailyRetainRef}>
        <ActiveDailyRetain begin={date.StartTime} end={date.EndTime} />
      </div>
      <div ref={NewDailyRetainRef}>
        <NewDailyRetain begin={date.StartTime} end={date.EndTime} />
      </div>
    </div>
  );
}
