// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Table, Tag, Space } from "antd";
import { call } from "@/util/client";
import analytics from "@/util/backend/analytics";
import "./default.css";
import style from "./default.css";
import Loading from "@/component/layout/Loading";

const columns = [
  {
    title: "礼品名称",
    dataIndex: "礼品名称",
    key: "礼品名称",
    width: "40%",
  },
  {
    title: "上架时间",
    dataIndex: "上架时间",
    key: "上架时间",
    sorter: {
      compare: (a, b) => {
        let aTimes = a.上架时间.split(" ")[0].split("-");
        let bTimes = b.上架时间.split(" ")[0].split("-");
        let aNum = aTimes[0] * 1000000 + aTimes[1] * 1000 + aTimes[2];
        let bNum = bTimes[0] * 1000000 + bTimes[1] * 1000 + bTimes[2];
        return aNum - bNum;
      },
      multiple: 3,
    },
  },
  {
    title: "访问次数",
    dataIndex: "访问次数",
    key: "访问次数",
    sorter: {
      compare: (a, b) => {
        let aNum = Number.parseInt(a.访问次数);
        let bNum = Number.parseInt(b.访问次数);
        return aNum - bNum;
      },
      multiple: 4,
    },
  },
];

interface ShopInfoFreeCourseProps {
  isMonthReport?: boolean;
  begin: string;
  end: string;
}

export default function ShopInfoFreeCourse(props: ShopInfoFreeCourseProps) {
  let [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    asyncFetch();
  }, [props.begin]);

  const asyncFetch = () => {
    if (props.begin && props.end) {
      call(analytics.ShopInfoFreeCourse, {
        category: "免费课程",
        begin: props.begin,
        end: props.end,
      }).then((r) => {
        setData(r);
        if (data) setLoading(false);
      });
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Table
          pagination={{ pageSize: 10 }}
          dataSource={data}
          columns={columns}
        />
      )}
    </>
  );
}
