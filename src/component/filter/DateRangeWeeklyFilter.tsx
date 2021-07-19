import { Col, Row, Select, DatePicker } from "antd";
import { useEffect, useState } from "react";
import moment from "moment";

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

const getWeekDate = (year: number, week: number) => {
  //获取周开始日期
  const getWeekStartDate = (year: number, week: number) => {
    // Thursday in current week decides the year.
    const date = new Date(year, 0, 4);
    date.setDate(date.getDate() - ((date.getDay() + 6) % 7));
    date.setTime(date.getTime() + 7 * 86400000 * (week - 1));
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    return y + "/" + m + "/" + d;
  };

  //获取周结束日期
  const getWeekEndDate = (year: number, week: number) => {
    // Thursday in current week decides the year.
    const date = new Date(year, 0, 4);
    date.setDate(date.getDate() - ((date.getDay() + 6) % 7));
    date.setTime(date.getTime() + 7 * 86400000 * week - 1);
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    return y + "/" + m + "/" + d;
  };

  return getWeekStartDate(year, week) + "-" + getWeekEndDate(year, week);
};

const getYearWeek = (year: number, month: number, date: number) => {
  let dateNow = new Date(year, month, date);
  let dateFirst = new Date(year, 0, 1);
  let dataNumber = Math.round(
    (dateNow.valueOf() - dateFirst.valueOf()) / 86400000
  );
  return Math.ceil((dataNumber + (dateFirst.getDay() + 1 - 1)) / 7);
};

export default function DateRangeWeeklyFilter(props: FilterProps) {
  const [dateRange, setDateRange] = useState({} as DateRange);

  useEffect(() => {
    const date = new Date();

    const dateRanges = getWeekDate(
      date.getFullYear(),
      getYearWeek(date.getFullYear(), date.getMonth(), date.getDate()) - 1
    ).split("-");

    const StartTime = dateRanges[0].replaceAll("/", "-");
    const EndTime = dateRanges[1].replaceAll("/", "-");

    setDateRange({
      StartTime: StartTime,
      EndTime: EndTime,
    });

    props.setDateRange(StartTime, EndTime);
  }, []);

  return (
    <>
      <Row className={"filter"}>
        <Col>
          <div className={"title"}>{props.Title}</div>
        </Col>
        <Col flex={"20px"} />
        <Col>
          <DatePicker
            defaultValue={moment()}
            picker="week"
            onChange={(date, dateString) => {
              dateString = dateString.replaceAll("周", "");
              const dateStrings = dateString.split("-");
              const dateRanges = getWeekDate(
                Number.parseInt(dateStrings[0]),
                Number.parseInt(dateStrings[1])
              ).split("-");

              const StartTime = dateRanges[0].replaceAll("/", "-");
              const EndTime = dateRanges[1].replaceAll("/", "-");

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
              : "请选择周"}
          </div>
        </Col>
      </Row>
    </>
  );
}
