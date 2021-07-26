import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { call } from "@/util/client";
import analytics, { InviteKPI } from "@/util/backend/analytics";
import "./default.css";
import Loading from "@/component/layout/Loading";

interface PhotoTypeByMonthProps {
  nowPage?: boolean;
  isMonthReport?: boolean;
  begin: string;
  end: string;
}

export default function PhotoTypeByMonth(props: PhotoTypeByMonthProps) {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    asyncFetch();
  }, [props.begin]);

  const asyncFetch = () => {
    if (props.begin) {
      const timeString =
        props.begin.split("-")[0] + props.begin.split("-")[1] + "";

      call(analytics.PhotoTypeByMonth, {
        month: props.begin.split("-")[0] + "-" + props.begin.split("-")[1],
      }).then((r) => {
        let tmpData = [
          {
            统计项目: "参赛作品数",
            统计月: r.统计月.参赛,
            上次统计: r.上次统计.参赛,
            环比增长: r.环比增长.参赛,
          },
          {
            统计项目: "挑战作品数",
            统计月: r.统计月.挑战,
            上次统计: r.上次统计.挑战,
            环比增长: r.环比增长.挑战,
          },
          {
            统计项目: "圈子作品数",
            统计月: r.统计月.圈子,
            上次统计: r.上次统计.圈子,
            环比增长: r.环比增长.圈子,
          },
          {
            统计项目: "其它作品数",
            统计月: r.统计月.其它,
            上次统计: r.上次统计.其它,
            环比增长: r.环比增长.其它,
          },
        ];
        // @ts-ignore
        setData(tmpData);
        if (data) setLoading(false);
      });
    }
  };

  const columns = [
    {
      title: "统计项目",
      dataIndex: "统计项目",
      key: "统计项目",
    },
    {
      title: "统计月",
      dataIndex: "统计月",
      key: "统计月",
    },
    {
      title: "上次统计",
      dataIndex: "上次统计",
      key: "上次统计",
    },
    {
      title: "环比增长",
      dataIndex: "环比增长",
      key: "环比增长",
      render: (text: any, row: any, index: number) => {
        return (
          <div style={{}}>
            <div style={text > 100 ? { color: "red" } : { color: "green" }}>
              {text}%
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className={props.isMonthReport ? "chart-card-ppt" : "chart-card"}>
        <div
          hidden={props.nowPage}
          className={props.isMonthReport ? "chart-title-ppt" : "card-title"}
        >
          发布作品类型月度对比
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className={props.isMonthReport ? "inside-chart-ppt" : ""}>
            <Table pagination={false} dataSource={data} columns={columns} />
            <div
              style={{
                marginTop: "10px",
                color: "grey",
                fontSize: "8px",
                marginBottom: "10px",
              }}
            >
              ■ 环比增长：统计月数据/上个统计月的百分比
            </div>
          </div>
        )}
      </div>
    </>
  );
}
