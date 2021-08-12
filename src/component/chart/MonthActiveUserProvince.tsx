import React, { useState, useEffect } from "react";
import { Table, Tag, Space } from "antd";
import { call } from "@/util/client";
import analytics from "@/util/backend/analytics";
import "./default.css";
import Loading from "@/component/layout/Loading";

const columns = [
  {
    title: "省份",
    dataIndex: "province",
    key: "province",
  },
  {
    title: "用户数",
    dataIndex: "num",
    key: "num",
  },
  {
    title: "环比增加",
    dataIndex: "percent",
    key: "percent",
  },
];

interface MonthActiveUserProvinceProps {
  nowPage?: boolean;
  isMonthReport?: boolean;
  begin: string;
  end: string;
}

export default function MonthActiveUserProvince(
  props: MonthActiveUserProvinceProps
) {
  const [loading, setLoading] = useState(true);
  let [data, setData] = useState([]);

  const getRowClassName = (record: any, index: number) => {
    let className = "";
    className = index % 2 === 0 ? "table-odd" : "table-even";
    if (index === 0) className = "table-deep-red";
    if (index === 1 || index === 2) className = "table-light-red";
    return className;
  };

  useEffect(() => {
    setLoading(true);
    asyncFetch();
  }, [props.begin, props.end]);

  const asyncFetch = () => {
    if (props.begin && props.end) {
      call(analytics.UserProvince, {
        begin: props.begin,
        end: props.end,
      }).then((r) => {
        // @ts-ignore
        let tmpData = [];
        let sum = 0;
        if (r.活跃用户地区分布) {
          r.活跃用户地区分布.forEach((value) => {
            sum += Number.parseInt(value.amount);
          });
        }

        if (r.活跃用户地区分布) {
          for (let index = 0; index < r.活跃用户地区分布.length; index++) {
            if (index > 9) break;
            tmpData.push({
              key: index,
              province: r.活跃用户地区分布[index].name,
              num: r.活跃用户地区分布[index].amount,
              percent:
                (
                  (Number.parseInt(r.活跃用户地区分布[index].amount) / sum) *
                  100
                ).toFixed(2) + "%",
            });
          }
        }
        // @ts-ignore
        setData(tmpData);
        if (data) setLoading(false);
      });
    }
  };

  return (
    <>
      <div className={props.isMonthReport ? "chart-card-ppt" : "chart-card"}>
        <div
          hidden={props.nowPage}
          className={props.isMonthReport ? "chart-title-ppt" : "card-title"}
        >
          访问用户地区分布
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
