/*
 * 页面：总览
 * */

import "./Default.css";
import { Col, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import Filter, { DateRange } from "@/component/Filter";
import PhotoTag from "@/component/chart/PhotoTag";
import PhotoTypes from "@/component/chart/PhotoTypes";
const { Title } = Typography;

export default function Pandect() {
  const [date, setDate] = useState({} as DateRange);

  function setDateRange(startTime: string, endTime: string) {
    setDate({
      StartTime: startTime,
      EndTime: endTime,
    });
  }

  return (
    <div className={"card"}>
      <Filter Title={"总览"} setDateRange={setDateRange} />
      <PhotoTypes begin={date.StartTime} end={date.EndTime} />
      <PhotoTag begin={date.StartTime} end={date.EndTime} />
    </div>
  );
}
