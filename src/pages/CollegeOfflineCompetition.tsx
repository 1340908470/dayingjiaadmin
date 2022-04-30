/*
 * 页面：来源分析
 * */

import "./Default.css";
import { useEffect, useRef, useState } from "react";
import DateRangeFilter, { DateRange } from "@/component/filter/DateRangeFilter";
import { exportComponentAsPNG } from "react-component-export-image";
import { call, isEmpty } from "@/util/client";
import analytics, { CompetitionSimple } from "@/util/backend/analytics";
import PhotoCompetitionNavigationButton from "@/component/navigation/PhotoCompetitionNavigationButton";
import CompetitionRelatedData from "@/component/chart/CompetitionRelatedData";
import UserContributionsTrend from "@/component/chart/UserContributionsTrend";
import CompetitionChannel from "@/component/chart/CompetitionChannel";
import NewUserRegister from "@/component/chart/NewUserRegister";
import CollegeActivityRelatedData from "@/component/chart/CollegeActivityRelatedData";
import CollegeUserJoinTrend from "@/component/chart/CollegeUserJoinTrend";
import CollegeUserSubmitTrend from "@/component/chart/CollegeUserSubmitTrend";
import CollegeUserRegisterTrend from "@/component/chart/CollegeUserRegisterTrend";

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

export default function CollegeOfflineCompetition(props: PhotoCompetitionProps) {
  const [date, setDate] = useState({} as DateRange);

  const [isHide, setIsHide] = useState(false);

  function setIsHideState(isHide: boolean) {
    setIsHide(isHide);
  }

  const [competitionName, setCompetitionName] = useState("");
  const [competitionID, setCompetitionID] = useState(0);
  const [competitionCategory, setCompetitionCategory] = useState(0);
  const [competitionNames, setCompetitionNames] = useState([] as string[]);
  const [totalCompetition, setTotalCompetition] = useState(
    [] as CompetitionSimple[]
  );

  useEffect(() => {
    !isEmpty(date.StartTime) && !isEmpty(date.EndTime) && call(analytics.CompetitionList, {
      begin: date.StartTime,
      end: date.EndTime,
    }).then((r) => {
      if (r && r[0] && !isEmpty(r)) {
        setCompetitionName(r[0].name);
        setCompetitionID(r[0].id);
        setCompetitionCategory(r[0].category);
        let tmpCompetitionNames = [] as string[];
        r.forEach((value) => {
          tmpCompetitionNames.push(value.name);
        });
        setCompetitionNames(tmpCompetitionNames);
        setTotalCompetition(r);
      }
    });
  }, [date.StartTime]);

  useEffect(() => {
    totalCompetition.forEach((value) => {
      if (value.name == competitionName) {
        setCompetitionID(value.id);
        setCompetitionCategory(value.category);
      }
    });
  }, [competitionName, totalCompetition]);

  const setNowCompetitionName = (name: string) => {
    setCompetitionName(name);
  };

  function setDateRange(startTime: string, endTime: string) {
    setDate({
      StartTime: startTime,
      EndTime: endTime,
    });
  }

  const PageSharePVRef = useRef(null);
  const PageShareUVRef = useRef(null);

  if (props.nowPage === "学院线下活动") {
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
      <DateRangeFilter
        Title={"线下活动"}
        setDateRange={setDateRange}
        setIsHideState={setIsHideState}
      />

      {isHide ? (
        ""
      ) : (
        <>
          <PhotoCompetitionNavigationButton
            competitionName={competitionName}
            competitionNames={competitionNames}
            setNowCompetitionName={setNowCompetitionName}
          />
          <CollegeActivityRelatedData
            category={1}
            nowPage={props.nowPage}
            id={competitionID}
            begin={date.StartTime}
            end={date.EndTime}
          />
          <CollegeUserJoinTrend
            nowPage={props.nowPage}
            category={competitionCategory}
            id={competitionID}
            begin={date.StartTime}
            end={date.EndTime}
          />
          <CollegeUserSubmitTrend
            id={competitionID}
            begin={date.StartTime}
            end={date.EndTime}
            category={competitionCategory}
            nowPage={props.nowPage}
          />
          <CollegeUserRegisterTrend
            nowPage={props.nowPage}
            category={competitionCategory}
            id={competitionID}
            begin={date.StartTime}
            end={date.EndTime}
          />
        </>
      )}
    </div>
  );
}
