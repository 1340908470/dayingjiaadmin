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
import ChallengeRelatedData from "@/component/chart/ChallengeRelatedData";
import ChallengeWorksTrend from "@/component/chart/ChallengeWorksTrend";
import ChallengeJoinMember from "@/component/chart/ChallengeJoinMember";
import ChallengeHonor from "@/component/chart/ChallengeHonor";
import ChallengeJoinWorks from "@/component/chart/ChallengeJoinWorks";
import ChallengeSuccessWorks from "@/component/chart/ChallengeSuccessWorks";

interface ChallengeProps {
  nowPage: string;
  resetPage: () => void;
}

export default function Challenge(props: ChallengeProps) {
  const [date, setDate] = useState({} as DateRange);

  function setDateRange(startTime: string, endTime: string) {
    setDate({
      StartTime: startTime,
      EndTime: endTime,
    });
  }

  const ChallengeRelatedDataRef = useRef(null);
  const ChallengeWorksTrendRef = useRef(null);
  const ChallengeJoinMemberRef = useRef(null);
  const ChallengeHonorRef = useRef(null);
  const ChallengeJoinWorksRef = useRef(null);
  const ChallengeSuccessWorksRef = useRef(null);

  if (props.nowPage === "挑战") {
    exportComponentAsPNG(ChallengeRelatedDataRef)
      .then(() => {
        return exportComponentAsPNG(ChallengeWorksTrendRef);
      })
      .then(() => {
        return exportComponentAsPNG(ChallengeJoinMemberRef);
      })
      .then(() => {
        return exportComponentAsPNG(ChallengeHonorRef);
      })
      .then(() => {
        return exportComponentAsPNG(ChallengeJoinWorksRef);
      })
      .then(() => {
        return exportComponentAsPNG(ChallengeSuccessWorksRef);
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
      <DateRangeFilter Title={"挑战"} setDateRange={setDateRange} />

      <div ref={ChallengeRelatedDataRef}>
        <ChallengeRelatedData begin={date.StartTime} end={date.EndTime} />
      </div>
      <div ref={ChallengeWorksTrendRef}>
        <ChallengeWorksTrend begin={date.StartTime} end={date.EndTime} />
      </div>
      <div ref={ChallengeJoinMemberRef}>
        <ChallengeJoinMember begin={date.StartTime} end={date.EndTime} />
      </div>
      <div ref={ChallengeHonorRef}>
        <ChallengeHonor begin={date.StartTime} end={date.EndTime} />
      </div>
      <div ref={ChallengeJoinWorksRef}>
        <ChallengeJoinWorks begin={date.StartTime} end={date.EndTime} />
      </div>
      <div ref={ChallengeSuccessWorksRef}>
        <ChallengeSuccessWorks begin={date.StartTime} end={date.EndTime} />
      </div>
    </div>
  );
}
