import { Col, Row, Select, DatePicker } from "antd";
import { useEffect, useState } from "react";
import { call } from "@/util/client";
import pandect from "@/util/backend/analytics";
import moment, { Moment } from "moment";
import {
  getWeekDate,
  getYearWeek,
} from "@/component/filter/DateRangeWeeklyFilter";
import { getMonthDate } from "@/component/filter/DateRangeMonthlyFilter";

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

  useEffect(() => {
    setDateRangeByFailed("上周");
  }, []);

  function setDateRangeByFailed(type: string) {
    const date = new Date();

    let dateRanges = [];
    let StartTime = "";
    let EndTime = "";

    if (type === "上周") {
      dateRanges = getWeekDate(
        date.getFullYear(),
        getYearWeek(date.getFullYear(), date.getMonth(), date.getDate()) - 2
      ).split("-");

      StartTime = dateRanges[0].replaceAll("/", "-");
      EndTime = dateRanges[1].replaceAll("/", "-");
    }
    if (type === "上个月") {
      dateRanges = getMonthDate(date.getFullYear(), date.getMonth()).split("/");

      StartTime = dateRanges[0];
      EndTime = dateRanges[1];
    }

    setDateRange({
      StartTime: StartTime,
      EndTime: EndTime,
    });
    props.setDateRange(StartTime, EndTime);
  }

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
            <Option key={1} value="上周">
              上周
            </Option>
            <Option key={1} value="上个月">
              上个月
            </Option>
            <Option key={1} value="自定义">
              自定义
            </Option>
          </Select>
        </Col>
        <Col flex={"20px"} />
        <Col hidden={rangeMod !== "自定义"}>
          <RangePicker
            disabledDate={(current: Moment) => {
              let startMoment = moment();
              startMoment.set("year", 2021);
              startMoment.set("month", 4);
              startMoment.set("date", 12);

              let EndMoment = moment();
              EndMoment.set("month", moment().month());
              return current < startMoment || current > EndMoment;
            }}
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
