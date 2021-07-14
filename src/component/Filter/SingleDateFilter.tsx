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

export default function SingleDateFilter(props: FilterProps) {
  return (
    <>
      <Row className={"filter"}>
        <Col>
          <div className={"title"}>{props.Title}</div>
        </Col>
        <Col flex={"20px"} />
        <Col>
          <DatePicker
            onChange={(_, dateString) => {
              props.setDateRange(dateString, dateString);
            }}
          />
        </Col>
      </Row>
    </>
  );
}
