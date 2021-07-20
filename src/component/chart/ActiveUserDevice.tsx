// @ts-nocheck
import React, { useState, useEffect } from "react";
import { call } from "@/util/client";
import analytics from "@/util/backend/analytics";
import { Pie } from "@ant-design/charts";
import { Row, Col, Table } from "antd";
import Loading from "@/component/layout/Loading";

interface ActiveUserDeviceProps {
  isMonthReport?: boolean;
  begin: string;
  end: string;
}

export default function ActiveUserDevice(props: ActiveUserDeviceProps) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    setLoading(true);
    asyncFetch();
  }, [props.begin]);
  const asyncFetch = () => {
    if (props.begin && props.end) {
      call(analytics.UserPlatform, {
        begin: props.begin,
        end: props.end,
      }).then((r) => {
        let tmpData = [];
        let tmpDataTable = [];

        let sum = 0;
        if (r.活跃用户终端分布) {
          r.活跃用户终端分布.forEach((value) => {
            sum += Number.parseInt(value.amount);
          });
        }

        if (r.活跃用户终端分布) {
          r.活跃用户终端分布.forEach((value, index) => {
            tmpData.push({
              key: index,
              type: value.name,
              value: Number.parseInt(value.amount),
            });

            tmpDataTable.push({
              key: index,
              device: value.name,
              num: value.amount,
              percent:
                ((Number.parseInt(value.amount) / sum) * 100).toFixed(2) + "%",
            });
          });
        }
        setData(tmpData);
        if (data) setLoading(false);
        setTableData(tmpDataTable);
      });
    }
  };

  var config = {
    padding: [10, 20, 150, 20],
    data: data,
    angleField: "value",
    colorField: "type",
    color: ["#FD3D3B", "#FE9292", "#FEB1B2", "#FED3D3", "#DDDDDD"],
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
      title: "终端",
      dataIndex: "device",
      key: "device",
      width: "40%",
    },
    {
      title: "用户数",
      dataIndex: "num",
      key: "num",
      width: "30%",
    },
    {
      title: "占比",
      dataIndex: "percent",
      key: "percent",
    },
  ];

  const [tableData, setTableData] = useState([]);

  return (
    <div className={props.isMonthReport ? "chart-card-ppt" : "chart-card"}>
      <div className={props.isMonthReport ? "chart-title-ppt" : "card-title"}>
        访问用户终端分布
      </div>
      <br />
      {loading ? (
        <Loading />
      ) : (
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
                dataSource={
                  props.isMonthReport ? tableData.slice(0, 9) : tableData
                }
                columns={columns}
                pagination={false}
                bordered={false}
              />
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
}
