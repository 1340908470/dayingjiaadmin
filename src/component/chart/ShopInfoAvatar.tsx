// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Table, Tag, Space } from "antd";
import { call } from "@/util/client";
import analytics from "@/util/backend/analytics";
import "./default.css";
import style from "./default.css";

const columns = [
  {
    title: "礼品名称",
    dataIndex: "礼品名称",
    key: "礼品名称",
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
    title: "兑换次数",
    dataIndex: "兑换次数",
    key: "兑换次数",
    sorter: {
      compare: (a, b) => {
        let aNum = a.兑换次数;
        let bNum = b.兑换次数;
        return aNum - bNum;
      },
      multiple: 4,
    },
  },
  {
    title: "兑换积分",
    dataIndex: "兑换积分",
    key: "兑换积分",
    sorter: {
      compare: (a, b) => {
        let aNum = a.兑换积分;
        let bNum = b.兑换积分;
        return aNum - bNum;
      },
      multiple: 4,
    },
  },
];

interface ShopInfoFreeAvatarProps {
  isMonthReport?: boolean;
  begin: string;
  end: string;
}

export default function ShopInfoAvatar(props: ShopInfoFreeAvatarProps) {
  let [data, setData] = useState([]);

  useEffect(() => {
    if (data.length === 0) asyncFetch();
  }, [props.begin]);

  const asyncFetch = () => {
    if (props.begin && props.end) {
      call(analytics.ShopInfoAvatar, {
        category: "头像挂件",
        begin: props.begin,
        end: props.end,
      }).then((r) => {
        setData(r);
      });
    }
  };

  return (
    <>
      <Table pagination={false} dataSource={data} columns={columns} />
    </>
  );
}
