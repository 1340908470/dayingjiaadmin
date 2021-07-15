// @ts-nocheck
import React, { useState, useEffect } from "react";
import { call } from "@/util/client";
import analytics from "@/util/backend/analytics";
import { Pie } from "@ant-design/charts";
import { Row, Col, Table } from "antd";
import echarts from "echarts";
import ChinaMap from "@/component/chart/ChinaMap";
import auth from "@/util/backend/auth";

interface ActiveUserProvinceProps {
  begin: string;
  end: string;
}

export default function ActiveUserProvince(props: ActiveUserProvinceProps) {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, [props.begin]);

  const asyncFetch = () => {
    if (props.begin && props.end) {
      call(analytics.UserProvince, {
        begin: props.begin,
        end: props.end,
      }).then((r) => {
        let tmpData = [];
        let tmpDataTable = [];

        let sum = 0;
        if (r.活跃用户地区分布) {
          r.活跃用户地区分布.forEach((value) => {
            sum += Number.parseInt(value.amount);
          });
        }

        if (r.活跃用户地区分布) {
          r.活跃用户地区分布.forEach((value, index) => {
            tmpData.push({
              key: index,
              name: value.name,
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
        setData(tmpData);
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

  return (
    <div className={"chart-card"}>
      <div className={"card-title"}>活跃用户地区分布</div>
      <br />
      <Row>
        <Col span={11}>
          <ChinaMap uid={"ActiveUserProvince"} cityData={data} />
        </Col>
        <Col flex={"auto"} />
        <Col
          flex={"2px"}
          style={{
            backgroundColor: "#DDDDDD",
            marginLeft: "2px",
            marginRight: "20px",
          }}
        />
        <Col span={10}>
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
