// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Table, Tag, Space } from "antd";
import { call } from "@/util/client";
import analytics from "@/util/backend/analytics";
import "./default.css";
import { Area } from "@ant-design/charts";
import Loading from "@/component/layout/Loading";

const columns = [
  {
    title: "表项",
    dataIndex: "content",
    key: "content",
  },
  {
    title: "统计",
    dataIndex: "num",
    key: "num",
    align: "right",
    className: "table-data",
  },
];

interface NewPhotoByDayProps {
  isMonthReport?: boolean;
  begin: string;
  end: string;
}

export default function NewPhotoByDay(props: NewPhotoByDayProps) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    setLoading(true);
    asyncFetch();
  }, [props.begin]);
  const asyncFetch = () => {
    if (props.begin && props.end) {
      call(analytics.NewPhotoByDay, {
        begin: props.begin,
        end: props.end,
      }).then((r) => {
        // @ts-ignore
        setData(r);

        if (data) setLoading(false);
      });
    }
  };
  let config = {
    point: {
      size: 4,
      color: "#FF3E3E",
    },
    label: {
      style: {
        fill: "black",
        opacity: 0.6,
        fontSize: 14,
      },
      offsetY: -5,
      rotate: false,
    },
    color: "#FF3E3E",
    smooth: true,
    data: data,
    xField: "日期",
    yField: "amount",
    yAxis: { tickCount: 5 },
    xAxis: { tickCount: data.length > 12 ? 12 : 7 },
  };
  return (
    <div>
      <div className={props.isMonthReport ? "chart-card-ppt" : "chart-card"}>
        <div className={props.isMonthReport ? "chart-title-ppt" : "card-title"}>
          新增作品数
        </div>

        {loading ? <Loading /> : <Area {...config} />}
      </div>
    </div>
  );
}
