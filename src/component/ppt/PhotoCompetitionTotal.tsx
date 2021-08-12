/*
 * 页面：来源分析
 * */

import "../chart/default.css";
import { useEffect, useRef, useState } from "react";
import DateRangeFilter, { DateRange } from "@/component/filter/DateRangeFilter";
import { exportComponentAsPNG } from "react-component-export-image";
import { call } from "@/util/client";
import analytics, { CompetitionSimple } from "@/util/backend/analytics";
import PhotoCompetitionNavigationButton from "@/component/navigation/PhotoCompetitionNavigationButton";
import CompetitionRelatedData from "@/component/chart/CompetitionRelatedData";
import UserContributionsTrend from "@/component/chart/UserContributionsTrend";
import CompetitionChannel from "@/component/chart/CompetitionChannel";
import PPTCover from "@/component/ppt/PPTCover";
import { data } from "browserslist";
import NewUserRegister from "@/component/chart/NewUserRegister";

interface PhotoCompetitionTotalProps {
  nowPage: string;
  isMonthReport?: boolean;
  begin: string;
  end: string;
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

export default function PhotoCompetitionTotal(
  props: PhotoCompetitionTotalProps
) {
  const [date, setDate] = useState({} as DateRange);
  const [totalCompetition, setTotalCompetition] = useState(
    [] as CompetitionSimple[]
  );

  useEffect(() => {
    call(analytics.CompetitionList, {
      begin: props.begin,
      end: props.end,
    }).then((r) => {
      setTotalCompetition(r);
    });
  }, [props.begin, props.end]);

  return (
    <div style={{}}>
      {totalCompetition.map((value, index) => {
        return (
          <div key={index}>
            <div>
              <PPTCover
                nowPage={props.nowPage}
                begin={props.begin}
                end={props.end}
                title={"活动比赛"}
                title2={value.name}
              />
            </div>

            <CompetitionRelatedData
              category={value.category}
              nowPage={props.nowPage}
              isMonthReport={true}
              name={value.name}
              id={value.id}
              begin={props.begin}
              end={props.end}
            />
            <UserContributionsTrend
              nowPage={props.nowPage}
              category={value.category}
              isMonthReport={true}
              name={value.name}
              id={value.id}
              begin={props.begin}
              end={props.end}
            />
            <NewUserRegister
              nowPage={props.nowPage}
              category={value.category}
              isMonthReport={true}
              name={value.name}
              id={value.id}
              begin={props.begin}
              end={props.end}
            />
            <CompetitionChannel
              nowPage={props.nowPage}
              isMonthReport={true}
              name={value.name}
              id={value.id}
              category={value.category}
              begin={props.begin}
              end={props.end}
            />
          </div>
        );
      })}
    </div>
  );
}
