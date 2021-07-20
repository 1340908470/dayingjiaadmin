// @ts-nocheck
import React, { useState, useEffect } from "react";
import { call } from "@/util/client";
import analytics from "@/util/backend/analytics";
import { Row, Col, Table } from "antd";
import ChinaMap from "@/component/chart/ChinaMap";
import Loading from "@/component/layout/Loading";

interface ActiveUserProvinceProps {
  isMonthReport?: boolean;
  begin: string;
  end: string;
}

export default function ActiveUserProvince(props: ActiveUserProvinceProps) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
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

  const columns = [
    {
      title: "省份",
      dataIndex: "age",
      key: "age",
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
        访问用户地区分布
      </div>
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
          {loading ? (
            <Loading />
          ) : (
            <div style={{ borderLeftWidth: "2px", marginBottom: "15px" }}>
              <Table
                dataSource={tableData}
                columns={columns}
                bordered={false}
                pagination={{ pageSize: 7 }}
              />
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}
