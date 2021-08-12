// @ts-nocheck
import React, { useState, useEffect } from "react";
import { call } from "@/util/client";
import analytics from "@/util/backend/analytics";
import { Pie } from "@ant-design/charts";
import { Row, Col, Table } from "antd";
import Loading from "@/component/layout/Loading";

interface UserPointsProps {
  isMonthReport?: boolean;
  begin: string;
  end: string;
}

export default function UserPoints(props: UserPointsProps) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    asyncFetch();
  }, [props.begin, props.end]);
  const asyncFetch = () => {
    if (props.begin && props.end) {
      call(analytics.Mine, {
        point: "141,121,101,81,61,41,21",
        checkin: "7,6,5,4,3,2,1",
        begin: props.begin,
        end: props.end,
      }).then((r) => {
        // @ts-ignore
        let tmpData = [];
        // @ts-ignore
        let tmpDataTable = [];

        let sum = 0;
        if (r.用户获取积分分布) {
          sum += r.用户获取积分分布["141"];
          sum += r.用户获取积分分布["121"];
          sum += r.用户获取积分分布["101"];
          sum += r.用户获取积分分布["81"];
          sum += r.用户获取积分分布["61"];
          sum += r.用户获取积分分布["41"];
          sum += r.用户获取积分分布["21"];
          sum += r.用户获取积分分布["0"];
        }

        if (r.用户获取积分分布) {
          tmpData.push(
            {
              key: 0,
              type: "141以上",
              value: r.用户获取积分分布["141"],
            },
            {
              key: 1,
              type: "121-140",
              value: r.用户获取积分分布["121"],
            },
            {
              key: 2,
              type: "101-120",
              value: r.用户获取积分分布["101"],
            },
            {
              key: 3,
              type: "81-100",
              value: r.用户获取积分分布["81"],
            },
            {
              key: 4,
              type: "61-80",
              value: r.用户获取积分分布["61"],
            },
            {
              key: 5,
              type: "41-60",
              value: r.用户获取积分分布["41"],
            },
            {
              key: 6,
              type: "21-40",
              value: r.用户获取积分分布["21"],
            },
            {
              key: 7,
              type: "1-20",
              value: r.用户获取积分分布["0"],
            }
          );

          tmpDataTable.push(
            {
              key: 0,
              times: "141以上",
              num: r.用户获取积分分布["141"],
              percent:
                ((r.用户获取积分分布["141"] / sum) * 100).toFixed(2) + "%",
            },
            {
              key: 1,
              times: "121-140",
              num: r.用户获取积分分布["121"],
              percent:
                ((r.用户获取积分分布["121"] / sum) * 100).toFixed(2) + "%",
            },
            {
              key: 2,
              times: "101-120",
              num: r.用户获取积分分布["101"],
              percent:
                ((r.用户获取积分分布["101"] / sum) * 100).toFixed(2) + "%",
            },
            {
              key: 3,
              times: "81-100",
              num: r.用户获取积分分布["81"],
              percent:
                ((r.用户获取积分分布["81"] / sum) * 100).toFixed(2) + "%",
            },
            {
              key: 4,
              times: "61-80",
              num: r.用户获取积分分布["61"],
              percent:
                ((r.用户获取积分分布["61"] / sum) * 100).toFixed(2) + "%",
            },
            {
              key: 5,
              times: "41-60",
              num: r.用户获取积分分布["41"],
              percent:
                ((r.用户获取积分分布["41"] / sum) * 100).toFixed(2) + "%",
            },
            {
              key: 6,
              times: "21-40",
              num: r.用户获取积分分布["21"],
              percent:
                ((r.用户获取积分分布["21"] / sum) * 100).toFixed(2) + "%",
            },
            {
              key: 7,
              times: "1-20",
              num: r.用户获取积分分布["0"],
              percent: ((r.用户获取积分分布["0"] / sum) * 100).toFixed(2) + "%",
            }
          );
        }
        // @ts-ignore
        setData(tmpData);
        if (data) setLoading(false);
        // @ts-ignore
        setTableData(tmpDataTable);
      });
    }
  };

  var config = {
    padding: [10, 10, 100, 10],
    data: data,
    angleField: "value",
    colorField: "type",
    color: [
      "#FD3D3B",
      "#fa4b4d",
      "#fc6b6c",
      "#fd8686",
      "#fda3a4",
      "#fcb4b4",
      "#fcc8c8",
      "#fcdddd",
      "#fce5e5",
      "#DDDDDD",
    ],
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: "inner",
      offset: "-50%",
      content: "",
      style: {
        textAlign: "center",
        fontSize: 14,
      },
    },
    interactions: [{ type: "element-selected" }, { type: "element-active" }],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        content: "",
      },
    },
    legend: {
      marker: {
        symbol: "square",
      },
      flipPage: false,
      layout: "horizontal",
      position: "bottom",
    },
  };

  const columns = [
    {
      title: "获取积分数",
      dataIndex: "times",
      key: "times",
    },
    {
      title: "用户数",
      dataIndex: "num",
      key: "num",
    },
    {
      title: "占比",
      dataIndex: "percent",
      key: "percent",
    },
  ];

  const [tableData, setTableData] = useState([]);

  // @ts-ignore}
  return (
    <div className={props.isMonthReport ? "chart-card-ppt" : "chart-card"}>
      <div className={props.isMonthReport ? "chart-title-ppt" : "card-title"}>
        用户获取积分分布
      </div>
      <br />
      {loading ? (
        <Loading />
      ) : (
        <Row>
          <Col flex={"44%"}>
            <Pie {...config} />
          </Col>
          <Col flex={"20px"} />
          <Col
            flex={"2px"}
            style={{
              backgroundColor: "#DDDDDD",
              marginLeft: "2px",
              marginRight: "20px",
            }}
          />
          <Col flex={"auto"}>
            <div style={{ borderLeftWidth: "2px", marginBottom: "15px" }}>
              <Table
                dataSource={tableData}
                pagination={false}
                columns={columns}
                bordered={false}
              />
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
}
