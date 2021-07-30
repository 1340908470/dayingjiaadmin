// @ts-nocheck
import React, { useState, useEffect } from "react";
import { call } from "@/util/client";
import analytics from "@/util/backend/analytics";
import { Pie } from "@ant-design/charts";
import { Row, Col, Table } from "antd";
import Loading from "@/component/layout/Loading";

interface UserPhotosProps {
  nowPage?: boolean;
  isMonthReport?: boolean;
  begin: string;
  end: string;
}

const defaultSplit = "30,25,20,15,10,5,1";
const littleSplit = "10,7,5,3,1";

export default function UserPhotos(props: UserPhotosProps) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [split, setSplit] = useState(defaultSplit);

  useEffect(() => {
    setLoading(true);
    asyncFetch();
  }, [props.begin, split]);

  useEffect(() => {
    setSplit(defaultSplit);
  }, [props.begin]);
  const asyncFetch = () => {
    if (props.begin && props.end) {
      call(analytics.UserPhoto, {
        begin: props.begin,
        end: props.end,
        split: split,
      }).then((r) => {
        // @ts-ignore
        let tmpData = [];
        // @ts-ignore
        let tmpDataTable = [];

        if (r) {
          r.forEach((value, index) => {
            let str = "";
            if (index == 0) {
              str = value.作品数量 + "张以上";
            } else if (index == r.length - 1) {
              str = "1张";
            } else {
              str = value.作品数量 + 1 + "-" + r[index - 1].作品数量 + "张";
            }
            tmpData.push({
              key: index,
              type: str,
              value: value.用户数,
            });

            tmpDataTable.push({
              key: index,
              work: str,
              num: value.用户数,
              percent: value.占比 + "%",
            });
          });
          if (
            r[0].占比 === 0 &&
            r[1].占比 === 0 &&
            r[2].占比 === 0 &&
            split === defaultSplit
          ) {
            setSplit(littleSplit);
          }
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
      title: "作品数",
      dataIndex: "work",
      key: "work",
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
        用户发布作品数分布
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
