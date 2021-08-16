import { Row, Col, Form, Input, Button, Checkbox, Image, Spin } from "antd";
import "./default.css";
import logo from "../wwwroot/img/logo.png";
import { call, setExpiresTime, setJwt } from "@/util/client";
import auth from "../util/backend/auth";
import Base64 from "base-64";
import { useRef, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
interface LoginForm {
  phoneID: string;
  password: string;
}

export default function LayoutLogin() {
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = (values: LoginForm) => {
    call(
      auth.Login,
      {},
      {
        authorization:
          "Basic " + Base64.encode(values.phoneID + ":" + values.password),
      }
    )
      .then((r) => {
        if (!r.statusCode) setJwt(r.data.jwt).then();
        return r;
      })
      .then((r) => {
        if (!r.statusCode)
          setExpiresTime(r.data.expiresIn).then(() => {
            history.go();
          });
        setIsLoading(false);
      });
  };

  const [password, setPassWord] = useState("");

  const onFinishFailed = (errorInfo: any) => {
    setIsLoading(false);
  };

  return (
    <div className={"background"}>
      <div className={"login"}>
        <Row align={"middle"}>
          <Col xs={2} sm={4} md={6} lg={8} xl={7} />
          <Col xs={20} sm={16} md={12} lg={8} xl={10}>
            <Row justify={"center"} style={{ marginBottom: "60px" }}>
              <Col style={{ textAlign: "center" }}>
                <Image preview={false} src={logo} alt={logo} width={"25%"} />
              </Col>
            </Row>
            <Row justify={"center"} style={{ marginBottom: "60px" }}>
              <Col>大影家后台数据统计系统</Col>
            </Row>
            <Form
              name="basic"
              wrapperCol={{ span: 12, offset: 6 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                name="phoneID"
                rules={[{ required: true, message: "请输入手机号!" }]}
              >
                <Input className={"input"} placeholder={"请输入手机号"} />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: "请输入密码!" }]}
              >
                <Input
                  type={"password"}
                  className={"input"}
                  placeholder={"请输入密码"}
                />
              </Form.Item>

              <Form.Item
                style={{ marginTop: "5px" }}
                wrapperCol={{ offset: 6, span: 12 }}
              >
                <Button
                  className={"input"}
                  block
                  type={isLoading ? "default" : "primary"}
                  htmlType="submit"
                  onClick={() => {
                    setIsLoading(true);
                  }}
                  style={{ color: "white" }}
                >
                  {isLoading ? <Spin /> : "登陆"}
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col xs={2} sm={4} md={6} lg={8} xl={7} />
        </Row>
      </div>
    </div>
  );
}
