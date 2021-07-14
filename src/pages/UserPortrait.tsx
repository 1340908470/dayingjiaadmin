/*
 * 页面：用户画像
 * */

import "./Default.css";
import { useState } from "react";
import DateRangeFilter, { DateRange } from "@/component/Filter/DateRangeFilter";
import { Tabs } from "antd";
import ActiveUserGender from "@/component/chart/ActiveUserGender";
import NewUserGender from "@/component/chart/NewUserGender";
import ActiveUserAge from "@/component/chart/ActiveUserAge";
import NewUserAge from "@/component/chart/NewUserAge";
import ActiveUserProvince from "@/component/chart/ActiveUserProvince";
import NewUserProvince from "@/component/chart/NewUserProvince";
import ActiveUserDevice from "@/component/chart/ActiveUserDevice";
import NewUserDevice from "@/component/chart/NewUserDevice";

const { TabPane } = Tabs;

function callback(key: any) {
  console.log(key);
}

export default function UserPortrait() {
  const [date, setDate] = useState({} as DateRange);

  function setDateRange(startTime: string, endTime: string) {
    setDate({
      StartTime: startTime,
      EndTime: endTime,
    });
  }

  return (
    <div
      style={{
        minHeight: "1000px",
      }}
    >
      <DateRangeFilter Title={"用户画像"} setDateRange={setDateRange} />
      <div style={{ marginTop: "-10px" }}>
        <Tabs defaultActiveKey="性别及年龄分布" onChange={callback}>
          <TabPane tab="性别及年龄分布" key="性别及年龄分布">
            <ActiveUserGender begin={date.StartTime} end={date.EndTime} />
            <NewUserGender begin={date.StartTime} end={date.EndTime} />
            <ActiveUserAge begin={date.StartTime} end={date.EndTime} />
            <NewUserAge begin={date.StartTime} end={date.EndTime} />
          </TabPane>
          <TabPane tab="地区分布" key="地区分布">
            <ActiveUserProvince begin={date.StartTime} end={date.EndTime} />
            <NewUserProvince begin={date.StartTime} end={date.EndTime} />
          </TabPane>
          <TabPane tab="终端及机型分布" key="终端及机型分布">
            <ActiveUserDevice begin={date.StartTime} end={date.EndTime} />
            <NewUserDevice begin={date.StartTime} end={date.EndTime} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
