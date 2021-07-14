// @ts-nocheck
import React, { useState, useEffect } from "react";
import { call } from "@/util/client";
import analytics from "@/util/backend/analytics";
import { Pie } from "@ant-design/charts";
import { Row, Col, Table } from "antd";

interface NewUserAgeProps {
  begin: string;
  end: string;
}

export default function NewUserAge(props: NewUserAgeProps) {
  const [data, setData] = useState([]);
  useEffect(() => {
    asyncFetch();
  }, [props]);
  const asyncFetch = () => {
    call(analytics.UserAge, {
      begin: props.begin,
      end: props.end,
    }).then((r) => {
      // @ts-ignore
      let tmpData = [];
      // @ts-ignore
      let tmpDataTable = [];

      let sum = 0;
      if (r.新用户年龄分布) {
        r.新用户年龄分布.forEach((value) => {
          sum += Number.parseInt(value.amount);
        });
      }

      if (r.新用户年龄分布) {
        r.新用户年龄分布.forEach((value, index) => {
          tmpData.push({
            key: index,
            type: value.name,
            value: Number.parseInt(value.amount),
          });

          tmpDataTable.push({
            key: index,
            age: value.name,
            num: value.amount,
            percent: (Number.parseInt(value.amount) / sum).toFixed(2),
          });
        });
      }
      // @ts-ignore
      setData(tmpData);
      // @ts-ignore
      setTableData(tmpDataTable);
    });
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
    <div className={"chart-card"}>
      <div className={"card-title"}>活跃用户性别分布</div>
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
              pagination={false}
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
