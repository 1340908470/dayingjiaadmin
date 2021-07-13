import React, { useState, useEffect } from "react";
import { Table, Tag, Space } from "antd";
import { call } from "@/util/client";
import analytics from "@/util/backend/analytics";
import "./default.css";
import { Area } from "@ant-design/charts";

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
  },
];

interface NewPhotoByDayProps {
  begin: string;
  end: string;
}

export default function NewPhotoByDay(props: NewPhotoByDayProps) {
  const [data, setData] = useState([]);
  useEffect(() => {
    asyncFetch();
  }, [props]);
  const asyncFetch = () => {
    call(analytics.NewPhotoByDay, {
      begin: props.begin,
      end: props.end,
    }).then((r) => {
      // @ts-ignore
      setData(r);
      // if (data.length === 0) {
      //     // @ts-ignore
      //     setData(r)
      // }
    });
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
    xAxis: { tickCount: 5 },
  };
  // @ts-ignore
  return (
    <div>
      <div className={"card-title"}>新增作品数</div>{" "}
      <div className={"chart-card"}>
        {" "}
        <Area {...config} />{" "}
      </div>{" "}
    </div>
  );
}
