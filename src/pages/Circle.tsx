/*
 * 页面：来源分析
 * */

import "./Default.css";
import { useRef, useState } from "react";
import DateRangeFilter, { DateRange } from "@/component/Filter/DateRangeFilter";
import CircleRelatedData from "@/component/chart/CircleRelatedData";
import { exportComponentAsPNG } from "react-component-export-image";
import CircleTrend from "@/component/chart/CircleTrend";
import CircleNewMember from "@/component/chart/CircleNewMember";
import CircleNewWorks from "@/component/chart/CircleNewWorks";
import CircleMember from "@/component/chart/CircleMember";

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

  const CircleRelatedDataRef = useRef(null);
  const CircleTrendRef = useRef(null);
  const CircleNewMemberRef = useRef(null);
  const CircleNewWorksRef = useRef(null);
  const CircleMemberRef = useRef(null);

  if (props.nowPage === "总览") {
    exportComponentAsPNG(CircleRelatedDataRef)
      .then(() => {
        return exportComponentAsPNG(CircleTrendRef);
      })
      .then(() => {
        return exportComponentAsPNG(CircleNewMemberRef);
      })
      .then(() => {
        return exportComponentAsPNG(CircleNewWorksRef);
      })
      .then(() => {
        return exportComponentAsPNG(CircleMemberRef);
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
      <DateRangeFilter Title={"圈子"} setDateRange={setDateRange} />

      <div ref={CircleRelatedDataRef}>
        <CircleRelatedData begin={date.StartTime} end={date.EndTime} />
      </div>
      <div ref={CircleTrendRef}>
        <CircleTrend begin={date.StartTime} end={date.EndTime} />
      </div>
      <div ref={CircleNewMemberRef}>
        <CircleNewMember begin={date.StartTime} end={date.EndTime} />
      </div>
      <div ref={CircleNewWorksRef}>
        <CircleNewWorks begin={date.StartTime} end={date.EndTime} />
      </div>
      <div ref={CircleMemberRef}>
        <CircleMember begin={date.StartTime} end={date.EndTime} />
      </div>
    </div>
  );
}
