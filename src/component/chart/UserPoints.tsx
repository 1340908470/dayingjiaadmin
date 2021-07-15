// @ts-nocheck
import React, { useState, useEffect } from "react";
import { call } from "@/util/client";
import analytics from "@/util/backend/analytics";
import { Pie } from "@ant-design/charts";
import { Row, Col, Table } from "antd";

interface UserPointsProps {
  begin: string;
  end: string;
}

export default function UserPoints(props: UserPointsProps) {
  const [data, setData] = useState([]);
  useEffect(() => {
    asyncFetch();
  }, [props]);
  const asyncFetch = () => {
    if (props.begin && props.end) {
      call(analytics.Mine, {
        point: "141,121,101,81,61,41,21,0",
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
              percent: (r.用户获取积分分布["141"] / sum).toFixed(2),
            },
            {
              key: 1,
              times: "121-140",
              num: r.用户获取积分分布["121"],
              percent: (r.用户获取积分分布["121"] / sum).toFixed(2),
            },
            {
              key: 2,
              times: "101-120",
              num: r.用户获取积分分布["101"],
              percent: (r.用户获取积分分布["101"] / sum).toFixed(2),
            },
            {
              key: 3,
              times: "81-100",
              num: r.用户获取积分分布["81"],
              percent: (r.用户获取积分分布["81"] / sum).toFixed(2),
            },
            {
              key: 4,
              times: "61-80",
              num: r.用户获取积分分布["61"],
              percent: (r.用户获取积分分布["61"] / sum).toFixed(2),
            },
            {
              key: 5,
              times: "41-60",
              num: r.用户获取积分分布["41"],
              percent: (r.用户获取积分分布["41"] / sum).toFixed(2),
            },
            {
              key: 6,
              times: "21-40",
              num: r.用户获取积分分布["21"],
              percent: (r.用户获取积分分布["21"] / sum).toFixed(2),
            },
            {
              key: 7,
              times: "1-20",
              num: r.用户获取积分分布["0"],
              percent: (r.用户获取积分分布["0"] / sum).toFixed(2),
            }
          );
        }
        // @ts-ignore
        setData(tmpData);
        // @ts-ignore
        setTableData(tmpDataTable);
      });
    }
  };

  var config = {
    appendPadding: 10,
    data: data,
    angleField: "value",
    colorField: "type",
    color: [
      "#FD3D3B",
      "#FD5254",
      "#FD7374",
      "#FE9292",
      "#FEB1B2",
      "#FED3D3",
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
    <div className={"chart-card"}>
      <div className={"card-title"}>用户获取积分分布</div>
      <br />
      <Row>
        <Col span={11}>
          <Pie {...config} />
        </Col>
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
              pagination={{ pageSize: 6 }} //自定义每页显示的数据条数
              dataSource={tableData}
              columns={columns}
              bordered={false}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}
