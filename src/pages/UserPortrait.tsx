/*
 * 页面：用户画像
 * */

import "./Default.css";
import { useRef, useState } from "react";
import DateRangeFilter, { DateRange } from "@/component/filter/DateRangeFilter";
import { Tabs } from "antd";
import ActiveUserGender from "@/component/chart/ActiveUserGender";
import NewUserGender from "@/component/chart/NewUserGender";
import ActiveUserAge from "@/component/chart/ActiveUserAge";
import NewUserAge from "@/component/chart/NewUserAge";
import ActiveUserProvince from "@/component/chart/ActiveUserProvince";
import NewUserProvince from "@/component/chart/NewUserProvince";
import ActiveUserDevice from "@/component/chart/ActiveUserDevice";
import NewUserDevice from "@/component/chart/NewUserDevice";
import { exportComponentAsPNG } from "react-component-export-image";
import UserAccessByChannel from "@/component/chart/UserAccessByChannel";

const { TabPane } = Tabs;

interface UserPortraitProps {
  nowPage: string;
  resetPage: () => void;
}

export default function UserPortrait(props: UserPortraitProps) {
  const [date, setDate] = useState({} as DateRange);
  const [tab, setTab] = useState("性别及年龄分布");

  const [isHide, setIsHide] = useState(false);

  function setIsHideState(isHide: boolean) {
    setIsHide(isHide);
  }

  function setDateRange(startTime: string, endTime: string) {
    setDate({
      StartTime: startTime,
      EndTime: endTime,
    });
  }

  function callback(key: any) {
    setTab(key);
  }

  const ActiveUserGenderRef = useRef(null);
  const NewUserGenderRef = useRef(null);
  const ActiveUserAgeRef = useRef(null);
  const NewUserAgeRef = useRef(null);

  const ActiveUserProvinceRef = useRef(null);
  const NewUserProvinceRef = useRef(null);

  const ActiveUserDeviceRef = useRef(null);
  const NewUserDeviceRef = useRef(null);

  if (props.nowPage === "用户画像") {
    if (tab === "性别及年龄分布") {
      exportComponentAsPNG(ActiveUserGenderRef)
        .then(() => {
          return exportComponentAsPNG(NewUserGenderRef);
        })
        .then(() => {
          return exportComponentAsPNG(ActiveUserAgeRef);
        })
        .then(() => {
          return exportComponentAsPNG(NewUserAgeRef);
        })
        .then(() => {
          props.resetPage();
        });
    }
    if (tab === "地区分布") {
      exportComponentAsPNG(ActiveUserProvinceRef)
        .then(() => {
          return exportComponentAsPNG(NewUserProvinceRef);
        })
        .then(() => {
          props.resetPage();
        });
    }
    if (tab === "终端及机型分布") {
      exportComponentAsPNG(ActiveUserDeviceRef)
        .then(() => {
          return exportComponentAsPNG(NewUserDeviceRef);
        })
        .then(() => {
          props.resetPage();
        });
    }
  }

  return (
    <div
      style={{
        minHeight: "1000px",
      }}
    >
      <DateRangeFilter
        Title={"用户画像"}
        setDateRange={setDateRange}
        setIsHideState={setIsHideState}
      />

      {isHide ? (
        ""
      ) : (
        <div style={{ marginTop: "-10px" }}>
          <Tabs defaultActiveKey="性别及年龄分布" onChange={callback}>
            <TabPane tab="性别及年龄分布" key="性别及年龄分布">
              <div ref={ActiveUserGenderRef}>
                <ActiveUserGender begin={date.StartTime} end={date.EndTime} />
              </div>
              <div ref={NewUserGenderRef}>
                <NewUserGender begin={date.StartTime} end={date.EndTime} />
              </div>
              <div ref={ActiveUserAgeRef}>
                <ActiveUserAge begin={date.StartTime} end={date.EndTime} />
              </div>
              <div ref={NewUserAgeRef}>
                <NewUserAge begin={date.StartTime} end={date.EndTime} />
              </div>
            </TabPane>
            <TabPane tab="地区分布" key="地区分布">
              <div ref={ActiveUserGenderRef}>
                <ActiveUserProvince begin={date.StartTime} end={date.EndTime} />
              </div>
              <div ref={ActiveUserGenderRef}>
                <NewUserProvince begin={date.StartTime} end={date.EndTime} />
              </div>
            </TabPane>
            <TabPane tab="终端及机型分布" key="终端及机型分布">
              <div ref={ActiveUserGenderRef}>
                <ActiveUserDevice begin={date.StartTime} end={date.EndTime} />
              </div>
              <div ref={ActiveUserGenderRef}>
                <NewUserDevice begin={date.StartTime} end={date.EndTime} />
              </div>
            </TabPane>
          </Tabs>
        </div>
      )}
    </div>
  );
}
