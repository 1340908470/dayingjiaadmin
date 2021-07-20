import { Col, Row, Select, DatePicker } from "antd";
import { useEffect, useState } from "react";
import { call } from "@/util/client";
import pandect from "@/util/backend/analytics";
import {
  getWeekDate,
  getYearWeek,
} from "@/component/filter/DateRangeWeeklyFilter";
import moment, { Moment } from "moment";

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

export default function SingleDateFilter(props: FilterProps) {
  const [tmpDate, setTmpDate] = useState("");

  useEffect(() => {
    setDefault();
  }, []);

  const setDefault = () => {
    let mm = moment().startOf("week").subtract("days", 7);
    const StartTime =
      mm.year() +
      "-" +
      ("0" + (mm.month() + 1)).slice(-2) +
      "-" +
      ("0" + mm.date()).slice(-2);
    props.setDateRange(StartTime, StartTime);
  };

  return (
    <>
      <Row className={"filter"}>
        <Col>
          <div className={"title"}>{props.Title}</div>
        </Col>
        <Col flex={"20px"} />
        <Col>
          <DatePicker
            disabledDate={(current: Moment) => {
              let startMoment = moment();
              startMoment.set("year", 2021);
              startMoment.set("month", 4);
              startMoment.set("date", 12);

              let EndMoment = moment();
              EndMoment.set("month", moment().month());
              EndMoment.set("date", moment().date() - 1);
              return current < startMoment || current > EndMoment;
            }}
            defaultValue={moment().startOf("week").subtract("days", 7)}
            onChange={(_, dateString) => {
              props.setDateRange(dateString, dateString);
            }}
          />
        </Col>
      </Row>
    </>
  );
}
