/*
 * 页面：来源分析
 * */

import "./Default.css";
import { useRef, useState } from "react";
import DateRangeFilter, { DateRange } from "@/component/Filter/DateRangeFilter";
import UserAccessByChannel from "@/component/chart/UserAccessByChannel";
import FromInviter from "@/component/chart/FromInviter";
import { exportComponentAsPNG } from "react-component-export-image";
import PageSharePV from "@/component/chart/PageSharePV";

interface ShareProps {
  nowPage: string;
  resetPage: () => void;
}

export default function SourceAnalysis(props: ShareProps) {
  const [date, setDate] = useState({} as DateRange);

  function setDateRange(startTime: string, endTime: string) {
    setDate({
      StartTime: startTime,
      EndTime: endTime,
    });
  }

  const UserAccessByChannelRef = useRef(null);
  const FromInviterRef = useRef(null);

  if (props.nowPage === "来源分析") {
    exportComponentAsPNG(UserAccessByChannelRef)
      .then(() => {
        return exportComponentAsPNG(FromInviterRef);
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
      <DateRangeFilter Title={"来源分析"} setDateRange={setDateRange} />
      <div ref={UserAccessByChannelRef}>
        <UserAccessByChannel begin={date.StartTime} end={date.EndTime} />
      </div>
      <div ref={FromInviterRef}>
        <FromInviter begin={date.StartTime} end={date.EndTime} />
      </div>
    </div>
  );
}
