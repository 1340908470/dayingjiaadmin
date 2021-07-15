import { Col, Row, Select, DatePicker } from "antd";
import { useEffect, useState } from "react";
import { call } from "@/util/client";
import pandect from "@/util/backend/analytics";

const { RangePicker } = DatePicker;
const { Option } = Select;

interface FilterProps {
  Title: string;
  setDateRange: (startTime: string, endTime: string) => void;
}

export interface DateRange {
  StartTime: string; // 2021-04-20
  EndTime: string; // 2021-05-19
}

export default function DateRangeFilter(props: FilterProps) {
  const [rangeMod, setRangeMod] = useState("上周");
  const [dateRange, setDateRange] = useState({} as DateRange);

  function setDateRangeByFailed(type: string) {
    const now = new Date();
    let date = new Date();
    if (type === "上周") {
      date = new Date(now.getTime() - 7 * 24 * 3600 * 1000);
    }
    if (type === "上个月") {
      date = new Date(now);
      date.setMonth(now.getMonth() - 1);
    }
    const year = date.getFullYear();
    const month = ("0" + date.getMonth()).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);

    const startTime = year + "-" + month + "-" + day;
    const endTime =
      now.getFullYear() +
      "-" +
      ("0" + now.getMonth()).slice(-2) +
      "-" +
      ("0" + now.getDate()).slice(-2);

    setDateRange({
      StartTime: startTime,
      EndTime: endTime,
    });

    props.setDateRange(startTime, endTime);
  }

  useEffect(() => {
    setDateRangeByFailed("上周");
  }, []);

  return (
    <>
      <Row className={"filter"}>
        <Col>
          <div className={"title"}>{props.Title}</div>
        </Col>
        <Col flex={"20px"} />
        <Col>
          <Select
            defaultValue="上周"
            style={{ width: 120 }}
            onChange={(value) => {
              setRangeMod(value);
              setDateRangeByFailed(value);
            }}
          >
            <Option value="上周">上周</Option>
            <Option value="上个月">上个月</Option>
            <Option value="自定义">自定义</Option>
          </Select>
        </Col>
        <Col flex={"20px"} />
        <Col hidden={rangeMod !== "自定义"}>
          <RangePicker
            onChange={(e) => {
              let StartTime = "";
              let EndTime = "";
              e?.forEach((r, i) => {
                if (i === 0) StartTime = r?.format("YYYY-MM-DD") || "";
                if (i === 1) EndTime = r?.format("YYYY-MM-DD") || "";
              });
              props.setDateRange(StartTime, EndTime);
            }}
          />
        </Col>
        <Col hidden={rangeMod === "自定义"}>
          <div style={{ fontSize: "16px", marginTop: "3px" }}>
            {dateRange.StartTime + " 至 " + dateRange.EndTime}
          </div>
        </Col>
      </Row>
    </>
  );
}
