/*
 * 页面：来源分析
 * */

import "./Default.css";
import { useRef, useState } from "react";
import DateRangeFilter, { DateRange } from "@/component/Filter/DateRangeFilter";
import UserAccess from "@/component/chart/UserAccess";
import DataSummary from "@/component/chart/DataSummary";
import RegisteredUserByDay from "@/component/chart/RegisteredUserByDay";
import NewPhotoByDay from "@/component/chart/NewPhotoByDay";
import UserAccessByChannel from "@/component/chart/UserAccessByChannel";
import FromInviter from "@/component/chart/FromInviter";
import PhotoTypes from "@/component/chart/PhotoTypes";
import PhotoTag from "@/component/chart/PhotoTag";
import PhotoEquipment from "@/component/chart/PhotoEquipment";
import { exportComponentAsPNG } from "react-component-export-image";

interface WorksProps {
  nowPage: string;
  resetPage: () => void;
}

export default function Works(props: WorksProps) {
  const [date, setDate] = useState({} as DateRange);

  function setDateRange(startTime: string, endTime: string) {
    setDate({
      StartTime: startTime,
      EndTime: endTime,
    });
  }

  const PhotoTypesRef = useRef(null);
  const PhotoTagRef = useRef(null);
  const PhotoEquipmentRef = useRef(null);

  if (props.nowPage === "作品") {
    exportComponentAsPNG(PhotoTypesRef)
      .then(() => {
        return exportComponentAsPNG(PhotoTagRef);
      })
      .then(() => {
        return exportComponentAsPNG(PhotoEquipmentRef);
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
      <DateRangeFilter Title={"作品"} setDateRange={setDateRange} />
      <div ref={PhotoTypesRef}>
        <PhotoTypes begin={date.StartTime} end={date.EndTime} />
      </div>
      <div ref={PhotoTagRef}>
        <PhotoTag begin={date.StartTime} end={date.EndTime} />
      </div>
      <div ref={PhotoEquipmentRef}>
        <PhotoEquipment begin={date.StartTime} end={date.EndTime} />
      </div>
    </div>
  );
}
