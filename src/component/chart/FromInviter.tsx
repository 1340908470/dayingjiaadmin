// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Table, Tag, Space } from "antd";
import { call } from "@/util/client";
import analytics from "@/util/backend/analytics";
import "./default.css";
import style from "./default.css";
import Loading from "@/component/layout/Loading";

interface FromInviterProps {
  isMonthReport?: boolean;
  begin: string;
  end: string;
}

export default function FromInviter(props: FromInviterProps) {
  const [loading, setLoading] = useState(true);
  let [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    asyncFetch();
  }, [props.begin]);

  const asyncFetch = () => {
    if (props.begin && props.end) {
      call(analytics.FromInviter, {
        begin: props.begin,
        end: props.end,
      }).then((r) => {
        // @ts-ignore
        let tmpData = [];
        // @ts-ignore
        if (r) {
          r.forEach((value, index) => {
            // @ts-ignore
            tmpData.push({
              key: index,
              person: value.特邀影家,
              num: value.amount,
              percent: value.占比,
            });
          });
        }
        // @ts-ignore
        setData(tmpData);
        if (data) setLoading(false);
      });
    }
  };

  const columns = [
    {
      title: "特邀影家",
      dataIndex: "person",
      key: "person",
    },
    {
      title: "访问次数",
      dataIndex: "num",
      key: "num",
    },
    {
      title: "占比",
      dataIndex: "percent",
      key: "percent",
    },
  ];

  return (
    <>
      <div className={props.isMonthReport ? "chart-card-ppt" : "chart-card"}>
        <div className={props.isMonthReport ? "chart-title-ppt" : "card-title"}>
          来自特邀影家渠道访问详情
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className={props.isMonthReport ? "inside-chart-ppt" : ""}>
            <Table pagination={false} dataSource={data} columns={columns} />
          </div>
        )}
      </div>
    </>
  );
}
