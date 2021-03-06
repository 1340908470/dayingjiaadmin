// @ts-nocheck
import React, { useState, useEffect } from "react";
import { call } from "@/util/client";
import analytics from "@/util/backend/analytics";
import { Pie } from "@ant-design/charts";
import { Row, Col, Table } from "antd";
import Loading from "@/component/layout/Loading";

interface ActiveUserAgeProps {
  nowPage?: boolean;
  isMonthReport?: boolean;
  begin: string;
  end: string;
}

export default function ActiveUserAge(props: ActiveUserAgeProps) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    setLoading(true);
    asyncFetch();
  }, [props.begin, props.end]);
  const asyncFetch = () => {
    call(analytics.UserAge, {
      begin: props.begin,
      end: props.end,
    }).then((r) => {
      let tmpData = [];
      let tmpDataTable = [];

      let sum = 0;
      if (r.活跃用户年龄分布) {
        r.活跃用户年龄分布.forEach((value) => {
          sum += Number.parseInt(value.amount);
        });
      }

      if (r.活跃用户年龄分布) {
        r.活跃用户年龄分布.forEach((value, index) => {
          tmpData.push({
            key: index,
            type: value.name,
            value: Number.parseInt(value.amount),
          });

          tmpDataTable.push({
            key: index,
            age: value.name,
            num: value.amount,
            percent:
              ((Number.parseInt(value.amount) / sum) * 100).toFixed(2) + "%",
          });
        });
      }
      setData(tmpData);
      setTableData(tmpDataTable);
      if (data && tableData) setLoading(false);
    });
  };

  var config = {
    padding: [10, 10, 100, 10],
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
      title: "年龄",
      dataIndex: "age",
      key: "age",
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
      <div
        hidden={props.nowPage}
        className={props.isMonthReport ? "chart-title-ppt" : "card-title"}
      >
        访问用户年龄分布
      </div>
      {loading ? (
        <Loading />
      ) : (
        <Row className={props.isMonthReport ? "inside-chart-ppt" : ""}>
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
                pagination={false}
                dataSource={tableData}
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
