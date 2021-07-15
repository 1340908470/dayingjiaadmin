import React, { useState, useEffect } from "react";
import { Menu, Dropdown, Button } from "antd";
import pandect from "@/util/backend/analytics";
import { call } from "@/util/client";
import { DownOutlined } from "@ant-design/icons";
import ShopInfoFreeCourse from "@/component/chart/ShopInfoFreeCourse";
import ShopInfoAvatar from "@/component/chart/ShopInfoAvatar";
import ShopInfoCourse from "@/component/chart/ShopInfoCourse";

interface ShopInfoProps {
  begin: string;
  end: string;
}

export default function ShopInfo(props: ShopInfoProps) {
  let [nowCategory, setNowCategory] = useState("免费课程");

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a
          onClick={() => {
            setNowCategory("免费课程");
          }}
        >
          免费课程
        </a>
      </Menu.Item>
      <Menu.Item key="0">
        <a
          onClick={() => {
            setNowCategory("头像挂件");
          }}
        >
          头像挂件
        </a>
      </Menu.Item>
      <Menu.Item key="0">
        <a
          onClick={() => {
            setNowCategory("精品课程");
          }}
        >
          精品课程
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={"chart-card"}>
      <div className={"card-title"}>
        发布作品类型分布
        <div style={{ float: "right", marginTop: "5px" }}>
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              {nowCategory} <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      </div>
      <div hidden={nowCategory !== "免费课程"}>
        <ShopInfoFreeCourse begin={props.begin} end={props.end} />
      </div>
      <div hidden={nowCategory !== "头像挂件"}>
        <ShopInfoAvatar begin={props.begin} end={props.end} />
      </div>
      <div hidden={nowCategory !== "精品课程"}>
        <ShopInfoCourse begin={props.begin} end={props.end} />
      </div>
    </div>
  );
}
