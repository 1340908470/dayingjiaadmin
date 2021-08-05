// @ts-nocheck
import React, { useState, useEffect } from "react";
import { call } from "@/util/client";
import analytics from "@/util/backend/analytics";
import { Area, Pie } from "@ant-design/charts";
import { Row, Col, Table } from "antd";
import Loading from "@/component/layout/Loading";

interface ActiveUserAgeProps {
  nowPage?: boolean;
  isMonthReport?: boolean;
  begin: string;
  end: string;
}

export default function PhotoEquipment(props: ActiveUserAgeProps) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    asyncFetch();
  }, [props.begin]);
  const asyncFetch = () => {
    if (props.begin && props.end) {
      call(analytics.PhotoEquipment, {
        begin: props.begin,
        end: props.end,
      }).then((r) => {
        // @ts-ignore
        let tmpData = [];
        // @ts-ignore
        let tmpDataTable = [];

        let sum = 0;
        if (r) {
          r.forEach((value) => {
            sum += value.amount;
          });
        }

        if (r) {
          r.forEach((value, index) => {
            tmpData.push({
              key: index,
              type: value.name,
              value: value.amount,
            });

            tmpDataTable.push({
              key: index,
              band: value.name,
              num: value.amount,
              percent: ((value.amount / sum) * 100).toFixed(2) + "%",
            });
          });
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
      title: "品牌",
      dataIndex: "band",
      key: "band",
      width: "40%",
    },
    {
      title: "作品数",
      dataIndex: "num",
      key: "num",
      width: "40%",
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
        作品拍摄器材分布
      </div>
      <br />

      {loading ? (
        <Loading />
      ) : (
        <div className={props.isMonthReport ? "inside-chart-ppt" : ""}>
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
                  size={props.isMonthReport ? "small" : ""}
                  pagination={props.isMonthReport ? false : { pageSize: 6 }}
                  dataSource={tableData}
                  columns={columns}
                  bordered={false}
                />
              </div>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}
