// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Table, Tag, Space } from "antd";
import { call } from "@/util/client";
import analytics from "@/util/backend/analytics";
import "./default.css";
import style from "./default.css";
import Loading from "@/component/layout/Loading";
import { getRowClassName } from "@/component/chart/MonthActiveUserProvince";

interface FromInviterProps {
  nowPage?: boolean;
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
          r.sort((a, b) => b.占比 - a.占比);
          r.forEach((value, index) => {
            // @ts-ignore
            tmpData.push({
              key: index,
              person: value.特邀影家,
              num: value.amount,
              percent: value.占比 + "%",
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

  const getRowClassName = (record: any, index: number) => {
    let className = "";
    className = index % 2 === 0 ? "table-odd" : "table-even";
    if (index === 0) className = "table-deep-red";
    if (index === 1 || index === 2) className = "table-light-red";
    return className;
  };

  return (
    <>
      <div className={props.isMonthReport ? "chart-card-ppt" : "chart-card"}>
        <div
          hidden={props.nowPage}
          className={props.isMonthReport ? "chart-title-ppt" : "card-title"}
        >
          来自特邀影家渠道访问详情
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className={props.isMonthReport ? "inside-chart-ppt" : ""}>
            <Table
              rowClassName={getRowClassName}
              pagination={false}
              dataSource={data}
              columns={columns}
            />
          </div>
        )}
      </div>
    </>
  );
}
