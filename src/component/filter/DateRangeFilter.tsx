// @ts-nocheck
import { Col, Row, Select, DatePicker, notification } from "antd";
import { useEffect, useState } from "react";
import { CalendarOutlined } from "@ant-design/icons";
import moment, { Moment } from "moment";
import {
  getWeekDate,
  getYearWeek,
} from "@/component/filter/DateRangeWeeklyFilter";
import { getMonthDate } from "@/component/filter/DateRangeMonthlyFilter";
import { Simulate } from "react-dom/test-utils";

const { RangePicker } = DatePicker;
const { Option } = Select;

interface FilterProps {
  Title: string;
  setDateRange: (startTime: string, endTime: string) => void;
  setIsHideState: (isHide: boolean) => void;
}

export interface DateRange {
  StartTime: string; // 2021-04-20
  EndTime: string; // 2021-05-19
}

export default function DateRangeFilter(props: FilterProps) {
  const [rangeMod, setRangeMod] = useState("上周");
  const [dateRange, setDateRange] = useState({} as DateRange);
  const [isOpen, setIsOpen] = useState(false);
  const [keyVal, setKeyVal] = useState(new Date());

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
        getYearWeek(date.getFullYear(), date.getMonth(), date.getDate() - 14)
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

  const openNotificationWithIcon = (type: string | number) => {
    // @ts-ignore
    notification[type]({
      message: "请选择日期",
      description: "请点击日期范围选择框以选择范围",
      icon: <CalendarOutlined style={{ color: "#f59898" }} />,
    });
  };

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
              // @ts-ignore
              if (value === "自定义") {
                setKeyVal(new Date());
                openNotificationWithIcon("warning");
                setIsOpen(true);
                props.setIsHideState(true);
              } else {
                props.setIsHideState(false);
                setIsOpen(false);
              }
            }}
          >
            <Option key={1} value="上周">
              上周
            </Option>
            <Option key={2} value="上个月">
              上个月
            </Option>
            <Option key={3} value="自定义">
              自定义
            </Option>
          </Select>
        </Col>
        <Col flex={"20px"} />
        <Col hidden={rangeMod !== "自定义"}>
          <RangePicker
            allowClear={false}
            key={keyVal}
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
            onChange={(e) => {
              let StartTime = "";
              let EndTime = "";
              e?.forEach((r, i) => {
                if (i === 0) StartTime = r?.format("YYYY-MM-DD") || "";
                if (i === 1) EndTime = r?.format("YYYY-MM-DD") || "";
              });
              setDateRange({
                StartTime: StartTime,
                EndTime: EndTime,
              });
              props.setDateRange(StartTime, EndTime);
              setIsOpen(false);
              props.setIsHideState(false);
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
