// @ts-nocheck
import React, { useState, useEffect } from "react";
import { call } from "@/util/client";
import analytics from "@/util/backend/analytics";
import { Pie } from "@ant-design/charts";
import { Row, Col, Table } from "antd";
import Loading from "@/component/layout/Loading";
import "./default.css";

interface UserAccessProps {
  nowPage?: boolean;
  isMonthReport?: boolean;
  begin: string;
  end: string;
}

export default function UserAccessByChannel(props: UserAccessProps) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    setLoading(true);
    asyncFetch();
  }, [props.begin, props.end]);
  const asyncFetch = () => {
    if (props.begin && props.end) {
      call(analytics.UserAccessByChannel, {
        begin: props.begin,
        end: props.end,
      }).then((r) => {
        // @ts-ignore
        let tmpData = [];
        // @ts-ignore
        let tmpDataTable = [];
        if (r) {
          r.sort((a, b) => b.占比 - a.占比);
          r.forEach((value, index) => {
            tmpData.push({
              key: index,
              type: value.来源,
              value: value.访问次数,
            });

            tmpDataTable.push({
              key: index,
              source: value.来源,
              num: value.访问次数,
              percent: value.占比 + "%",
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
    padding: [10, 10, 130, 10],
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
      title: "来源",
      dataIndex: "source",
      key: "source",
      width: "40%",
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
  const [tableData, setTableData] = useState([]);

  // @ts-ignore}
  return (
    <div className={props.isMonthReport ? "chart-card-ppt" : "chart-card"}>
      <div
        hidden={props.nowPage}
        className={props.isMonthReport ? "chart-title-ppt" : "card-title"}
      >
        不同来源访问次数
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className={props.isMonthReport ? "chart-title-ppt" : ""}>
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
                  // rowClassName={getRowClassName}
                  size={props.isMonthReport ? "small" : ""}
                  pagination={props.isMonthReport ? false : { pageSize: 5 }}
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
