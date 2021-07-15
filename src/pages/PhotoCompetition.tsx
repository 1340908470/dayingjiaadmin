/*
 * 页面：来源分析
 * */

import "./Default.css";
import { useEffect, useRef, useState } from "react";
import DateRangeFilter, { DateRange } from "@/component/Filter/DateRangeFilter";
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
import { exportComponentAsPNG } from "react-component-export-image";
import ActiveDailyRetain from "@/component/chart/ActiveDailyRetain";
import { call } from "@/util/client";
import analytics from "@/util/backend/analytics";
import { useRequest } from "@@/plugin-request/request";
import { useAsyncFn } from "react-use";

interface PhotoCompetitionProps {
  nowPage: string;
  resetPage: () => void;
}

interface ChannelAccessTimes {
  amount: number;
  channel: string;
}

interface ChannelAccessNumbers {
  amount: number;
  channel: string;
}

interface Competition {
  id: number;
  name: string;
  投稿数量: number;
  详情页各渠道访问次数: ChannelAccessTimes[];
  详情页各渠道访问人数: ChannelAccessNumbers[];
  注册人数: number;
}

export default function PhotoCompetition(props: PhotoCompetitionProps) {
  const [date, setDate] = useState({} as DateRange);

  const [totalCompetition, setTotalCompetition] = useState({} as Competition[]);

  useEffect(() => {
    call(analytics.TotalCompetition, {
      begin: date.StartTime,
      end: date.EndTime,
    }).then((r) => {
      console.log(r);
    });
  }, [date]);

  function setDateRange(startTime: string, endTime: string) {
    setDate({
      StartTime: startTime,
      EndTime: endTime,
    });
  }

  const PageSharePVRef = useRef(null);
  const PageShareUVRef = useRef(null);

  if (props.nowPage === "分享") {
    exportComponentAsPNG(PageSharePVRef)
      .then(() => {
        return exportComponentAsPNG(PageShareUVRef);
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
      <DateRangeFilter Title={"分享"} setDateRange={setDateRange} />
      {/*<div ref={PageSharePVRef}>*/}
      {/*  <PageSharePV begin={date.StartTime} end={date.EndTime} />*/}
      {/*</div>*/}
      {/*<div ref={PageShareUVRef}>*/}
      {/*  <PageShareUV begin={date.StartTime} end={date.EndTime} />*/}
      {/*</div>*/}
    </div>
  );
}
