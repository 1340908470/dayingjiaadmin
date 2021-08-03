import { EndPoint } from "@/util/backend/index";

interface LoginReq {}

interface LoginRes {
  data: {
    jwt: string;
    tokenType: string;
    expiresIn: string;
  };
  statusCode: number;
}

export default {
  Login: "user/login" as EndPoint<LoginReq, LoginRes>,
};
