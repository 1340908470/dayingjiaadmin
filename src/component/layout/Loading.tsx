import { Spin } from "antd";

export default function Loading() {
  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <Spin />
      <div style={{ color: "#fa8b8b" }}>loading...</div>
      <br />
    </div>
  );
}
