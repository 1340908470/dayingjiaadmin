import React, { useState, useEffect } from "react";
import { Bar } from "@ant-design/charts";
import pandect from "@/util/backend/analytics";
import { call } from "@/util/client";

interface PhotoTypeProps {
  begin: string;
  end: string;
}

export default function PhotoTag(props: PhotoTypeProps) {
  let [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, [data]);

  console.log(props);

  const asyncFetch = () => {
    call(pandect.PhotoTags, {
      begin: props.begin,
      end: props.end,
    }).then((r) => {
      // @ts-ignore
      setData(r);
    });
  };

  return (
    <Bar
      data={data}
      yField={"tag"}
      xField={"amount"}
      yAxis={{
        label: { autoRotate: false },
      }}
      scrollbar={{ type: "vertical" }}
    />
  );
}
