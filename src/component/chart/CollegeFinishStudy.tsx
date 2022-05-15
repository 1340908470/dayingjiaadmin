// @ts-nocheck
import React, { useState, useEffect } from "react";
import { call } from "@/util/client";
import analytics from "@/util/backend/analytics";
import { Area, Pie } from "@ant-design/charts";
import { Row, Col, Table } from "antd";
import Loading from "@/component/layout/Loading";
import eosanalytics from "@/util/backend/eosanalytics";

interface ActiveUserAgeProps {
  nowPage?: boolean;
  isMonthReport?: boolean;
  begin: string;
  end: string;
}

export default function CollegeFinishStudy(props: ActiveUserAgeProps) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    asyncFetch();
  }, [props.begin, props.end]);
  const asyncFetch = () => {
    if (props.begin && props.end) {
      call(eosanalytics.UserSection, {
        begin: props.begin,
        end: props.end,
      }).then((r) => {
        // @ts-ignore
        let tmpData = [];
        // @ts-ignore
        let tmpDataTable = [];

        if (r.佳上院 != undefined) {
          tmpData.push({
            key: 0,
            type: "佳上院",
            value: r.佳上院.用户数,
          });
          tmpDataTable.push({
            key: 0,
            band: "佳上院",
            num: r.佳上院.用户数,
            percent: r.佳上院.占比.toFixed(2) + "%",
          });
        }

        if (r.佳御院 != undefined) {
          tmpData.push({
            key: 0,
            type: "佳御院",
            value: r.佳御院.用户数,
          });
          tmpDataTable.push({
            key: 0,
            band: "佳御院",
            num: r.佳御院.用户数,
            percent: r.佳御院.占比.toFixed(2) + "%",
          });
        }

        if (r.实践 != undefined) {
          tmpData.push({
            key: 0,
            type: "实践",
            value: r.实践.用户数,
          });
          tmpDataTable.push({
            key: 0,
            band: "实践",
            num: r.实践.用户数,
            percent: r.实践.占比.toFixed(2) + "%",
          });
        }

        if (r.活动 != undefined) {
          tmpData.push({
            key: 0,
            type: "活动",
            value: r.活动.用户数,
          });
          tmpDataTable.push({
            key: 0,
            band: "活动",
            num: r.活动.用户数,
            percent: r.活动.占比.toFixed(2) + "%",
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
      title: "称号",
      dataIndex: "band",
      key: "band",
      width: "40%",
    },
    {
      title: "用户数",
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
        完成学习的用户数分布
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
