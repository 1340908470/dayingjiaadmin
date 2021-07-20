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
import { exportComponentAsPNG } from "react-component-export-image";

interface InvitedPhotographerProps {
  nowPage: string;
  resetPage: () => void;
}

export default function InvitedPhotographer(props: InvitedPhotographerProps) {
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

  const InvitePhotosRef = useRef(null);
  const InviteGroupPhotosRef = useRef(null);
  const InviteGroupCommentsRef = useRef(null);
  const InviteGroupLikesRef = useRef(null);

  if (props.nowPage === "特邀影家") {
    exportComponentAsPNG(InvitePhotosRef)
      .then(() => {
        return exportComponentAsPNG(InviteGroupPhotosRef);
      })
      .then(() => {
        return exportComponentAsPNG(InviteGroupCommentsRef);
      })
      .then(() => {
        return exportComponentAsPNG(InviteGroupLikesRef);
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
        Title={"特邀影家"}
        setDateRange={setDateRange}
        setIsHideState={setIsHideState}
      />

      {isHide ? (
        ""
      ) : (
        <>
          {" "}
          <div ref={InvitePhotosRef}>
            <InvitePhotos begin={date.StartTime} end={date.EndTime} />
          </div>
          <div ref={InviteGroupPhotosRef}>
            <InviteGroupPhotos begin={date.StartTime} end={date.EndTime} />
          </div>
          <div ref={InviteGroupCommentsRef}>
            <InviteGroupComments begin={date.StartTime} end={date.EndTime} />
          </div>
          <div ref={InviteGroupLikesRef}>
            <InviteGroupLikes begin={date.StartTime} end={date.EndTime} />
          </div>
        </>
      )}
    </div>
  );
}
