// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Typography } from "antd";
import pptCover from "../../wwwroot/img/pptCover.png";
const { Title } = Typography;
interface PPTCoverProps {
  title: string;
  title2?: string;
  nowPage: string;
  begin: string;
  end: string;
}

export default function PPTCover(props: PPTCoverProps) {
  if (props.begin) {
    return (
      <div
        hidden={props.nowPage}
        style={{
          paddingBottom: "56.25%",
          backgroundImage: `url(${pptCover})`,
          backgroundSize: "100%",
          width: "101%",
          marginLeft: "-0.5%",
          marginBottom: "40px",
        }}
      >
        <div
          style={{
            float: "left",
            fontSize: 44,
            color: "red",
            marginTop: "25%",
            marginLeft: "9.3%",
            fontWeight: 500,
            width: "100%",
          }}
        >
          {props.title}
        </div>
        <div
          hidden={!props.title2}
          style={{
            float: "left",
            fontSize: 44,
            color: "red",
            marginTop: "-10px",
            marginLeft: "9.3%",
            fontWeight: 500,
            width: "100%",
          }}
        >
          {props.title2}
        </div>
        <div
          style={{
            marginTop: "5px",
            float: "left",
            fontSize: 28,
            marginLeft: "9.3%",
            fontWeight: 300,
            width: "100%",
          }}
        >
          {props.begin + "~" + props.end}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
