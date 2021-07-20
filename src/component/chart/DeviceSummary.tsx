import React, { useState, useEffect } from "react";
import { Menu, Dropdown, Button, Table } from "antd";
import pandect from "@/util/backend/analytics";
import { call } from "@/util/client";
import { DownOutlined } from "@ant-design/icons";
import ShopInfoFreeCourse from "@/component/chart/ShopInfoFreeCourse";
import ShopInfoAvatar from "@/component/chart/ShopInfoAvatar";
import ShopInfoCourse from "@/component/chart/ShopInfoCourse";
import analytics from "@/util/backend/analytics";
import Loading from "@/component/layout/Loading";

interface DeviceSummaryProps {
  isMonthReport?: boolean;
  begin: string;
  end: string;
}

interface Device {
  NewAmount: number;
  ActiveAmount: number;
}

export default function DeviceSummary(props: DeviceSummaryProps) {
  let [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getRowClassName = (record: any, index: number) => {
    let className = "";
    className = index % 2 === 0 ? "table-odd" : "table-even";
    if (index === 0) className = "table-deep-red";
    if (index === 1 || index === 2) className = "table-light-red";
    return className;
  };

  const columns = [
    {
      title: "机型",
      dataIndex: "name",
      key: "name",
      width: "40%",
    },
    {
      title: "访问用户数",
      dataIndex: "activeAmount",
      key: "activeAmount",
      width: "30%",
      sorter: {
        // @ts-ignore
        compare: (a, b) => {
          return a.activeAmount - b.activeAmount;
        },
      },
    },
    {
      title: "新访问用户数",
      dataIndex: "newAmount",
      key: "newAmount",
      sorter: {
        // @ts-ignore
        compare: (a, b) => {
          return a.newAmount - b.newAmount;
        },
        multiple: 4,
      },
    },
  ];

  useEffect(() => {
    setLoading(true);
    asyncFetch();
    console.log(data);
  }, [props.begin]);

  const asyncFetch = () => {
    if (props.begin && props.end) {
      call(analytics.UserDevice, {
        begin: props.begin,
        end: props.end,
      }).then((r) => {
        // @ts-ignore
        let tmpData = [];
        let tmpMap = new Map<String, Device>();
        r.新用户设备机型分布.forEach((value) => {
          let device: Device = {
            ActiveAmount: 0,
            NewAmount: Number.parseInt(value.amount),
          };
          tmpMap.set(value.name, device);
        });
        r.活跃用户设备机型分布.forEach((value) => {
          let device: Device = {
            ActiveAmount: Number.parseInt(value.amount),
            // @ts-ignore
            NewAmount: tmpMap.get(value.name).NewAmount,
          };
          tmpMap.set(value.name, device);
        });

        r.新用户设备机型分布.forEach((value) => {
          tmpData.push({
            name: value.name,
            // @ts-ignore
            activeAmount: tmpMap.get(value.name).ActiveAmount,
            // @ts-ignore
            newAmount: tmpMap.get(value.name).NewAmount,
          });
        });

        // @ts-ignore
        setData(tmpData);
        console.log(data);

        setLoading(false);
      });
    }
  };

  return (
    <div className={props.isMonthReport ? "chart-card-ppt" : "chart-card"}>
      <div className={props.isMonthReport ? "chart-title-ppt" : "card-title"}>
        设备机型统计
      </div>
      {loading ? (
        <Loading />
      ) : (
        <Table
          pagination={{ pageSize: 10 }}
          dataSource={data}
          columns={columns}
        />
      )}
    </div>
  );
}
