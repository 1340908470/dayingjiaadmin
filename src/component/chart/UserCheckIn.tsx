// @ts-nocheck
import React, { useState, useEffect } from "react";
import { call } from "@/util/client";
import analytics from "@/util/backend/analytics";
import { Pie } from "@ant-design/charts";
import { Row, Col, Table } from "antd";
import Loading from "@/component/layout/Loading";

interface ActiveUserAgeProps {
  isMonthReport?: boolean;
  begin: string;
  end: string;
}

export default function UserCheckIn(props: ActiveUserAgeProps) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    setLoading(true);
    asyncFetch();
  }, [props.begin]);
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
        if (r.用户签到分布) {
          sum += r.用户签到分布["0"];
          sum += r.用户签到分布["1"];
          sum += r.用户签到分布["2"];
          sum += r.用户签到分布["3"];
          sum += r.用户签到分布["4"];
          sum += r.用户签到分布["5"];
          sum += r.用户签到分布["6"];
          sum += r.用户签到分布["7"];
        }

        if (r.用户签到分布) {
          tmpData.push(
            {
              key: 0,
              type: "签到0次",
              value: r.用户签到分布["0"],
            },
            {
              key: 1,
              type: "签到1次",
              value: r.用户签到分布["1"],
            },
            {
              key: 2,
              type: "签到2次",
              value: r.用户签到分布["2"],
            },
            {
              key: 3,
              type: "签到3次",
              value: r.用户签到分布["3"],
            },
            {
              key: 4,
              type: "签到4次",
              value: r.用户签到分布["4"],
            },
            {
              key: 5,
              type: "签到5次",
              value: r.用户签到分布["5"],
            },
            {
              key: 6,
              type: "签到6次",
              value: r.用户签到分布["6"],
            },
            {
              key: 7,
              type: "签到7次",
              value: r.用户签到分布["7"],
            }
          );

          tmpDataTable.push(
            {
              key: 0,
              times: "签到0次",
              num: r.用户签到分布["0"],
              percent: (r.用户签到分布["0"] / sum).toFixed(2),
            },
            {
              key: 1,
              times: "签到1次",
              num: r.用户签到分布["1"],
              percent: (r.用户签到分布["1"] / sum).toFixed(2),
            },
            {
              key: 2,
              times: "签到2次",
              num: r.用户签到分布["2"],
              percent: (r.用户签到分布["2"] / sum).toFixed(2),
            },
            {
              key: 3,
              times: "签到3次",
              num: r.用户签到分布["3"],
              percent: (r.用户签到分布["3"] / sum).toFixed(2),
            },
            {
              key: 4,
              times: "签到4次",
              num: r.用户签到分布["4"],
              percent: (r.用户签到分布["4"] / sum).toFixed(2),
            },
            {
              key: 5,
              times: "签到5次",
              num: r.用户签到分布["5"],
              percent: (r.用户签到分布["5"] / sum).toFixed(2),
            },
            {
              key: 6,
              times: "签到6次",
              num: r.用户签到分布["6"],
              percent: (r.用户签到分布["6"] / sum).toFixed(2),
            },
            {
              key: 7,
              times: "签到7次",
              num: r.用户签到分布["7"],
              percent: (r.用户签到分布["7"] / sum).toFixed(2),
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
      title: "签到次数",
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
        用户签到分布
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
