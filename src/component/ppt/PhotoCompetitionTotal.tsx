/*
 * 页面：来源分析
 * */

import "../chart/default.css";
import { useEffect, useRef, useState } from "react";
import DateRangeFilter, { DateRange } from "@/component/filter/DateRangeFilter";
import { exportComponentAsPNG } from "react-component-export-image";
import { call } from "@/util/client";
import analytics from "@/util/backend/analytics";
import PhotoCompetitionNavigationButton from "@/component/navigation/PhotoCompetitionNavigationButton";
import CompetitionRelatedData from "@/component/chart/CompetitionRelatedData";
import UserContributionsTrend from "@/component/chart/UserContributionsTrend";
import CompetitionChannel from "@/component/chart/CompetitionChannel";

interface PhotoCompetitionTotalProps {
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
  const [totalCompetition, setTotalCompetition] = useState([] as Competition[]);

  useEffect(() => {
    call(analytics.TotalCompetition, {
      begin: props.begin,
      end: props.begin,
    }).then((r) => {
      setTotalCompetition(r);
    });
  }, [date.StartTime]);

  return (
    <div style={{}}>
      {totalCompetition.map((value, index) => {
        return (
          <div key={index}>
            <CompetitionRelatedData
              isMonthReport={true}
              id={value.id}
              begin={props.begin}
              end={props.end}
            />
            <UserContributionsTrend
              isMonthReport={true}
              id={value.id}
              begin={props.begin}
              end={props.end}
            />
            <CompetitionChannel
              isMonthReport={true}
              id={value.id}
              begin={props.begin}
              end={props.end}
            />
          </div>
        );
      })}
    </div>
  );
}
