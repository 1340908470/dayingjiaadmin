/*
 * 页面：总览
 * */

import "./Default.css";
import { useRef, useState } from "react";
import DateRangeFilter, { DateRange } from "@/component/filter/DateRangeFilter";
import UserAccess from "@/component/chart/UserAccess";
import DataSummary from "@/component/chart/DataSummary";
import RegisteredUserByDay from "@/component/chart/RegisteredUserByDay";
import NewPhotoByDay from "@/component/chart/NewPhotoByDay";
import { exportComponentAsPNG } from "react-component-export-image";

interface PandectProps {
  nowPage: string;
  resetPage: () => void;
}

export default function Pandect(props: PandectProps) {
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

  const DataSummaryRef = useRef(null);
  const UserAccessRef = useRef(null);
  const RegisteredUserByDayRef = useRef(null);
  const NewPhotoByDayRef = useRef(null);

  if (props.nowPage === "总览") {
    exportComponentAsPNG(DataSummaryRef)
      .then(() => {
        return exportComponentAsPNG(UserAccessRef);
      })
      .then(() => {
        return exportComponentAsPNG(RegisteredUserByDayRef);
      })
      .then(() => {
        return exportComponentAsPNG(NewPhotoByDayRef);
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
        Title={"总览"}
        setDateRange={setDateRange}
        setIsHideState={setIsHideState}
      />

      {isHide ? (
        ""
      ) : (
        <>
          {" "}
          <div ref={DataSummaryRef}>
            <DataSummary begin={date.StartTime} end={date.EndTime} />
          </div>
          <div ref={UserAccessRef}>
            <UserAccess begin={date.StartTime} end={date.EndTime} />
          </div>
          <div ref={RegisteredUserByDayRef}>
            <RegisteredUserByDay begin={date.StartTime} end={date.EndTime} />
          </div>
          <div ref={NewPhotoByDayRef}>
            <NewPhotoByDay begin={date.StartTime} end={date.EndTime} />
          </div>
        </>
      )}
    </div>
  );
}
