/*
 * 页面：来源分析
 * */

import "./Default.css";
import { useRef, useState } from "react";
import DateRangeFilter, { DateRange } from "@/component/filter/DateRangeFilter";
import UserAccess from "@/component/chart/UserAccess";
import DataSummary from "@/component/chart/DataSummary";
import RegisteredUserByDay from "@/component/chart/RegisteredUserByDay";
import NewPhotoByDay from "@/component/chart/NewPhotoByDay";
import UserAccessByChannel from "@/component/chart/UserAccessByChannel";
import FromInviter from "@/component/chart/FromInviter";
import InvitePhotos from "@/component/chart/InvitePhotos";
import InviteGroupPhotos from "@/component/chart/InviteGroupPhotos";
import InviteGroupComments from "@/component/chart/InviteGroupComments";
import InviteGroupLikes from "@/component/chart/InviteGroupLikes";
import PageSharePV from "@/component/chart/PageSharePV";
import PageShareUV from "@/component/chart/PageShareUV";
import PageVisitPV from "@/component/chart/PageVisitPV";
import PageVisitUV from "@/component/chart/PageVisitUV";
import { exportComponentAsPNG } from "react-component-export-image";

interface PageAnalysisProps {
  nowPage: string;
  resetPage: () => void;
}

export default function PageAnalysis(props: PageAnalysisProps) {
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

  const PageVisitPVRef = useRef(null);
  const PageVisitUVRef = useRef(null);

  if (props.nowPage === "页面分析") {
    exportComponentAsPNG(PageVisitPVRef)
      .then(() => {
        return exportComponentAsPNG(PageVisitUVRef);
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
        Title={"页面分析"}
        setDateRange={setDateRange}
        setIsHideState={setIsHideState}
      />

      {isHide ? (
        ""
      ) : (
        <>
          {" "}
          <div ref={PageVisitPVRef}>
            <PageVisitPV begin={date.StartTime} end={date.EndTime} />
          </div>
          <div ref={PageVisitUVRef}>
            <PageVisitUV begin={date.StartTime} end={date.EndTime} />
          </div>
        </>
      )}
    </div>
  );
}
