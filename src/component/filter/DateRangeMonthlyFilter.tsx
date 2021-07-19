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

const getMonthDate = (year: number, month: number) => {
  //获取周开始日期
  const getMonthStartDate = (year: number, month: number) => {
    return year + "-" + ("0" + month).slice(-2) + "-" + "01";
  };

  const isRun = (year: number) => {
    let flag = false;
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
      flag = true;
    }
    return flag;
  };

  //获取周结束日期
  const getMonthEndDate = (year: number, month: number) => {
    if (
      month === 1 ||
      month === 3 ||
      month === 5 ||
      month === 7 ||
      month === 8 ||
      month === 10 ||
      month === 12
    ) {
      return year + "-" + ("0" + month).slice(-2) + "-" + "31";
    } else if (month === 4 || month === 6 || month === 9 || month === 11) {
      return year + "-" + ("0" + month).slice(-2) + "-" + "30";
    } else {
      if (isRun(year)) {
        return year + "-" + ("0" + month).slice(-2) + "-" + "29";
      } else {
        return year + "-" + ("0" + month).slice(-2) + "-" + "28";
      }
    }
  };

  return getMonthStartDate(year, month) + "/" + getMonthEndDate(year, month);
};

export default function DateRangeMonthlyFilter(props: FilterProps) {
  const [dateRange, setDateRange] = useState({} as DateRange);

  return (
    <>
      <Row className={"filter"}>
        <Col>
          <div className={"title"}>{props.Title}</div>
        </Col>
        <Col flex={"20px"} />
        <Col>
          <DatePicker
            picker="month"
            onChange={(date, dateString) => {
              const dateStrings = dateString.split("-");
              const dateRanges = getMonthDate(
                Number.parseInt(dateStrings[0]),
                Number.parseInt(dateStrings[1])
              ).split("/");

              const StartTime = dateRanges[0];
              const EndTime = dateRanges[1];

              setDateRange({
                StartTime: StartTime,
                EndTime: EndTime,
              });

              props.setDateRange(StartTime, EndTime);
            }}
          />
        </Col>
        <Col>
          <div
            style={{ fontSize: "16px", marginTop: "3px", marginLeft: "20px" }}
          >
            {dateRange.StartTime
              ? dateRange.StartTime + " 至 " + dateRange.EndTime
              : "请选择月"}
          </div>
        </Col>
      </Row>
    </>
  );
}
