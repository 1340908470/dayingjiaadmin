/*
 * 页面：来源分析
 * */

import "./Default.css";
import { useEffect, useRef, useState } from "react";
import DateRangeFilter, { DateRange } from "@/component/filter/DateRangeFilter";
import { exportComponentAsPNG } from "react-component-export-image";
import { call } from "@/util/client";
import analytics from "@/util/backend/analytics";
import PhotoCompetitionNavigationButton from "@/component/navigation/PhotoCompetitionNavigationButton";
import CompetitionRelatedData from "@/component/chart/CompetitionRelatedData";
import UserContributionsTrend from "@/component/chart/UserContributionsTrend";
import CompetitionChannel from "@/component/chart/CompetitionChannel";

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

export interface Competition {
  id: number;
  name: string;
  投稿数量: number;
  详情页各渠道访问次数: ChannelAccessTimes[];
  详情页各渠道访问人数: ChannelAccessNumbers[];
  注册人数: number;
}

export default function PhotoCompetition(props: PhotoCompetitionProps) {
  const [date, setDate] = useState({} as DateRange);

  const [competitionName, setCompetitionName] = useState("");
  const [competitionID, setCompetitionID] = useState(0);
  const [competitionNames, setCompetitionNames] = useState([] as string[]);
  const [totalCompetition, setTotalCompetition] = useState([] as Competition[]);

  useEffect(() => {
    call(analytics.TotalCompetition, {
      begin: date.StartTime,
      end: date.EndTime,
    }).then((r) => {
      setTotalCompetition(r);
      if (r) {
        setCompetitionName(r[0].name);
        setCompetitionID(r[0].id);
        let tmpCompetitionNames = [] as string[];
        r.forEach((value) => {
          tmpCompetitionNames.push(value.name);
        });
        setCompetitionNames(tmpCompetitionNames);
        setTotalCompetition(r);
      }
    });
  }, [date.StartTime]);

  const setNowCompetitionName = (name: string) => {
    setCompetitionName(name);
    totalCompetition.forEach((value) => {
      if (value.name == name) {
        setCompetitionID(value.id);
      }
    });
  };

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
      <PhotoCompetitionNavigationButton
        competitionName={competitionName}
        competitionNames={competitionNames}
        setNowCompetitionName={setNowCompetitionName}
      />
      <CompetitionRelatedData
        id={competitionID}
        begin={date.StartTime}
        end={date.EndTime}
      />
      <UserContributionsTrend
        id={competitionID}
        begin={date.StartTime}
        end={date.EndTime}
      />
      <CompetitionChannel
        id={competitionID}
        begin={date.StartTime}
        end={date.EndTime}
      />
    </div>
  );
}
